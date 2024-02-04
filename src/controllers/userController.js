const User = require('../models/userModel');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error._message });
    };
};

const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error._message });
    };
};

const deleteUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        res.json({ message: 'Usuário deletado com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: error._message });
    };
};

const addConsumer = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        const newConsumer = {
            name: req.body.name,
            mobileNumber: req.body.mobileNumber,
        };

        user.consumers.push(newConsumer);
        await user.save();

        res.status(201).json(user.consumers);
    } catch (error) {
        res.status(500).json({ error: error._message });
    }
};

const editConsumer = async (req, res) => {
    const userId = req.params.userId;
    const consumerId = req.params.consumerId;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }
  
      const consumerToEditIndex = user.consumers.findIndex(consumer => consumer._id.toString() === consumerId);
  
      if (consumerToEditIndex === -1) {
        return res.status(404).json({ error: 'Consumidor não encontrado.' });
      }
  
      user.consumers[consumerToEditIndex].name = req.body.name;
      user.consumers[consumerToEditIndex].mobileNumber = req.body.mobileNumber;
  
      await user.save();
  
      res.json(user.consumers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao editar consumidor.' });
    }
  };

const removeConsumer = async (req, res) => {
    const userId = req.params.userId;
    const consumerId = req.params.consumerId;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        const consumerToRemoveIndex = user.consumers.findIndex(consumer => consumer._id.toString() === consumerId);

        if (consumerToRemoveIndex === -1) {
            return res.status(404).json({ error: 'Consumidor não encontrado.' });
        }

        user.consumers.splice(consumerToRemoveIndex, 1);

        await User.updateOne({ _id: userId }, { $set: { consumers: user.consumers } });
        res.json(user.consumers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error._message });
    }
};

module.exports = { createUser, getAllUsers, deleteUser, addConsumer, editConsumer, removeConsumer };

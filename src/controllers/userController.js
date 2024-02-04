const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        const { username, email, password, mainWhatsapp, consumers } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            mainWhatsapp,
            consumers
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error._message });
    };
};

const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    if (!userId)
        return res.status(400).json({ error: 'Id do usuário não fornecido.' });
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

const listConsumers = async (req, res) => {
    const userId = req.params.userId;
    if (!userId)
        return res.status(400).json({ error: 'Id do usuário não fornecido.' });
    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        res.status(200).json(user.consumers);
    } catch (error) {
        res.status(500).json({ error: error._message });
    }
};

const addConsumer = async (req, res) => {
    const userId = req.params.userId;
    if (!userId)
        return res.status(400).json({ error: 'Id do usuário não fornecido.' });
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
    };
};

const editConsumer = async (req, res) => {
    const userId = req.params.userId;
    const consumerId = req.params.consumerId;
    if (!userId)
        return res.status(400).json({ error: 'Id do usuário não fornecido.' });
    if (!consumerId)
        return res.status(400).json({ error: 'Id do consumidor não fornecido.' });
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
        res.status(500).json({ error: error._message });
    };
};

const removeConsumer = async (req, res) => {
    const userId = req.params.userId;
    const consumerId = req.params.consumerId;
    if (!userId)
        return res.status(400).json({ error: 'Id do usuário não fornecido.' });
    if (!consumerId)
        return res.status(400).json({ error: 'Id do consumidor não fornecido.' });
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
        res.status(500).json({ error: error._message });
    };
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: 'Nome de usuário inválido.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Senha inválida.' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllUsers, createUser, deleteUser, listConsumers, addConsumer, editConsumer, removeConsumer, loginUser };

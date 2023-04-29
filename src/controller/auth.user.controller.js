const Users = require('../databases/orm/models/Users.js');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');



const registerUser = async (req, res) => {
    try {
        const { username, first_name, last_name, email, password } = req.body;

        // crear usuario
        await Users.create({ username, first_name, last_name, email, password });

        // enviar respuesta con éxito
        res.status(201).json({ message: 'Registered successfully' });
    } catch (error) {
        console.error(error);

        // enviar respuesta con error
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // crear y firmar token JWT
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '15m' });
        // guardar el token en la sesión del usuario
        req.session.token = token;
        // enviar respuesta con éxito y el token sin cifrar
        res.status(200).json({
            message: "autetication successfully"
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};


const logoutUser = async (req, res) => {
    // eliminar el token de la sesión del usuario
    delete req.session.token;

    // enviar respuesta con éxito
    res.status(200).json({
        message: 'Logged out successfully',
    });
};


const getUser = async (req, res) => {
    try {
        res.status(200).json({
            message: "login successful",
            data: res.user
        })

    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error" });
    }
}


module.exports = {
    registerUser,
    loginUser,
    getUser,
    logoutUser
}
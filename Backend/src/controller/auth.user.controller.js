const Users = require('../databases/orm/models/Users.js');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    try {
        const { username, first_name, last_name, email, password } = req.body;

        // buscar usuario o email existentes
        const existingUser = await Users.findOne({ where: { username, email } });

        // si el usuario o correo electrónico ya existen, enviar un mensaje de error
        if (existingUser) {
            const error = existingUser.username === username ? `User already exists: ${username}` : `Email already exists: ${email}`;
            return res.status(400).json({ error: error });
        }

        // subir la imagen y obtener su URL
        const file = req.file;
        const image = file ? `${req.protocol}://${req.get('host')}/uploads/${file.filename}` : null;




        // crear usuario
        await Users.create({ username, first_name, last_name, email, password, image });

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

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const user = await Users.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // crear y firmar token JWT con el ID del usuario
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        // guardar el token en la sesión del usuario
        req.session.token = token;
        // enviar respuesta con éxito y el token
        res.status(200).json({
            message: "autetication successfully",
            token: token
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

const getUser = (req, res) => {
    try {
        res.status(200).send({
            data: res.user
        })

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};


module.exports = {
    registerUser,
    loginUser,
    getUser
}

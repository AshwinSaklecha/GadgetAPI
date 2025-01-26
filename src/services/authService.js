const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma');

const registerUser = async (username, password) => {
    if (!username || !password) throw new Error('Username and password are required');

    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) throw new Error('Username already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { username, password: hashedPassword } });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });

    return { message: 'User registered successfully', token };
};

const loginUser = async (username, password) => {
    if (!username || !password) throw new Error('Username and password are required');

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) throw new Error('Invalid credentials');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });

    return { message: 'Logged in successfully', token };
};

module.exports = { registerUser, loginUser };

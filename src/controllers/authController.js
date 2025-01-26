const asyncHandler = require('../utils/asyncHandler');
const authService = require('../services/authService');

const register = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const result = await authService.registerUser(username, password);
    res.status(201).json(result);
});

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const result = await authService.loginUser(username, password);
    res.json(result);
});

module.exports = { register, login };

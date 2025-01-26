const prisma = require('../utils/prisma');
const { generateSuccessProbability, generateCodename, generateConfirmationCode } = require('../utils/gadgetUtils');

const gadgetService = require('../services/gadgetService');
const asyncHandler = require('../utils/asyncHandler');

const getAllGadgets = asyncHandler(async (req, res) => {
    const { status } = req.query;
    const gadgets = await gadgetService.getAllGadgets(status);
    res.json(gadgets);
});

const createGadget = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const gadget = await gadgetService.createGadget(name);
    res.status(201).json(gadget);
});

const updateGadget = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, status } = req.body;
    const updatedGadget = await gadgetService.updateGadget(id, name, status);
    res.json(updatedGadget);
});

const deleteGadget = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const gadget = await gadgetService.deleteGadget(id);
    res.json(gadget);
});

const selfDestructGadget = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { confirmationCode } = req.body;
    const result = await gadgetService.selfDestructGadget(id, confirmationCode);
    res.json(result);
});

module.exports = { getAllGadgets, createGadget, updateGadget, deleteGadget, selfDestructGadget };

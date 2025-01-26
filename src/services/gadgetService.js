const prisma = require('../utils/prisma');
const { generateSuccessProbability, generateCodename, generateConfirmationCode } = require('../utils/gadgetUtils');

const confirmationCodes = new Map(); // Store temporary confirmation codes

const getAllGadgets = async (status) => {
    const where = status ? { status } : {};
    const gadgets = await prisma.gadget.findMany({ where });

    return gadgets.map(gadget => ({
        ...gadget,
        success_probability: `${generateSuccessProbability()}%`
    }));
};

const createGadget = async (name) => {
    if (!name) throw new Error('Gadget name is required');

    let codename, isUnique = false;
    while (!isUnique) {
        codename = generateCodename();
        const existing = await prisma.gadget.findUnique({ where: { codename } });
        if (!existing) isUnique = true;
    }

    const gadget = await prisma.gadget.create({ data: { name, codename, status: 'Available' } });
    return { ...gadget, success_probability: `${generateSuccessProbability()}%` };
};

const updateGadget = async (id, name, status) => {
    const existingGadget = await prisma.gadget.findUnique({ where: { id } });
    if (!existingGadget) throw new Error('Gadget not found');

    if (status && !['Available', 'Deployed', 'Destroyed', 'Decommissioned'].includes(status)) {
        throw new Error('Invalid status value');
    }

    const updatedGadget = await prisma.gadget.update({
        where: { id },
        data: { ...(name && { name }), ...(status && { status }) }
    });

    return { ...updatedGadget, success_probability: `${generateSuccessProbability()}%` };
};

const deleteGadget = async (id) => {
    const existingGadget = await prisma.gadget.findUnique({ where: { id } });
    if (!existingGadget) throw new Error('Gadget not found');

    const decommissionedGadget = await prisma.gadget.update({
        where: { id },
        data: { status: 'Decommissioned', decommissioned_at: new Date() }
    });

    return { ...decommissionedGadget, success_probability: `${generateSuccessProbability()}%` };
};

const selfDestructGadget = async (id, confirmationCode) => {
    const existingGadget = await prisma.gadget.findUnique({ where: { id } });
    if (!existingGadget) throw new Error('Gadget not found');
    if (existingGadget.status === 'Destroyed') throw new Error('Gadget is already destroyed');

    if (!confirmationCode) {
        const newCode = generateConfirmationCode();
        confirmationCodes.set(id, newCode);
        return { message: 'Confirmation required', confirmationCode: newCode };
    }

    const expectedCode = confirmationCodes.get(id);
    if (!expectedCode || confirmationCode !== expectedCode) {
        throw new Error('Invalid confirmation code');
    }

    confirmationCodes.delete(id);

    const destroyedGadget = await prisma.gadget.update({
        where: { id },
        data: { status: 'Destroyed' }
    });

    return { 
        ...destroyedGadget, 
        success_probability: `${generateSuccessProbability()}%`, 
        message: 'Gadget has been destroyed' 
    };
};

module.exports = { getAllGadgets, createGadget, updateGadget, deleteGadget, selfDestructGadget };

const prisma = require('../utils/prisma');
const { generateSuccessProbability, generateCodename, generateConfirmationCode } = require('../utils/gadgetUtils');

const getAllGadgets = async (req, res) => {
    try {
      const { status } = req.query;
      const where = status ? { status } : {};
      
      const gadgets = await prisma.gadget.findMany({ where });
      
      // Add success probability to each gadget
      const gadgetsWithProbability = gadgets.map(gadget => ({
        ...gadget,
        success_probability: `${generateSuccessProbability()}%`
      }));
  
      res.json(gadgetsWithProbability);
    } catch (error) {
      console.error('Error fetching gadgets:', error);
      res.status(500).json({ error: 'Failed to fetch gadgets' });
    }
  };


  const createGadget = async (req, res) => {
    try {
      const { name } = req.body;
  
      if (!name) {
        return res.status(400).json({ error: 'Gadget name is required' });
      }
  
      // Generate a unique codename
      let codename;
      let isUnique = false;
      
      while (!isUnique) {
        codename = generateCodename();
        // Check if codename exists
        const existing = await prisma.gadget.findUnique({
          where: { codename }
        });
        if (!existing) isUnique = true;
      }
  
      const gadget = await prisma.gadget.create({
        data: {
          name,
          codename,
          status: 'Available'
        }
      });
  
      // Add success probability to response
      const response = {
        ...gadget,
        success_probability: `${generateSuccessProbability()}%`
      };
  
      res.status(201).json(response);
    } catch (error) {
      console.error('Error creating gadget:', error);
      res.status(500).json({ error: 'Failed to create gadget' });
    }
  };

  const updateGadget = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, status } = req.body;
  
      // Check if gadget exists
      const existingGadget = await prisma.gadget.findUnique({
        where: { id }
      });
  
      if (!existingGadget) {
        return res.status(404).json({ error: 'Gadget not found' });
      }
  
      // Validate status if provided
      if (status && !['Available', 'Deployed', 'Destroyed', 'Decommissioned'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
      }
  
      const updatedGadget = await prisma.gadget.update({
        where: { id },
        data: {
          ...(name && { name }),
          ...(status && { status })
        }
      });
  
      // Add success probability to response
      const response = {
        ...updatedGadget,
        success_probability: `${generateSuccessProbability()}%`
      };
  
      res.json(response);
    } catch (error) {
      console.error('Error updating gadget:', error);
      res.status(500).json({ error: 'Failed to update gadget' });
    }
  };

  const deleteGadget = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Check if gadget exists
      const existingGadget = await prisma.gadget.findUnique({
        where: { id }
      });
  
      if (!existingGadget) {
        return res.status(404).json({ error: 'Gadget not found' });
      }
  
      // Instead of deleting, mark as decommissioned
      const decommissionedGadget = await prisma.gadget.update({
        where: { id },
        data: {
          status: 'Decommissioned',
          decommissioned_at: new Date()
        }
      });
  
      // Add success probability to response
      const response = {
        ...decommissionedGadget,
        success_probability: `${generateSuccessProbability()}%`
      };
  
      res.json(response);
    } catch (error) {
      console.error('Error decommissioning gadget:', error);
      res.status(500).json({ error: 'Failed to decommission gadget' });
    }
  };


  const selfDestructGadget = async (req, res) => {
    try {
      const { id } = req.params;
      const { confirmationCode } = req.body;
  
      // Check if gadget exists
      const existingGadget = await prisma.gadget.findUnique({
        where: { id }
      });
  
      if (!existingGadget) {
        return res.status(404).json({ error: 'Gadget not found' });
      }
  
      if (existingGadget.status === 'Destroyed') {
        return res.status(400).json({ error: 'Gadget is already destroyed' });
      }
  
      // Generate expected confirmation code
      const expectedCode = generateConfirmationCode();
  
      // For demo purposes, we'll send the expected code in the response
      if (!confirmationCode) {
        return res.status(400).json({ 
          message: 'Confirmation required',
          confirmationCode: expectedCode 
        });
      }
  
      // Verify confirmation code (in real app, should compare with stored code)
      if (confirmationCode !== expectedCode) {
        return res.status(400).json({ error: 'Invalid confirmation code' });
      }
  
      // Update gadget status to Destroyed
      const destroyedGadget = await prisma.gadget.update({
        where: { id },
        data: {
          status: 'Destroyed'
        }
      });
  
      const response = {
        ...destroyedGadget,
        success_probability: `${generateSuccessProbability()}%`,
        message: 'Gadget has been destroyed'
      };
  
      res.json(response);
    } catch (error) {
      console.error('Error destroying gadget:', error);
      res.status(500).json({ error: 'Failed to destroy gadget' });
    }
  };


  
  
module.exports = {
    getAllGadgets, 
    createGadget,
    updateGadget,
    deleteGadget,
    selfDestructGadget
};
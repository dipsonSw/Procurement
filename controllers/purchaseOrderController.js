const PurchaseOrder = require('../models/purchaseOrderModel');
const Requisition = require('../models/requisitionModel');

// Create a new purchase order linked to a requisition
const createPurchaseOrder = async (req, res) => {
    try {
        const { poNumber, poDate, supplierVendorInformation, items, totalAmount, requisitionId } = req.body;

        // Find the related requisition
        const requisition = await Requisition.findById(requisitionId);

        if (!requisition) {
            return res.status(404).json({ message: 'Requisition not found' });
        }

        const newPurchaseOrder = new PurchaseOrder({
            poNumber,
            poDate,
            supplierVendorInformation,
            items,
            totalAmount,
            requisition: requisitionId, // Link to requisition
            createdBy: req.user._id // user authentication
        });

        await newPurchaseOrder.save();

        res.status(201).json(newPurchaseOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all purchase orders
const getAllPurchaseOrders = async (req, res) => {
    try {
        const purchaseOrders = await PurchaseOrder.find().populate('requisition createdBy');
        res.status(200).json(purchaseOrders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single purchase order by ID
const getPurchaseOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const purchaseOrder = await PurchaseOrder.findById(id).populate('requisition createdBy');

        if (!purchaseOrder) {
            return res.status(404).json({ message: 'Purchase Order not found' });
        }

        res.status(200).json(purchaseOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a purchase order
const updatePurchaseOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedPurchaseOrder = await PurchaseOrder.findByIdAndUpdate(id, updatedData, { new: true }).populate('requisition createdBy');

        if (!updatedPurchaseOrder) {
            return res.status(404).json({ message: 'Purchase Order not found' });
        }

        res.status(200).json(updatedPurchaseOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a purchase order
const deletePurchaseOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPurchaseOrder = await PurchaseOrder.findByIdAndDelete(id);

        if (!deletedPurchaseOrder) {
            return res.status(404).json({ message: 'Purchase Order not found' });
        }

        res.status(200).json({ message: 'Purchase Order deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createPurchaseOrder,
    getAllPurchaseOrders,
    getPurchaseOrderById,
    updatePurchaseOrder,
    deletePurchaseOrder
};

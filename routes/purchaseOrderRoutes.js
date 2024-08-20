const express = require('express');
const router = express.Router();
const {
    createPurchaseOrder,
    getAllPurchaseOrders,
    getPurchaseOrderById,
    updatePurchaseOrder,
    deletePurchaseOrder
} = require('../controllers/purchaseOrderController');

// Route to create a new purchase order
router.post('/', createPurchaseOrder);

// Route to get all purchase orders
router.get('/', getAllPurchaseOrders);

// Route to get a specific purchase order by ID
router.get('/:id', getPurchaseOrderById);

// Route to update a purchase order by ID
router.put('/:id', updatePurchaseOrder);

// Route to delete a purchase order by ID
router.delete('/:id', deletePurchaseOrder);

module.exports = router;

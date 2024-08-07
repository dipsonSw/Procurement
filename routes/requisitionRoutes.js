/**
 * @swagger
 * /requisitions:
 *   get:
 *     summary: Get all requisitions
 *     tags: [Requisitions]
 *     responses:
 *       200:
 *         description: A list of requisitions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Requisition'
 */

const express = require('express');
const {
    createRequisition,
    getAllRequisitions,
    getRequisitionById,
    updateRequisition,
    deleteRequisition,
    approveRequisition,
    getRequisitionsByUser
} = require('../controllers/requisitionController');

const router = express.Router();

// Route to create a new requisition
router.post('/requisitions', createRequisition);

// Route to get all requisitions
router.get('/requisitions', getAllRequisitions);

// Route to get a single requisition by ID
router.get('/requisitions/:id', getRequisitionById);

// Route to update a requisition by ID
router.put('/requisitions/:id', updateRequisition);

// Route to delete a requisition by ID
router.delete('/requisitions/:id', deleteRequisition);

// Route to approve or reject a requisition
router.post('/requisitions/approve', approveRequisition);


// Route to get all requisitions made by a specific user
router.get('/requisitions/user/:userId', getRequisitionsByUser); // New route



module.exports = router;

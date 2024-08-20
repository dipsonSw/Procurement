const express = require('express');
const {
    createRequisition,
    getAllRequisitions,
    getRequisitionById,
    updateRequisition,
    deleteRequisition,
    // approveRequisition,
    getRequisitionsByUser,
    approveRequisitionLevel1,
    approveRequisitionLevel2
} = require('../controllers/requisitionController');

const router = express.Router();

// Route to create a new requisition
router.post('/', createRequisition);

// Route to get all requisitions
router.get('/', getAllRequisitions);

// Route to get a single requisition by ID
router.get('/:id', getRequisitionById);

// Route to update a requisition by ID
router.put('/:id', updateRequisition);

// Route to delete a requisition by ID
router.delete('/:id', deleteRequisition);

// Route to approve or reject a requisition
router.post('/approvelevel1', approveRequisitionLevel1);
router.post('/approvelevel2', approveRequisitionLevel2);


// Route to get all requisitions made by a specific user
router.get('/requisitions/user/:userId', getRequisitionsByUser); // New route



module.exports = router;

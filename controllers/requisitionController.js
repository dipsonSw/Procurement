const Requisition = require('../models/requisitionModel');
const User = require('../models/userModel')
const sendEmail = require('../config/email');
const generateRequisitionPDF = require('../config/pdf');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
// Create a new requisition
// const createRequisition = async (req, res) => {
//     try {
//         const { requisitionNo, requisitionDate, requestor, requestType, expenseType, purpose, supplierVendorInformation, items } = req.body;

//         const newRequisition = new Requisition({
//             requisitionNo,
//             requisitionDate,
//             requestor,
//             requestType,
//             expenseType,
//             purpose,
//             supplierVendorInformation,
//             items
//         });

//         await newRequisition.save();
//         res.status(201).json(newRequisition);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };


const createRequisition = async (req, res) => {

    try {
        const { requisitionNo, requisitionDate, requestor, requestType, expenseType, purpose, supplierVendorInformation, items } = req.body;
        // const requestorId = new mongoose.Types.ObjectId(requestor);
        const requestorId = 111
        const newRequisition = new Requisition({
            requisitionNo,
            requisitionDate,
            requestor: requestorId,
            // requestor,
            requestType,
            expenseType,
            purpose,
            supplierVendorInformation,
            items,
            verificationStatus: {
                level1: 'Pending',
                level2: 'Pending',
                finalStatus: 'Pending'
            }
        });

        // await newRequisition.save();

        //Generate PDF
        const pdfFilePath = await generateRequisitionPDF(newRequisition);

        // Fetch the level 1 approver's email
        const level1Approver = await User.findOne({ designation: 'admin' }); // Replace with actual logic

        if (level1Approver) {
            // Send email notification to level 1 approver
            const subject = `Approval Required for Requisition ${requisitionNo} (Level 1)`;
            const text = `A new requisition has been created and requires your approval.<br>Requisition No: ${requisitionNo}<br>Requestor: ${requestor}<br>Purpose: ${purpose}<br>Please review and approve this requisition at level 1.`;
            let html = `
            <p>${text}</p>
            <p>
                <p>
                    <button id='${newRequisition._id}' style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: green; text-decoration: none; border-radius: 5px;">Approve</button>
                    <button id='${newRequisition._id}' style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: red; text-decoration: none; border-radius: 5px; margin-left: 10px;">Decline</button>
                </p>
            </p>
            <script>
                document.querySelector('button').addEventListener('click',()=>{
                        alert('Approved')
                    })
            </script>
        `
            //await sendEmail(level1Approver.email, subject, text, pdfFilePath);
            await sendEmail('procurementtestemail@gmail.com', subject, html, pdfFilePath);
        }

        // Clean up the PDF file after sending
        // fs.unlinkSync(pdfFilePath);

        res.status(201).json(newRequisition);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Handle level 1 approval
const approveRequisitionLevel1 = async (req, res) => {
    const { requisitionId, approverId, status } = req.body;

    try {
        const requisition = await Requisition.findById(requisitionId);

        if (!requisition) {
            return res.status(404).json({ message: 'Requisition not found' });
        }

        if (status === 'Approved') {
            requisition.approvedBy.level1 = approverId;
            requisition.verificationStatus.level1 = 'Approved';

            await requisition.save();

            // Fetch the level 2 approver's email
            const level2Approver = await User.findOne({ designation: 'Level 2 Approver' }); // Replace with actual logic

            if (level2Approver) {
                // Generate PDF again for level 2 approval
                const pdfFilePath = await generateRequisitionPDF(requisition);

                // Send email notification to level 2 approver
                const subject = `Approval Required for Requisition ${requisition.requisitionNo} (Level 2)`;
                const text = `Requisition No: ${requisition.requisitionNo} has been approved at level 1 and requires your approval at level 2.<br>Please review and approve this requisition.`;
                let html = `
                    <p>${text}</p>
                    <p>
                        <button id='${newRequisition._id}' style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: green; text-decoration: none; border-radius: 5px;">Approve</button>
                        <button id='${newRequisition._id}' style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: red; text-decoration: none; border-radius: 5px; margin-left: 10px;">Decline</button>
                    </p>
                `
                await sendEmail(level2Approver.email, subject, html, pdfFilePath);

                // Clean up the PDF file after sending
                fs.unlinkSync(pdfFilePath);
            }
        } else {
            requisition.verificationStatus.level1 = 'Rejected';
            requisition.verificationStatus.finalStatus = 'Rejected';
            await requisition.save();
        }

        res.status(200).json(requisition);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Handle level 2 approval
const approveRequisitionLevel2 = async (req, res) => {
    const { requisitionId, approverId, status } = req.body;

    try {
        const requisition = await Requisition.findById(requisitionId);

        if (!requisition) {
            return res.status(404).json({ message: 'Requisition not found' });
        }

        if (status === 'Approved') {
            requisition.approvedBy.level2 = approverId;
            requisition.verificationStatus.level2 = 'Approved';

            // Check if both levels have approved
            if (requisition.verificationStatus.level1 === 'Approved' && requisition.verificationStatus.level2 === 'Approved') {
                requisition.verificationStatus.finalStatus = 'Approved';
            }

            await requisition.save();
        } else {
            requisition.verificationStatus.level2 = 'Rejected';
            requisition.verificationStatus.finalStatus = 'Rejected';
            await requisition.save();
        }

        res.status(200).json(requisition);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all requisitions
const getAllRequisitions = async (req, res) => {
    try {
        const requisitions = await Requisition.find().populate('requestor approvedBy.level1 approvedBy.level2');
        res.status(200).json(requisitions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single requisition by ID
const getRequisitionById = async (req, res) => {
    try {
        const { id } = req.params;
        const requisition = await Requisition.findById(id).populate('requestor approvedBy.level1 approvedBy.level2');

        if (!requisition) {
            return res.status(404).json({ message: 'Requisition not found' });
        }

        res.status(200).json(requisition);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a requisition
const updateRequisition = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedRequisition = await Requisition.findByIdAndUpdate(id, updatedData, { new: true }).populate('requestor approvedBy.level1 approvedBy.level2');

        if (!updatedRequisition) {
            return res.status(404).json({ message: 'Requisition not found' });
        }

        res.status(200).json(updatedRequisition);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a requisition
const deleteRequisition = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRequisition = await Requisition.findByIdAndDelete(id);

        if (!deletedRequisition) {
            return res.status(404).json({ message: 'Requisition not found' });
        }

        res.status(200).json({ message: 'Requisition deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Approve or reject a requisition at a specific level
// const approveRequisition = async (req, res) => {
//     const { requisitionId, level, status, approverId } = req.body;

//     try {
//         const requisition = await Requisition.findById(requisitionId);

//         if (!requisition) {
//             return res.status(404).json({ message: 'Requisition not found' });
//         }

//         // Handle level-based approval
//         if (level === 1) {
//             requisition.approvedBy.level1 = approverId;
//             requisition.verificationStatus.level1 = status;
//         } else if (level === 2) {
//             requisition.approvedBy.level2 = approverId;
//             requisition.verificationStatus.level2 = status;
//         }

//         // Check if final approval can be given
//         if (requisition.verificationStatus.level1 === 'Approved' && requisition.verificationStatus.level2 === 'Approved') {
//             requisition.verificationStatus.finalStatus = 'Approved';
//         } else if (status === 'Rejected') {
//             requisition.verificationStatus.finalStatus = 'Rejected';
//         }

//         await requisition.save();
//         res.status(200).json(requisition);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


// Get all requisitions made by a specific user
const getRequisitionsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const requisitions = await Requisition.find({ requestor: userId }).populate('requestor approvedBy.level1 approvedBy.level2');
        
        if (!requisitions.length) {
            return res.status(404).json({ message: 'No requisitions found for this user' });
        }

        res.status(200).json(requisitions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};







module.exports = {
    createRequisition,
    getAllRequisitions,
    getRequisitionById,
    updateRequisition,
    deleteRequisition,
    // approveRequisition,
    getRequisitionsByUser,
    approveRequisitionLevel1,
    approveRequisitionLevel2
};

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for Supplier/Vendor Information
const supplierVendorInformationSchema = new Schema({
    name: { type: String },
    address: { type: String },
    phoneNumber: { type: String },
    contactPerson: { type: String }
}, { _id: false }); // Not generating _id for subdocument

// Define the schema for Items
const itemSchema = new Schema({
    productDescription: { type: String, required: true },
    quantity: { type: Number, required: true },
    units: { type: String, required: true },
    preferredMfr: { type: String },
    total: { type: Number, required: true },
    remarks: { type: String }
}, { _id: false }); // Not generating _id for subdocument

// Define the main Requisition schema
const requisitionSchema = new Schema({
    requisitionNo: { type: String, required: true, unique: true },
    requisitionDate: { type: Date, required: true },
    requestor: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    requestType: { type: String, required: true },
    expenseType: { type: String, required: true },
    purpose: { type: String, required: true },
    supplierVendorInformation: { type: supplierVendorInformationSchema }, // Optional
    items: { type: [itemSchema], required: true },
    approvedBy: {
        level1: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        level2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },
    verificationStatus: {
        level1: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
        level2: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
        finalStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
    }
}, { timestamps: true });

const Requisition = mongoose.model('Requisition', requisitionSchema);
module.exports = Requisition;

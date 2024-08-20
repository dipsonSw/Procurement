const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for Purchase Order Items
const purchaseOrderItemSchema = new Schema({
    productDescription: { type: String, required: true },
    quantity: { type: Number, required: true },
    units: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    remarks: { type: String }
}, { _id: false });

// Define the main Purchase Order schema
const purchaseOrderSchema = new Schema({
    poNumber: { type: String, required: true, unique: true },
    poDate: { type: Date, required: true },
    supplierVendorInformation: {
        name: { type: String, required: true },
        address: { type: String },
        phoneNumber: { type: String },
        contactPerson: { type: String }
    },
    items: { type: [purchaseOrderItemSchema], required: true },
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'Pending' }, // E.g., Pending, Approved, Shipped, Delivered, etc.
    requisition: { type: Schema.Types.ObjectId, ref: 'Requisition', required: true }, // Link to Requisition
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Who created the PO
}, { timestamps: true });

const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema);

module.exports = PurchaseOrder;

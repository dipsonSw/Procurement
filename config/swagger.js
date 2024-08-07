const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
openapi: '3.0.0',
info: {
title: 'My API',
version: '1.0.0',
description: 'My API Description',
},
};

const options = {
swaggerDefinition,
servers: [
    {
        url: 'http://localhost:3000/api-docs',
    },
],
components: { // Step 4: Defining reusable schemas
    schemas: {
        Requisition: {
            type: 'object',
            properties: {
                requisitionNo: { type: 'string' },
                requisitionDate: { type: 'string', format: 'date-time' },
                requestor: { type: 'string' },
                requestType: { type: 'string' },
                expenseType: { type: 'string' },
                purpose: { type: 'string' },
                supplierVendorInformation: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        address: { type: 'string' },
                        phoneNumber: { type: 'string' },
                        contactPerson: { type: 'string' },
                    },
                },
                items: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            productDescription: { type: 'string' },
                            quantity: { type: 'number' },
                            units: { type: 'string' },
                            preferredMfr: { type: 'string' },
                            total: { type: 'number' },
                            remarks: { type: 'string' },
                        },
                    },
                },
                approvedBy: {
                    type: 'object',
                    properties: {
                        level1: { type: 'string' },
                        level2: { type: 'string' },
                    },
                },
                verificationStatus: {
                    type: 'object',
                    properties: {
                        level1: { type: 'string', enum: ['Approved', 'Pending', 'Rejected'] },
                        level2: { type: 'string', enum: ['Approved', 'Pending', 'Rejected'] },
                        finalStatus: { type: 'string', enum: ['Approved', 'Pending', 'Rejected'] },
                    },
                },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
            },
        },
    },
},
apis: ['../routes/*.js'], // Path to the API routes in your Node.js application
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
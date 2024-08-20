/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - name
 *               - email
 *               - phoneNumber
 *               - designation
 *               - department
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's unique username
 *               password:
 *                 type: string
 *                 description: The user's password
 *               name:
 *                 type: string
 *                 description: The user's full name
 *               email:
 *                 type: string
 *                 description: The user's email address
 *               phoneNumber:
 *                 type: string
 *                 description: The user's phone number
 *               designation:
 *                 type: string
 *                 description: The user's designation in the company
 *               department:
 *                 type: string
 *                 description: The user's department in the company
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Invalid input data
 */


/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Invalid credentials
 */


/**
 * @swagger
 * /api/users/user/{id}:
 *   get:
 *     summary: Get a user's details by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's ID
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/users/user/{id}:
 *   put:
 *     summary: Update a user's details by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's full name
 *               email:
 *                 type: string
 *                 description: The user's email address
 *               phoneNumber:
 *                 type: string
 *                 description: The user's phone number
 *               designation:
 *                 type: string
 *                 description: The user's designation in the company
 *               department:
 *                 type: string
 *                 description: The user's department in the company
 *     responses:
 *       200:
 *         description: User details updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: User not found
 */


/**
 * @swagger
 * /api/users/user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user's ID
 *     responses:
 *       200:
 *         description: User successfully deleted
 *       404:
 *         description: User not found
 */


/**
 * @swagger
 * tags:
 *   name: Requisitions
 *   description: Requisition management
 */

/**
 * @swagger
 * /api/requisitions:
 *   post:
 *     summary: Create a new requisition
 *     tags: [Requisitions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - requisitionNo
 *               - requisitionDate
 *               - requestor
 *               - requestType
 *               - expenseType
 *               - purpose
 *               - items
 *             properties:
 *               requisitionNo:
 *                 type: string
 *                 description: The unique requisition number
 *               requisitionDate:
 *                 type: string
 *                 format: date
 *                 description: The date the requisition was made
 *               requestor:
 *                 type: string
 *                 description: The ID of the user making the requisition
 *               requestType:
 *                 type: string
 *                 description: The type of request
 *               expenseType:
 *                 type: string
 *                 description: The type of expense
 *               purpose:
 *                 type: string
 *                 description: The purpose of the requisition
 *               supplierVendorInformation:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The supplier or vendor's name
 *                   address:
 *                     type: string
 *                     description: The supplier or vendor's address
 *                   phoneNumber:
 *                     type: string
 *                     description: The supplier or vendor's phone number
 *                   contactPerson:
 *                     type: string
 *                     description: The supplier or vendor's contact person
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productDescription:
 *                       type: string
 *                       description: Description of the product
 *                     quantity:
 *                       type: number
 *                       description: Quantity of the product
 *                     units:
 *                       type: string
 *                       description: Units of the product
 *                     preferredMfr:
 *                       type: string
 *                       description: Preferred manufacturer
 *                     total:
 *                       type: number
 *                       description: Total cost
 *                     remarks:
 *                       type: string
 *                       description: Additional remarks
 *     responses:
 *       201:
 *         description: Requisition created successfully
 *       400:
 *         description: Invalid input data
 */


/**
 * @swagger
 * /api/requisitions:
 *   get:
 *     summary: Retrieve a list of all requisitions
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


/**
 * @swagger
 * /api/requisitions/{id}:
 *   get:
 *     summary: Get requisition details by ID
 *     tags: [Requisitions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The requisition ID
 *     responses:
 *       200:
 *         description: Requisition details retrieved successfully
 *       404:
 *         description: Requisition not found
 */


/**
 * @swagger
 * /api/requisitions/{id}:
 *   put:
 *     summary: Update requisition details by ID
 *     tags: [Requisitions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The requisition ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               requestType:
 *                 type: string
 *                 description: The type of request
 *               expenseType:
 *                 type: string
 *                 description: The type of expense
 *               purpose:
 *                 type: string
 *                 description


/**
 * @swagger
 * /api/purchaseorder:
 *   post:
 *     summary: Create a new purchase order
 *     tags: [Purchase Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - poNumber
 *               - poDate
 *               - supplierVendorInformation
 *               - items
 *               - totalAmount
 *               - requisition
 *               - createdBy
 *             properties:
 *               poNumber:
 *                 type: string
 *                 description: The unique purchase order number
 * 




/**
 * @swagger
 * /api/purchaseorder:
 *   get:
 *     summary: Retrieve a list of all purchase orders
 *     tags: [Purchase Orders]
 *     responses:
 *       200:
 *         description: A list of purchase orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PurchaseOrder'
 */




/**
 * @swagger
 * /api/purchaseorder/{id}:
 *   get:
 *     summary: Get details of a specific purchase order by ID
 *     tags: [Purchase Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The purchase order ID
 *     responses:
 *       200:
 *         description: Purchase order details retrieved successfully
 *       404:
 *         description: Purchase order not found
 */


/**
 * @swagger
 * /api/purchaseorder/{id}:
 *   put:
 *     summary: Update details of a specific purchase order by ID
 *     tags: [Purchase Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The purchase order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               supplierVendorInformation:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The supplier or vendor's name
 *                   address:
 *                     type: string
 *                     description: The supplier or vendor's address
 *                   phoneNumber:
 *                     type: string
 *                     description: The supplier or vendor's phone number
 *                   contactPerson:
 *                     type: string
 *                     description: The supplier or vendor's contact person
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productDescription:
 *                       type: string
 *                       description: Description of the product
 *                     quantity:
 *                       type: number
 *                       description: Quantity of the product
 *                     units:
 *                       type: string
 *                       description: Units of the product
 *                     unitPrice:
 *                       type: number
 *                       description: Price per unit of the product
 *                     totalPrice:
 *                       type: number
 *                       description: Total price for the item
 *                     remarks:
 *                       type: string
 *                       description: Additional remarks
 *               totalAmount:
 *                 type: number
 *                 description: Total amount for the purchase order
 *               status:
 *                 type: string
 *                 description: Status of the purchase order
 *     responses:
 *       200:
 *         description: Purchase order updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Purchase order not found
 */


/**
 * @swagger
 * /api/purchaseorder/{id}:
 *   delete:
 *     summary: Delete a specific purchase order by ID
 *     tags: [Purchase Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The purchase order ID
 *     responses:
 *       200:
 *         description: Purchase order successfully deleted
 *       404:
 *         description: Purchase order not found
 */



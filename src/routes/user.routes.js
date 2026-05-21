/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [requester, agent, admin]
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Bad request
 */

const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.get("/", userController.getAllUsers)
router.post("/", userController.createUser);

module.exports = router;
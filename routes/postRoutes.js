const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const postController = require('../controllers/postController');
const auth = require('../middleware/auth');

// Toutes les routes sont protégées
router.use(auth);

// Configuration de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });


/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Créer un post avec fichier et description
 *     tags:
 *       - Posts
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               description:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Post créé
 *       400:
 *         description: Requête invalide
 */
router.post('/', upload.single('file'), postController.createPost);

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Récupère tous les posts
 *     tags:
 *       - Posts
 *     responses:
 *       200:
 *         description: Liste des posts
 */
router.get('/', postController.getAllPosts);

module.exports = router;

const Post = require('../models/postModel');

exports.createPost = (req, res) => {
  const { user_id , description } = req.body;
  const file = req.file;

  if (!user_id || !description || !file) {
    return res.status(400).json({ error: 'Description et fichier requis' });
  }

  Post.createPost(user_id, description, file, (err, id) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(201).json({
      message: 'Post créé avec succès',
      post: {
        id,
        user_id,
        description,
        filename: file.filename,
        path: file.path,
        mimetype: file.mimetype,
        size: file.size,
      },
    });
  });
};

exports.getAllPosts = (req, res) => {
  Post.getAllPosts((err, posts) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(posts);
  });
};

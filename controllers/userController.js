const User = require('../models/userModel');

// Validation de base
const isValidUser = (user) =>
  user.name && user.name.length > 1 && /\S+@\S+\.\S+/.test(user.email);

exports.createUser = (req, res) => {
  const { name, email } = req.body;
  if (!isValidUser({ name, email })) {
    return res.status(400).json({ error: 'Nom ou email invalide.' });
  }

  User.createUser(name, email, (err, id) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id, name, email });
  });
};

exports.getAllUsers = (req, res) => {
  User.getAllUsers((err, users) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(users);
  });
};

exports.getUserById = (req, res) => {
  const id = req.params.id;
  User.getUserById(id, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    res.json(user);
  });
};

exports.updateUser = (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;
  if (!isValidUser({ name, email })) {
    return res.status(400).json({ error: 'Nom ou email invalide.' });
  }

  User.updateUser(id, name, email, (err, changes) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!changes) return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    res.json({ id, name, email });
  });
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  User.deleteUser(id, (err, changes) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!changes) return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    res.json({ message: 'Utilisateur supprimé.' });
  });
};

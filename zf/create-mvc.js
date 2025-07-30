const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const name = args[0];

if (!name) {
  console.error('❌ Veuillez fournir un nom de module (ex: Produit)');
  process.exit(1);
}

const lcName = name.toLowerCase(); // produit
const ucName = name.charAt(0).toUpperCase() + name.slice(1); // Produit

const files = [
  {
    path: `routes/${lcName}Routes.js`,
    content: `const express = require('express');
const router = express.Router();
const ${lcName}Controller = require('../controllers/${lcName}Controller');

router.get('/', ${lcName}Controller.getAll${ucName}s);
router.get('/:id', ${lcName}Controller.get${ucName}ById);
router.post('/', ${lcName}Controller.create${ucName});
router.put('/:id', ${lcName}Controller.update${ucName});
router.delete('/:id', ${lcName}Controller.delete${ucName});

module.exports = router;
`,
  },
  {
    path: `controllers/${lcName}Controller.js`,
    content: `const ${ucName} = require('../models/${lcName}Model');

exports.getAll${ucName}s = (req, res) => {
  res.send('Tous les ${lcName}s');
};

exports.get${ucName}ById = (req, res) => {
  res.send('Un seul ${lcName}');
};

exports.create${ucName} = (req, res) => {
  res.send('Créer un ${lcName}');
};

exports.update${ucName} = (req, res) => {
  res.send('Modifier un ${lcName}');
};

exports.delete${ucName} = (req, res) => {
  res.send('Supprimer un ${lcName}');
};
`,
  },
  {
    path: `models/${lcName}Model.js`,
    content: `// Modèle de données pour ${lcName}
// À connecter à SQLite, PostgreSQL ou autre

module.exports = {};
`,
  },
];

// Création des fichiers
files.forEach(({ path: filePath, content }) => {
  const fullPath = path.join(__dirname, '..', filePath);
  const dir = path.dirname(fullPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (fs.existsSync(fullPath)) {
    console.log(`⚠️  Le fichier existe déjà : ${filePath}`);
  } else {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Fichier créé : ${filePath}`);
  }
});

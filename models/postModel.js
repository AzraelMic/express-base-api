const db = require('../db/database');

exports.createPost = (user_id, desc, file, callback) => {
  db.run(
    `INSERT INTO posts (user_id, description, filename, path, mimetype, size)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [user_id, desc, file.filename, file.path, file.mimetype, file.size],
    function (err) {
      callback(err, this?.lastID);
    }
  );
};

exports.getAllPosts = (callback) => {
  db.all('SELECT * FROM posts ORDER BY created_at DESC', [], callback);
};

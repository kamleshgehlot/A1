const path = require('path');
const router = require('express').Router();

router.get('*', (req, res) => {
  // console.log("path...",path.join(__dirname));
  // console.log("path...",path.join(__dirname, '..'));
  // console.log("path...",path.join(__dirname,'..', '..'));
  // console.log("path...",path.join(__dirname, '..', '..', 'dist'));

  // const route = path.join(__dirname, '..', 'dist', 'index.html');
  const route = path.join(__dirname, '..', '..', 'src', 'index.html');
  res.sendFile(route);
});

module.exports = router;

const express = require('express');
const Profile = require('../../controllers/setting/profile.js');

const validateToken = require('../../utils').validateToken;

const brandRouter = express.Router();
brandRouter.route('/info').get(validateToken, Profile.info);
module.exports = brandRouter;

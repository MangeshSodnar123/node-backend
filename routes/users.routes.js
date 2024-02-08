const router = require('express').Router();
const {registerUser, getAllUsers, getUserByUserName} = require('../controllers/users.controller');
const {validatePostUserQuery} = require('../middlewares/validators/users.validator');
const checkValidation = require('../middlewares/validators/checkValidation');

router.post('/register', validatePostUserQuery, registerUser);
router.get('/all', checkValidation, getAllUsers);
router.get('/:username', getUserByUserName);
 
module.exports =router  

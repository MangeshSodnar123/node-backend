const router = require('express').Router();
const {
     createNewDiscussion,
     getAllDiscussions, 
     getDiscussionByUserName,
     getDiscussionById,
     deleteDiscussionByUserAndId,
     updateDiscussionByUserAndId,
     putCommentOnDiscussion
    } = require('../controllers/discussion.controller');
const {validateDiscussion,
     verifyAuthor,
     fetchUserInCollection,
     fetchDiscussion,
     validateComment 
    } = require('../middlewares/validators/discussion.validator');
const checkValidation = require('../middlewares/validators/checkValidation');



router.post('/new', fetchUserInCollection, validateDiscussion , createNewDiscussion);
router.get('/all', checkValidation, getAllDiscussions);
router.get('/user/:username', getDiscussionByUserName);
router.get('/id/:id', getDiscussionById);
router.delete('/id/:id', verifyAuthor, deleteDiscussionByUserAndId);
router.patch('/id/:id', verifyAuthor, updateDiscussionByUserAndId);
router.put('/:id/comment',fetchUserInCollection, fetchDiscussion, validateComment,  putCommentOnDiscussion)

module.exports = router; 

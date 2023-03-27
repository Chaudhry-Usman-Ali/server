const express = require('express'); 
const router = express.Router();

const commentController = require("../controllers/commentController")


router.get('/posts/:postId/comments', commentController.getAllComments);
router.get('/posts/:postId/comments/:commentId', commentController.getOneComment);
router.post('/posts/:postId/comments/', commentController.createComment);
router.patch('/posts/:postId/comments/:commentId', commentController.updateComment);
router.delete('/posts/:postId/comments/:commentId', commentController.deleteComment);


module.exports = router;
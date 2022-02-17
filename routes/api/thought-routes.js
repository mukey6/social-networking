const router = require('express').Router();

const {
    getAllThought,
    addThought,
    addReaction,
    removeReaction,
    removeThought,
    getSingleThought,
    updateThought
} = require('../../controller/thought-controller')


router.route('/').get(getAllThought)
//add thoughts to a user
router.route('/:userId').post(addThought)

router.route('/:thoughtId').get(getSingleThought).delete(removeThought)

// router.route('/:reactionId').get()
router.route('/:thoughtId/reactions').post(addReaction)
// ^ 
router.route('/:thoughtId/:reactionId').delete(removeReaction)
// currently working with htis ^
// do i have to put in the userID and thought ID to delete a thought? 
// can i not just use the thought id?

module.exports=router
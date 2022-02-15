const {User, Thought} = require('../model')

const thoughtController = {
    getAllThought(req, res){
        Thought.find({})
        .then((dbThought)=>{
            res.json(dbThought)
            })
            .catch((err)=>{
                console.log(err)
                res.status(500).json(err)
            })
    },
    getSingleThought({params}, res){
      Thought.findOne(params)
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbThought);
      })
      .catch((err) => res.json(err));
    },
    addThought({params, body}, res){
      console.log('thoughtss',body)
        Thought.create(body)
        .then(({_id})=>{
          // why did i destructure this?
            return User.findOneAndUpdate(
              
                {_id: params.userId},

                // above line is not working, find out why??
                // console.log('userid 31',userId),
                {$push: {thoughts: _id}},
                {new: true}
            )
        })
        .then(dbThought => {
            if (!dbThought) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbThought);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
    },

    addReaction({params, body}, res){
      Thought.findOneAndUpdate(
        {_id: params.id}, 
        {$push: {reactions:body}}, 
        { new: true, runValidators:true }
        )
        .then(dbReaction => {
          if (!dbReaction) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
          }
          res.json(dbReaction);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });

    },

    removeReaction({params}, res){
      Thought.findOneAndDelete(
        {_id: params.id},
        {$pull: {reactions: {reactionId: params.reactionId}}},
        {new: true}
        )
        .then((deletedReaction)=>{
          res.json(deletedReaction)
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    removeThought({params}, res){
      console.log('params88', params)
      Thought.findOneAndDelete(params )
      .then((deletedThought)=>{
        if (!deletedThought) {
          return res.status(404).json({ message: "No thoughts with this id!" });
        }
        //   return User.findOneAndUpdate(
          //     {_id: params.userId},
          //     {$pull: {thoughts: params.thoughtId}},
          //     {new: true}
          //   )
          // })
          // .then((dbThought) => {
            //   if (!dbThought) {
              //     res.status(404).json({ message: "No user found with this id!" });
              //     return;
              //   }
              res.json(deletedThought);
              console.log('deleted', deletedThought)
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    },

    // updateThought({params}, res){
    //   Thought.findOneAndUpdate(params)
    // }

}

module.exports=thoughtController
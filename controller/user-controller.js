const {User}=require('../model')

const userController = {

getAllUsers(req, res){
    User.find({})
    .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
    .then((dbUser)=>{
    res.json(dbUser)
    })
    .catch((err)=>{
        res.status(500).json(err)
    })
}, 
getUserById({params}, res){
    User.findOne({_id: params.id})
    .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
    .then(dbUser => {
        if (!dbUser) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUser);
      })
      .catch(err => {
        res.status(500).json(err);
      });
},
createUser({body},res){
    User.create(body)
    .then((dbUser)=>{
        res.json(dbUser)
        })
        .catch((err)=>{
            res.status(500).json(err)
        })
},
updateUser({params, body}, res){
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    .then(dbUser => {
        if (!dbUser) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUser);
      })
      .catch(err => {
        res.status(500).json(err);
      });
},
deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
    .then(dbUser => {
        if (!dbUser) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUser);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },
  addFriend({params}, res){
console.log('line80 friends', params)
User.findOneAndUpdate(
    {_id: params.userId},
    {$addToSet: {friends: params.friendsId}},
    {new:true}
)
.then((dbFriends)=>{
    console.log(dbFriends)
    res.json(dbFriends)
    // maybe do a findUser by id
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  },

  deleteFriend({params}, res){
      User.findOneAndUpdate(
          {_id: params.userId},
          {$pull: {friends: params.friendsId}},
          {new:true}
          // waht is validate ??
      )
      .then((dbFriends)=>{
        console.log(dbFriends)
        res.json(dbFriends)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
}

module.exports=userController
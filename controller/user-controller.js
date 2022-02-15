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
        console.log(err)
        res.status(500).json(err)
    })
}, 
getUserById(req, res){
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
        console.log(err);
        res.status(500).json(err);
      });
},
createUser({body},res){
    console.log('line 41',body)
    User.create(body)
    .then((dbUser)=>{
        res.json(dbUser)
        })
        .catch((err)=>{
            console.log(err)
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
        console.log(err);
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
        console.log(err);
        res.status(500).json(err);
      });
  }

}

module.exports=userController
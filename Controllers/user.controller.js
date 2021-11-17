const userModel = require('../models/user.model');

module.exports = {
  getUser: async (req, res, next) => {
    await userModel
      .findAll()
      .then((result) => res.render('index',{users: result}))
      .catch((err) => console.log(err));
  },

  getAddUser: async (req,res,next) => {
    res.render('addUser',{message:null});
  },

  addUser: async (req, res, next) => {
    const { firstName, lastName, email } = req.body;
    console.log(req.body);
    if (firstName === '' || email === '') {
      return res.render('addUser',{
        message: 'firstName or email cannot be empty',
      });
    } else {
      await userModel
        .create({ firstName, lastName, email })
        .then((result) => {
          return res.redirect('/');
        })
        .catch((err) =>
          {
            const errObj = [];
            err.errors.map( er => {
               errObj.push(er.message);
           })
           console.log(errObj);

            err.errors.map((e) => res.render('addUser',{ message: e.message })) 
          }
        );
    }
  },

  getEditUser: async (req, res, next) => {
    const userId = req.params.userId;
    console.log(userId);
    await userModel.findByPk(userId)
    .then((result) => {
      res.render('editUser', {user: result, message: null})
    })
  },

  editUser: async (req, res, next) => {
    const userId = req.body.userId;
    const { firstName, lastName, email } = req.body;

    await userModel
      .findByPk(userId)
      .then((user) => {
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        return user.save();
      })
      .then((result) => res.redirect('/'))
      .catch((err) => err.errors.map((e) => res.render('editUser',{ message: e.message })));
  },

  deleteUser: async (req, res, next) => {
      const userId = req.params.userId;
      await userModel
      .destroy({where:{id:userId}})
      .then((result)=> {
        console.log('Result',result);
        userModel
        .findAll()
        .then((result) => res.render('index',{users: result}))
        // return res.json({message: "Deleted successfully"})
      })
      .catch((err)=> err.errors.map((e) => res.json({ message: e.message })))
  }
};

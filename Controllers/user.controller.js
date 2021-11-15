const userModel = require('../models/user.model');

module.exports = {
  getUser: async (req, res, next) => {
    await userModel
      .findAll()
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  },

  addUser: async (req, res, next) => {
    const { firstName, lastName, email } = req.body;
    if (firstName === undefined || email === undefined) {
      return res.json({
        message: 'firstName or email cannot be empty',
      });
    } else {
      await userModel
        .create({ firstName, lastName, email })
        .then((result) => {
          return res.send(result);
        })
        .catch((err) =>
          err.errors.map((e) => res.json({ message: e.message }))
        );
    }
  },

  editUser: async (req, res, next) => {
    const userId = req.params.userId;
    const { firstName, lastName, email } = req.body;

    await userModel
      .findByPk(userId)
      .then((user) => {
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        return user.save();
      })
      .then((result) => res.send(result))
      .catch((err) => err.errors.map((e) => res.json({ message: e.message })));
  },

  deleteUser: async (req, res, next) => {
      const userId = req.params.userId;
      await userModel
      .destroy({where:{id:userId}})
      .then((result)=> res.json({message: "Deleted successfully"}))
      .catch((err)=> err.errors.map((e) => res.json({ message: e.message })))
  }
};

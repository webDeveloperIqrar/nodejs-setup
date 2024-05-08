const UserModel = require('../../model/user');
const md5 = require('md5');
const ObjectId = require('mongodb').ObjectId;
// Create and Save a new user
exports.create = async (req, res) => {
    if (!req.body.user_type && !req.body.first_name && !req.body.email && !req.body.password) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    
    const user = new UserModel({
        user_type: req.body.user_type,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        email_verified: req.body.email_verified,
        password: md5(req.body.password),
        forgot_password_token: req.body.forgot_password_token,
        phone: req.body.phone,
        country_code: req.body.country_code,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        country: req.body.country,
        timezone: req.body.timezone,
        ip: req.body.ip
    });
    
    await user.save().then(data => {
        res.send({
            message:"User created successfully!!",
            user:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });
    });
};

// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const user = await UserModel.find();
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.id);
        if(user){
            res.status(200).json(user);
        }else{
            res.status(200).json([]);
        }
        
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};
// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
    await UserModel.deleteOne({_id: new ObjectId(req.body.id)})
.then(data => {
      if (!data) {
          res.status(404).send({
            message: `User not found.`
          });
        } else {
          res.send({
            message: "User deleted successfully!"
          });
        }
})
.catch(err => {
  console.log(err)
});

    // await UserModel.findByIdAndRemove(req.body.id).then(data => {
    //     if (!data) {
    //       res.status(404).send({
    //         message: `User not found.`
    //       });
    //     } else {
    //       res.send({
    //         message: "User deleted successfully!"
    //       });
    //     }
    // }).catch(err => {
    //     res.status(500).send({
    //       message: err.message
    //     });
    // });
};

// Update a user by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.body.id;
    
    await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            });
        }else{
            res.send({ message: "User updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
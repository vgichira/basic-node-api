const User = require("../models/users.model")

// retrieve all the users

exports.getAllUsers = (req, res)=>{
    User.find()

    .then(users => {
        res.json({
            status:200,
            data:users
        });
    }).catch(err => {
        res.status(500).send({
        message: err.message || "Something went wrong while getting list of users."
    })
    })
}

// create a new user

exports.newUser = (req, res)=>{
    // validate request
    if(!req.body){
        return res.json({
            status:400,
            message:"Malformed request"
        })
    }

    const {first_name, last_name, email, phone} = req.body

    if(!first_name || !last_name || !email || !phone){
        return res.json({
            status:400,
            message:"Malformed request"
        })
    }

    // create the user

    const user = new User({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        phone:req.body.phone
    })

    user.save()
    .then(data=> {
        res.json({
            status:200,
            message:"New user created successfully"
        })
    }).catch(err=>{
        res.json({
            status:500,
            message:err.message
        })
    })
}

// find one user

exports.getUser = (req, res)=>{
    User.findById(req.params.userID).then(user=>{
        if(!user){
            return res.json({
                status:400,
                message:"Malformed request"
            })
        }

        res.json({
            status:200,
            data:user
        })
    }).catch(err=>{
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                status:404,
                message: "User not found with id " + req.params.id
            });
        }

        return res.status(500).send({
            status:500,
            message: "Error getting user with id " + req.params.id
        });
    })
}

// delete a user

exports.deleteUser = (req, res)=>{
    User.findByIdAndDelete(req.params.userID).then(user=>{
        if(!user){
            return res.status(404).json({
                status:404,
                message:"User was not found"
            })
        }

        res.status(200).json({
            status:200,
            message:"User removed successfully"
        })
    }).catch(err=>{
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                status:404,
                message: "user not found with id " + req.params.id
            });
        }

        return res.status(500).send({
            status:500,
            message: "Could not delete user with id " + req.params.id
        });
    })
}
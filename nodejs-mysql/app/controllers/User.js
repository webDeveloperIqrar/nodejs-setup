const Users = require('../../models').users;
const db = require('../../models');
const md5 = require('md5');
const ResponseFormat = require('../../core').ResponseFormat;
// Create and Save a new user


module.exports = {
    create(req,res){
        var user_type = req.body.user_type ? req.body.user_type : "";
        var firstName = req.body.first_name ? req.body.first_name : "";
        var lastName = req.body.last_name ? req.body.last_name : "";
        var Email = req.body.email ? req.body.email : "";
        var Phone = req.body.phone ? req.body.phone : "";
        var Password = req.body.password ? md5(req.body.password) : "";

        var email_verified = req.body.email_verified ? req.body.email_verified : "";
        var forgot_password_token = req.body.forgot_password_token ? req.body.forgot_password_token : "";
        var country_code = req.body.country_code ? req.body.country_code : "";
        var address = req.body.address ? req.body.address : "";
        var city = req.body.city ? req.body.city : "";
        var state = req.body.state ? req.body.state : "";
        var zipcode = req.body.zipcode ? req.body.zipcode : "";
        var country = req.body.country ? req.body.country : "";
        var timezone = req.body.timezone ? req.body.timezone : "";
        var ip = req.body.ip ? req.body.ip : "";

        if (user_type == "") { return res.json(ResponseFormat.error({}, "User type is required", 400, "error")); }
        if (firstName == "") { return res.json(ResponseFormat.error({}, "First name is required", 400, "error")); }
        if (Email == "") { return res.json(ResponseFormat.error({}, "Email is required", 400, "error")); }
        if (Password == "") { return res.json(ResponseFormat.error({}, "Password is required", 400, "error")); }

        // return Users.findOne({
        //     raw: true,
        //     where: {
        //         [Op.or]: [
        //             { email: Email }
        //         ],
        //     },
        // }).then(usr => {
        //     if (usr) {
        //         let duplicateField = '';
        //         if (usr.email == Email) {
        //             duplicateField = 'email';
        //         } 
        //         return res.json(ResponseFormat.error(
        //             {},
        //             `This ${duplicateField} is already registered`,
        //             409,
        //             "error"
        //         ));
        //     }

            return Users.create({
                user_type: user_type,
                first_name: firstName,
                last_name: lastName,
                email: Email,
                email_verified: email_verified,
                password: Password,
                forgot_password_token: forgot_password_token,
                phone: Phone,
                country_code: country_code,
                address: address,
                city: city,
                state: state,
                zipcode: zipcode,
                country: country,
                timezone: timezone,
                ip: ip,
                
            }).then(user => {
                // const msg_body = 'Hi ' + firstName + ' ' + lastName + ',<br />Your account has been created on Underwritting Portal Please find below your login credentials:<br />Username: ' + username + '<br />Password: ' + req.body.password + '<br /><br />Thanks,<br />Underwritting Portal Team';
                // Helper.sendEmail(Email, 'Account Created - Underwritting Portal', msg_body);
                res.status(201).json(ResponseFormat.build(
                    user,
                    "User Create Successfully",
                    201,
                    "success"
                ))
            }).catch(error =>
                res.json(ResponseFormat.error(
                    error,
                    "Something went wrong when create Users",
                    400,
                    "error"
                )))
        //});
    },

    findAll(req,res){
        return Users.findAll()
        .then((data) => {
            if (!data) {
                return res.json(ResponseFormat.error({}, "data not found", 404, "error"));
            }
            res.status(200).json(
                ResponseFormat.build(data, "All Users get successfully", 200, "success")
            )
        }).catch((error) => res.json(
            ResponseFormat.error({}, "someting went wrong when get Users", 500, "error")
        ));
    },
    getUserById(req,res){
        const UserId = req.body.id ? req.body.id : '';

        if (!UserId || UserId == "") { return res.json(ResponseFormat.error({}, "There is something wrong please enter user id.", 400, "error")); }

        return Users.findOne({ where: { id: UserId} })
        .then((data) => {
            if (!data) {
                return res.json(ResponseFormat.error({}, "data not found", 404, "error"));
            }
            res.status(200).json(
                ResponseFormat.build(data, "All Users get successfully", 200, "success")
            )
        }).catch((error) => res.json(
            ResponseFormat.error({}, "someting went wrong when get Users", 500, "error")
        ));
    },
    async updateUser(req, res) {
        var userID = req.body.id ? req.body.id : "";
        var firstName = req.body.first_name ? req.body.first_name : "";
        var lastName = req.body.last_name ? req.body.last_name : "";
        var Phone = req.body.phone ? req.body.phone : "";
        var email_verified = req.body.email_verified ? req.body.email_verified : "";
        var forgot_password_token = req.body.forgot_password_token ? req.body.forgot_password_token : "";
        var country_code = req.body.country_code ? req.body.country_code : "";
        var address = req.body.address ? req.body.address : "";
        var city = req.body.city ? req.body.city : "";
        var state = req.body.state ? req.body.state : "";
        var zipcode = req.body.zipcode ? req.body.zipcode : "";
        var country = req.body.country ? req.body.country : "";
        var timezone = req.body.timezone ? req.body.timezone : "";
        var ip = req.body.ip ? req.body.ip : "";

        if (firstName == "") { return res.json(ResponseFormat.error({}, "First name is required", 400, "error")); }
        

        return Users
            .findByPk(userID)
            .then(async usr => {
                if (!usr) {
                    return res.json(
                        ResponseFormat.error(
                            {},
                            "User not found",
                            404,
                            "error"
                        )
                    );
                }
                return usr.update({
                    first_name: firstName || usr.first_name,
                    last_name: lastName || usr.last_name,
                    email_verified: email_verified  || usr.email_verified,
                    forgot_password_token: forgot_password_token  || usr.forgot_password_token,
                    phone: Phone  || usr.phone,
                    country_code: country_code  || usr.country_code,
                    address: address  || usr.address,
                    city: city  || usr.city,
                    state: state  || usr.state,
                    zipcode: zipcode  || usr.zipcode,
                    country: country  || usr.country,
                    timezone: timezone  || usr.timezone,
                    ip: ip  || usr.ip,
    
                    }, {
                        where: {
                            id: userID
                        }
                    }).then((data) => {
                    if (data) {
                        return res.status(200).json(
                            ResponseFormat.build(
                                usr,
                                "user Update successfully",
                                200,
                                "success",
                            )
                        )
                    }
                    
                }).catch((error) => res.json(
                    ResponseFormat.error({}, "someting went wrong when get Users", 500, "error")
                ));
            });      
        },
        deleteUser(req, res) {
            var userID = req.body.id;
            return Users
                .findByPk(userID)
                .then(usr => {
                    if (!usr) {
                        return res.json(
                            ResponseFormat.error(
                                {},
                                "user not found",
                                404,
                                "error"
                            )
                        );
                    }
                    return usr
                        .destroy({
                            where: {
                                id: userID
                            }
                        })
                        .then(() => res.status(200).json(
                            ResponseFormat.build(
                                {},
                                "user deleted successfully",
                                200,
                                "success",
                                
                            )
                        ))
                        .catch(error => res.json(
                            ResponseFormat.error(
                                error,
                                "someting went wrong when delete the user",
                                500,
                                "error"
                            )
                        ));
                });
        },
}
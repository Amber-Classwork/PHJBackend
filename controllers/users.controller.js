const User = require("../schemas/user.schema");
const bcrypt = require("bcrypt");
const {jsonResponse} = require("../utilities/jsonResponse");
const { generateJWTToken } = require("../utilities/tokenGenerator");
class UsersController{
    /**
     * ### Description
     * Authenticates the user that is passed in the body of the request. 
     */
    
    static loginUser = async (req,res, next)=>{
        try{
            let data = req.body;
            let email = data.email;
            let password = data.password;
            let user = await User.findOne({"email": email});
            if(!user) throw new Error("User not found in the Database");
            if(user){
                if(await user.passwordCorrect(password)){
                    // console.log(user.passwordCorrect(password))
                    let token = generateJWTToken({_id:user._id,username:user.username, email: user.email, role:"user"},"3600")
                    let data = {
                        user,
                        token
                    }
                    return jsonResponse(res,200,"Success","Successfully Logged in",data);
                }
                return jsonResponse(res,401,"Failed","Password is Incorrect");
            }
        }catch(error){
            jsonResponse(res, 400,"Failed", error.message);
        }
    }
    /**
     * ### Description
     * Gets all the users that are saved in the database.
     */
    static getAllUsers = async (req, res, next)=>{
        try{
            let users = await User.find();

            return jsonResponse(res,200, "Success", "Successfully retrieved", users)

        }catch(error){
            return jsonResponse(res, 400, "Failed", error.message);
        }
    }

    /**
     * ### Description
     * Gets a single student which matches the id that was passed in the url
     */
     static getUserById = async (req, res, next)=>{
        try{
            let id = req.params.id;
            let user = await User.findById(id, {password: 0});
            return jsonResponse(res, 200,"Success", "Successfully retrieved", user)
        }catch(error){
            jsonResponse(res, 500, "Failed", error.message)
        }
    }
    /**
     * ### Description
     * Updates the user with the data that is passed to the request in the body.
     */
     static updateUser = async (req, res, next)=>{
        try{
            let id = req.params.id;
            let data = req.body;
            // Checks to see if a file was uploaded if it was then it will set the location as the url, if not it removes that field from the data so it won't be overridden
            data.imageUrl = (req.file) ? req.file.location : undefined;
            if(data.password === undefined){
                delete data.password;
            }
            data.address = {street: data.street, city: data.city, parish: data.parish};

            let user = await User.findByIdAndUpdate(id, data, {new:true});
            jsonResponse(res, 200,"Success", "Successfully updated", user)
        }catch(error){
            jsonResponse(res, 400, "Failed", error.message);
        }
    }
        /**
     * ### Description
     * Delete the user that matches the id that is passed in the url
     */
         static deleteUser = async (req, res, next) =>{
            try{
                let id = req.params.id;
                await User.findByIdAndDelete(id);
                jsonResponse(res,200, "Success", "Successfully Deleted")
            }catch(error){
                jsonResponse(res, 400, "Failed", error.message)
            }
        }
        /**
     * ### Description
     * Creates a new User from the data that is passed in the request body. 
     */
         static createUser =  async (req, res, next)=>{
            try{
                let data = req.body;
                data.address = {street: data.street, city: data.city, parish: data.parish};

                let user = new User(data);
                if(!user.password){
                    user.password = (user.fname.slice(0,1)+"."+ user.lname).toUpperCase();
                }                
                await user.save();
                user.password = undefined;
                return jsonResponse(res, 200, "Success", "Successfully Created User", user);
            }catch(error){
                console.log(error)
                jsonResponse(res, 400, "Failed", "Failure");
            }
        }

}


module.exports = UsersController;
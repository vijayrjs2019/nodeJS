const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../Models/User');
const { decrypt } = require('dotenv');

//Singnup Process 
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            res.status(403).json({
                message: 'This email already exits.Please login',
                success: false,
            });
        }

        const userData = new userModel({ name, email, password });
        userData.password = await bcrypt.hash(password, 10);
        //Save
        await userData.save();
        res.status(201)
            .json({
                message: 'Singup succesfully',
                success: true
            });

    }
    catch (error) {
        res.status(500).json({
            message: 'Internal server erroe',
            success: false,
            error: error,
        });
    }
}

const login = async (req,res)=>{
   
    try{
        
        const { email , password } = req.body;
        const user = await userModel.findOne({email});
        
        const errorMsg = 'Auth faild email or password is wrong';
        
        if(!user){
            res.status(403).json({
                message:errorMsg,
                suucess:false
            });
        }

        
        
        const isPasswordEqual = bcrypt.compare(password,user.password); 
        if(!isPasswordEqual){
            res.status(403).json({
                message:errorMsg,
                suucess:false
            });
        }
        
        const jwtToken = jwt.sign(
            { email:user.email, _id : user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )
        
        res.status(200).json({
            message:'Login Successfully',
            suucess:true,
            jwtToken:jwtToken,
            email,
            name:user.name
        });

    }
    catch(error){
        res.status(500).json({
            message:'Internal server error',
            success:false,
            error:error
        })
    }
}


module.exports = {
    signup,
    login
}
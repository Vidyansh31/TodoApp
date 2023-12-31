const jwt = require('jsonwebtoken');
//Creating token and saving in cookie

const sendToken = (user,statusCode,res) => {

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn:"20h",
      });
      

    //options for cookie
    const options = {
        expires:new Date(
            Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000
        ),
        httpOnly:true,
        path:"/"
    }
    res.cookie('token', token, options);
     
    res.status(statusCode).json({ 
        success:true,
        user,
        token
    })
}


module.exports = sendToken;
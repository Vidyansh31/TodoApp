const bcrypt = require("bcrypt");
const User = require("../models/User");
const sendToken = require("../utils/jwtToken");
const Todo = require("../models/Todo");


exports.Register = async (req, res, next) => {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(password, salt);

  const userExist = await User.findOne({
    $or: [
      {
        email: email,
      },
      {
        username: username,
      },
    ],
  });


  if (userExist) {
    return res.status(202).json("User or Email Already exists");
  }

  try {
    const user = await User.create({
      username,
      email,
      password: hashpassword,
    });

    // Fuction for making jwt token
    sendToken(user, 201, res);
    // res.status(200).json("User created successfully");
  } catch (err) {
    console.log(err);
  }
};


exports.Login = async (req,res,next) => {
  const {email, password} = req.body;

  if(!email || !password) {
    return res.status(400).json("Please fill all the details");
  }

  const user = await User.findOne({email})

  if(!user){
    return res.status(404).json("No user found");
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if(!isPasswordMatched){
    return res.status(401).json("Invalid password");
  }

  sendToken(user,200,res);

}

exports.Logout = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
};

exports.CreateTodo = async (req,res,next) => {
  const {description} = req.body;

  const userId = req.user._id

  try{
    const todo = await Todo.create({
      userId,
      description,
    });

    if(todo){
      const user = await User.findOneAndUpdate({_id: userId}, {
        $push:{todos:todo}
      })
    }

    return res.status(200).json({
      success: true,
      message:"Todo Created Successfully",
      todo
    })
  }
  catch(err){
    return res.status(500).json(err);
  }

}

exports.GetTodoList = async (req,res,next) => {
  const userId = req.user._id;

  try{
    const todoList = await User.findById(userId).select("-password").populate("todos").exec();

    return res.status(200).json({
      success:true,
      todoList
    })
  }
  catch(err){
    return res.status(202).json(err);
  }
}

exports.MarkTodo = async (req,res,next) => {
  const userId = req.user._id;

  try{
    const todo = await Todo.findOneAndUpdate({
      _id:req.body.todoId,
    },[
      {
        $set: {
          isCompleted :{
            $eq:[false,"$isCompleted"]
          }
        }
      }
    ],{
      new : true,
    })

    return res.status(200).json({
      success:"true",
      todo
    })
  }
  catch(err){
    return res.status(202).json(err);
  }
}


exports.DeleteTodo = async (req,res,next) => {
  const {todoId} = req.body;
  const userId = req.user._id;

  try{
    const result = await Todo.findOneAndDelete({userId, _id: todoId})

    if(result){
      await User.findOneAndUpdate({_id: userId}, {
        $pull : {todos: req.body.todoId}
      })
    }

    res.status(200).json("Deleted Successfully");
  }
  catch(err){
    res.status(202).json(err);
  }
}
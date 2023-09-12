const express = require('express')
const { Register, Login, Logout, CreateTodo, GetTodoList, MarkTodo, DeleteTodo} = require('../Controller/RouteController');
const {isAuthenticatedUser} = require("../middleware/auth")
const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").post(Logout);

//protectedLRoutes
router.route("/createTodo").post(isAuthenticatedUser, CreateTodo);
router.route("/getTodos").get(isAuthenticatedUser, GetTodoList);
router.route("/markTodo").post(isAuthenticatedUser, MarkTodo);
router.route("/delete").delete(isAuthenticatedUser, DeleteTodo);

module.exports = router;
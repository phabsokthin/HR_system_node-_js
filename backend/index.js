const express = require('express')
const cors = require('cors')
const db = require('./db/config')
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const Fileupload = require('express-fileupload')
dotenv.config()

const app = express()
app.use(cookieParser())
db.sequelize.sync()
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(bodyParser.json())

app.use(express.static("public"))
app.use(Fileupload())

const userController = require('./controller/UserController')
const refreshToken = require('./token/RefershToken')
const positionController = require('./controller/PositionController')
const employeeController = require('./controller/EmployeeController')

app.get('/get_user', (req, res) => userController.getUser(req, res))
app.post("/register", (req, res) => userController.register(req, res))
app.post('/login', (req, res) => userController.login(req, res))
app.delete('/logout', (req, res) => userController.logout(req, res))
//refreshTokent

app.get('/refreshToken', (req, res) => refreshToken.refresh(req, res))

//positionController
app.post("/job", (req, res) => positionController.savePosition(req, res) )
app.get('/fetchposition', (req, res) => positionController.fetchPosition(req, res))
app.get('/fetch_position/:id', (req, res) =>positionController.fetchPositionUpdate(req, res))
app.patch('/post_employee/:id', (req, res) => positionController.updatePosition(req, res))
app.delete("/delete_position/:id", (req,res) =>positionController.deletePosition(req, res))

//productController
app.get("/f_position", (req, res) => employeeController.fetchPosition(req, res))
app.post("/post_employee", (req, res) => employeeController.saveProduct(req, res))
app.delete('/delete_employee/:id', (req, res) => employeeController.deleteEmployee(req, res))
app.patch('/update_employee/:id', (req, res) => employeeController.updateEmployee(req, res))
app.get("/fectAllEmployee", (req, res) => employeeController.fetchAllEmployee(req, res))
app.get("/fetchAllEmployeeID/:id", (req, res)=>employeeController.fetchAllEmployeeByID(req, res))
app.put("/viewDetailEmployee/:id", (req, res) => employeeController.viewDetailEmployee(req, res))





app.listen(3002, ()=>{
    console.log("Server is running")
})

const db = require("../db/config")
const path = require('path')
const fs = require("fs")

const Position = db.jobs;
const Employee = db.employee;

const fetchPosition = async (req, res) => {
    try {
        await Position.findAll().then(data => {
            res.send(data)
        }).catch(err => {
            console.log(err)
        })


    } catch (err) {
        console.log(err)
    }
}

const saveProduct = async (req, res) => {

    if (!req.files || !req.files.file) {
        return res.status(400).json({ msg: "No file selected" });
    }

    const rank_number = Math.floor(Math.random() * 10000) + 1;
    const fname = req.body.fname
    const lname = req.body.lname
    const sex = req.body.sex
    const dob = req.body.dob
    const phone = req.body.phone
    const email = req.body.email
    const hire_date = req.body.hire_date


    const job_id = req.body.job_id
    // const employee_no = req.body.employee_no

    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
    const allowType = ['.png', '.jpg', '.jpeg'];

    if (!allowType.includes(ext.toLowerCase())) { return res.status(422).json({ msg: "Invalid Image" }) }
    if (fileSize > 5000000) { return res.status(422).json({ msg: "Image size must be 5 mb" }) }
    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) { return res.status(500).json({ msg: err.message }) }

        try {
            await Employee.create({
                fname: fname,
                lname: lname,
                sex: sex,
                dob: dob,
                phone: phone,
                email: email,
                hire_date: hire_date,
                job_id: job_id,
                employee_no: "ID" + rank_number,
                image: fileName,
                url: url
            })

            res.json({ msg: "Save Employee Success" })
        }
        catch (err) {
            console.log(err)
        }
    })
}

const deleteEmployee = async (req, res) => {

    try {
        const employee = await Employee.findOne({
            where: {
                employee_id: req.params.id
            }
        })

        if (!employee) return res.status(400).json({ msg: "No data found" })

        try {
            const filePath = `./public/images/${employee.image}`;
            fs.unlinkSync(filePath)

            await Employee.destroy({
                where: {
                    employee_id: req.params.id
                }
            })
            res.status(200).json({ delete: "Delete Success!" })
        }
        catch (err) {
            console.log(err)
        }
    }
    catch (err) {
        console.log(err)
    }
}


const updateEmployee = async (req, res) => {
    const employee = await Employee.findOne({
        where: {
            employee_id: req.params.id
        }
    })

    if (!employee) { return res.status(400).json({ msg: "No data found" }) }
    let fileName = ""
    if (req.files === null) {
        fileName = employee.image
    }
    else {
        const file = req.files.file
        const fileSize = file.data.length
        const ext = path.extname(file.name)
        fileName = file.md5 + ext;
        const allowType = ['.png', '.jpg', '.jpeg'];
        if (!allowType.includes(ext.toLowerCase())) { return res.status(402).json({ msg: "Invalid image only png, jpg" }) }
        if (fileSize > 5000000) { return res.status(400).json({ msg: "File must be less 5mb" }) }
        const filePath = `./public/images/${employee.image}`
        fs.unlinkSync(filePath);
        file.mv(`./public/images/${fileName}`, (err) => {
            if (err) { return res.status(500).json({ msg: err.message }) }
        })
    }


    const fname = req.body.fname
    const lname = req.body.lname
    const sex = req.body.sex
    const dob = req.body.dob
    const phone = req.body.phone
    const email = req.body.email
    const hire_date = req.body.hire_date
    const job_id = req.body.job_id
    const url = `${req.protocol}://${req.get('host')}//images/${fileName}`
    try {

        await Employee.update({
            fname: fname,
            lname: lname,
            sex: sex,
            dob: dob,
            phone: phone,
            email: email,
            hire_date: hire_date,
            job_id: job_id,
            image: fileName,
            url: url
        }, {
            where: {
                employee_id: req.params.id
            }
        })

        res.status(200).json({ msg: "Employee updated success " + fname + " & " + lname })

    } catch (err) {
        console.log(err)
    }
}

//fetch all employee
const fetchAllEmployee= async(req, res) => {

    const data = await Employee.findAll({
        attributes: ["employee_id","fname","lname", "sex", "dob","phone","job_id","email","hire_date","url"],
        include: [
            {
                model: Position,
                as: "j_id",
                attributes: ["job_name"]
            }
        ],

        order: [["createdAt", "DESC"]]
    })

    res.status(200).json(data);
}

//fetch data by id
const fetchAllEmployeeByID = async(req, res) => {
    const data = await Employee.findOne({
        attributes: ["employee_id","fname","lname", "sex", "dob","phone","job_id","email","hire_date","url"],
        include: [
            {
                model: Position,
                as:  "j_id",
                attributes: ["job_name"]
            }
        ],
        where: {
            employee_id: req.params.id
        }
    })

    res.status(200).json(data)
}

//view detail
const viewDetailEmployee = async(req, res) => {
    const data = await Employee.findOne({
        attributes: ["employee_id","fname","lname", "sex", "dob","phone","job_id","email","hire_date","url","employee_no"],
        include: [
            {
                model: Position,
                as: "j_id",
                attributes: ["job_name"]
            }
        ],
        where: {
            employee_id: req.params.id
        }
    })

    res.status(200).json(data)
}

module.exports = {
    fetchPosition,
    saveProduct,
    deleteEmployee,
    updateEmployee,
    fetchAllEmployee,
    fetchAllEmployeeByID,
    viewDetailEmployee
}

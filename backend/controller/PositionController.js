
const db = require("../db/config");

const Jobs = db.jobs;

const savePosition = async (req, res) => {
    const { job_name, min_salary, max_salary } = req.body
    try {
        await Jobs.create({
            job_name: job_name,
            min_salary: min_salary,
            max_salary: max_salary
        })
        res.status(200).json({ msg: "Save position success" })
    }
    catch (err) {
        console.log(err)
        res.status(403).json({ err: "Position already exists" })
    }
}
const fetchPosition = async (req, res) => {
    try {
        await Jobs.findAll({
            order: [['createdAt', 'DESC']]
        }).then(data => {
            res.send(data)
        }).catch(err => {
            console.log(err)
        })
      
    }
    catch (err) {
        console.log(err)
    }
}
const fetchPositionUpdate = async (req, res) => {
    try {
        const data = await Jobs.findOne({
            where: {
                job_id: req.params.id
            }
        })
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
    }
}
const updatePosition = async (req, res) => {
    const { job_name, min_salary, max_salary } = req.body
    try {
        await Jobs.update({
            job_name: job_name,
            min_salary: min_salary,
            max_salary: max_salary
        }, {
            where: {
                job_id: req.params.id
            }
        })

        res.status(200).json({update: "Update Success"})
    }
    catch (err) {
        console.log(err)
        res.status(403).json({err: "ទិន្នន័យនេះមានរួចម្តងហើយ"})
    }
}
const deletePosition = async(req, res) => {
    
    try{
        await Jobs.destroy({
            where: {
                job_id: req.params.id
            }

        })

        res.status(200).json({delete: "បានលុបទិន្ន័យ"})
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {
    savePosition,
    fetchPosition,
    fetchPositionUpdate,
    updatePosition,
    deletePosition
}

const db = require('../db/config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = db.users

const getUser = (req, res) => {
    res.send("hello worlds")
}

const register = async (req, res) => {

    const { names, email, password, confpassword } = req.body

    if (password !== confpassword) return res.status(400).json({ msg: "Password must be same" })

    const bcrypt_salt = await bcrypt.genSalt()
    const hashpassword = await bcrypt.hash(password, bcrypt_salt)
    try {
        await User.create({
            names: names,
            email: email,
            password: hashpassword
        })
        res.status(200).json({ msg: "Register Success" })
    }
    catch (err) {
        console.log(err)
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findAll({
            where: {
                email: req.body.email
            }
        })
        if (!user.length) {
            return res.status(400).json({ msg: "Invalid email" })
        }

        const match = await bcrypt.compare(req.body.password, user[0].password)
        if (!match) return res.status(400).json({ msg: "Invalid password" })
        const { uid, names, email } = user[0]
        const accessToken = jwt.sign({ uid: names, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        })

        const refreshTokens = jwt.sign({ uid, names, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        })
        
        await User.update({ refreshToken: refreshTokens }, {
            where: {
                uid: user[0].uid
            }
        })
        res.cookie('refreshToken', refreshTokens, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        res.json({ accessToken })

    }
    catch (err) {
        console.log(err)
    }
}

const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(204)
    const user = await User.findAll({
        where: {
            refreshToken: refreshToken
        }
    })

    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].uid;
    await User.update({ refreshToken: null }, {
        where: {
            uid: userId
        }
    })

    res.clearCookie('refreshToken');
    return res.sendStatus(200)
}

module.exports = {
    getUser,
    register,
    login,
    logout
}
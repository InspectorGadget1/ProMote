import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import router from './router/Router.js'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { truncate } from 'fs'
import OrderContr from './orderController.js'
import User from './models/user.model.js'
import Order from './models/order.model.js'


const app = express()
const __dirname = path.resolve()
app.use(cookieParser())

app.use(express.urlencoded({ extended: true }))
mongoose.connect('mongodb+srv://admin:admin@cluster0.bv3u8.mongodb.net/ProMote', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})
app.listen(3000)
app.use(router)

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'ejs'))


app.use(express.static(path.resolve(__dirname, 'static')))

app.get('/', (req, res) => {
    res.render('Index', {
        cookie: req.cookies['token']

    })
})
app.get('/admin', async(req, res) => {
    try {
        const token = req.cookies['token']
        const decodedData = jwt.verify(token, 'SECRET')
        const decod = jwt.decode(token, { complete: true });
        const id = decod.payload.id
        const user = await User.findById(id)
        if (user.role != 'ADMIN') res.redirect('/')
        else {
            const orders = await Order.find()
            res.render('Admin', { orders })
        }

    } catch (e) {
        res.redirect('/login')
    }
})
app.get('/register', (req, res) => {
    res.render('Register')
})
app.get('/login', (req, res) => {
    res.render('Login')
})
app.get('/user', async(req, res) => {

    try {
        const token = req.cookies['token']
        const decodedData = jwt.verify(token, 'SECRET')
    } catch (e) {
        res.redirect('/login')
    }
    const token = req.cookies['token']
    const decod = jwt.decode(token, { complete: true });
    const id = decod.payload.id
    const user = await User.findById(id)
    const orders = await Order.find({ user: id })


    res.render('User', { orders })

})
app.get('/formSMM', (req, res) => {
    try {
        const token = req.cookies['token']
        const decodedData = jwt.verify(token, 'SECRET')
    } catch (e) {
        res.redirect('/login')
    }
    res.render('Form', { title: 'СММ Просування' })
})
app.get('/formSEO', (req, res) => {
    try {
        const token = req.cookies['token']
        const decodedData = jwt.verify(token, 'SECRET')
    } catch (e) {
        res.redirect('/login')
    }
    res.render('Form', { title: 'SEO Просування' })
})
app.get('/formGoogle', (req, res) => {
    try {
        const token = req.cookies['token']
        const decodedData = jwt.verify(token, 'SECRET')
    } catch (e) {
        res.redirect('/login')
    }
    res.render('Form', { title: 'Google ADS' })
})
app.get('/formBrend', (req, res) => {
    try {
        const token = req.cookies['token']
        const decodedData = jwt.verify(token, 'SECRET')
    } catch (e) {
        res.redirect('/login')
    }
    res.render('Form', { title: 'Брендинг' })
})

app.post('/order', OrderContr.makeOrder)
app.get('/logout', (req, res) => {
    res.cookie('token', '', { expires: new Date(0) })
    res.redirect('/')
})
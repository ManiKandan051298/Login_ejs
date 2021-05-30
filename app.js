// import required packages express,express-layouts
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')
const expressLayouts = require('express-ejs-layouts')

// port declare
const port = 3000

// static file declare
app.use(express.static('static'))
app.use('/css', express.static(__dirname + 'static/css'))
app.use('/js', express.static(__dirname + 'static/js'))
app.use('/img', express.static(__dirname + 'static/img'))

// parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// Templete settings
app.use(expressLayouts)
app.set('layout', './layouts/home_base')
app.set('view engine', 'ejs')



// Router
app.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page', layout: './layouts/login_base.ejs' })
})

app.post('/login', urlencodedParser, [
    check("email", 'This Email must be Valid')
    .isEmail().normalizeEmail(),
    check("password", "Password must be strong")
    .exists().isLength({ min: 8 })
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // return res.status(422).jsonp(errors.array())
        const alert = errors.array()
        res.render('login', { title: 'Login Page', layout: './layouts/login_base.ejs', alert })
    } else {
        const username = req.body.email;
        res.render('home', { title: 'Home Page', username: username })
    }
})

app.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' })
})

// Listen declare
// http://localhost:3000/
app.listen(port, () => { console.log(`App running in http:://localhost:${port}/`) })
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const {Pool} = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'comenius12',
    port: 5432,
});
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.get('/', async(req, res) => {
    const result = await pool.query('SELECT * FROM usuarios');
    const users = result.rows;
    res.render('index', {users});
});
app.get('/create', (req, res) => {
    res.render('formulario');
});
app.post('/form', async(req, res) => {
    const {nombre, apellido} = req.body;
    const result = await pool.query('INSERT INTO usuarios(nombre, apellido) VALUES($1, $2)', [nombre, apellido]);
    res.redirect('/');
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
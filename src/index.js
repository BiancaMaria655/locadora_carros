const express = require('express');
const handlebars = require('express-handlebars');
const session = require('express-session');
const FileStone = require('session-file-store')(session)
const bodyParser = require('body-parser');
const path = require('path');

handlebars.create({ partialsDir: ['./views/partials'] });

const app = express();
const port = 3333;
//
// rotas
const userRoute = require('./routes/userRoute')
app.use('/users', userRoute)

//use
app.use(express.json());
app.use(session({ secret: 'locadora' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//view engine

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.listen(port);
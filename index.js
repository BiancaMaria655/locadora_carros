const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const flash = require('express-flash');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
// const bodyParser = require('body-parser')
// const path = require('path')
const conn = require('./models/Database');
const customerRouter = require('./routes/customerRouter');
const admRouter = require('./routes/admRouter');
const Auth = require('./routes/authRouter');
const Car = require('./routes/carRouter');
const Loc = require('./routes/LocRouter');

//adicionando partials
const hbs = handlebars.create({ partialsDir: ['./views/partials'] });
hbs.handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
    switch (operator) {
      case '==':
        return v1 == v2 ? options.fn(this) : options.inverse(this);
      case '===':
        return v1 === v2 ? options.fn(this) : options.inverse(this);
      case '!=':
        return v1 != v2 ? options.fn(this) : options.inverse(this);
      case '!==':
        return v1 !== v2 ? options.fn(this) : options.inverse(this);
      case '<':
        return v1 < v2 ? options.fn(this) : options.inverse(this);
      case '<=':
        return v1 <= v2 ? options.fn(this) : options.inverse(this);
      case '>':
        return v1 > v2 ? options.fn(this) : options.inverse(this);
      case '>=':
        return v1 >= v2 ? options.fn(this) : options.inverse(this);
      case '&&':
        return v1 && v2 ? options.fn(this) : options.inverse(this);
      case '||':
        return v1 || v2 ? options.fn(this) : options.inverse(this);
      default:
        return options.inverse(this);
    }
  });

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
//session middleware
app.use(
  session({
    name: 'session', // nome da sessao
    secret: 'secret', // chave da sessao
    resave: false, //permite armazenar a sess??o sem finaliz??-la
    saveUninitialized: false, //envia uma sess??o criada, mas n iniciada para armazenamento
    store: new FileStore({
      //indica onde o arquivo da sess??o ser?? salvo
      logFn: function () {},
      path: require('path').join(require('os').tmpdir(), 'sessions')
    }),
    cookie: {
      //in??cio do cookie]
      resave: false,
      saveUninitialized: false,
      secure: false, //usado somente com https
      maxAge: 36000000, //tempo m??ximo do cookie em milisegundos
      expires: new Date(Date.now() + 36000000), //marca a hora de expirar
      httpOnly: true
    }
  })
);

app.use(flash());
app.use(function (req, res, next) {
  // if there's a flash message in the session request, make it available in the response, then delete it
  res.locals.sessionFlash = req.session.sessionFlash;
  delete req.session.sessionFlash;
  next();
});
app.use((req, res, next) => {
  app.locals.success = req.flash('success');
  next();
});

//parser para o body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(session({ secret: 'locadora' }));
// app.use(bodyParser.json())

//configurar handlebars
app.engine('handlebars', handlebars.engine());
// app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'handlebars');

//adicionando css
app.use(express.static(__dirname + '/public'));

//set session to res
app.use((req, res, next) => {
  console.log(req.session.userid);
  if (req.session.userid) {
    res.locals.session = req.session;
  }
  next();
});

// rotas
app.use('/cliente', customerRouter);
app.use('/admin', admRouter);
app.use('/carro', Car);
app.use('/locacao', Loc);
app.use('/usuario', Auth);
app.get('/inicio', (req,res)=>{
    res.render('home/home')
})

const port = 3000;
conn
  //.sync({ force: true })
  .sync()
  .then(() => {
    app.listen(port);
    console.log('Server Started');
  })
  .catch(err => {
    console.log(err);
  });

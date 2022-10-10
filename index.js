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
const Car = require('./models/Car');

//adicionando partials
handlebars.create({ partialsDir: ['./views/partials'] });

//flash mensagens
//session middleware
app.use(
  session({
    name: 'session', // nome da sessao
    secret: 'secret', // chave da sessao
    resave: false, //permite armazenar a sessão sem finalizá-la
    saveUninitialized: false, //envia uma sessão criada, mas n iniciada para armazenamento
    store: new FileStore({
      //indica onde o arquivo da sessão será salvo
      logFn: function () {},
      path: require('path').join(require('os').tmpdir(), 'sessions')
    }),
    cookie: {
      //início do cookie]
      resave: false,
      saveUninitialized: false,
      secure: false, //usado somente com https
      maxAge: 360000, //tempo máximo do cookie em milisegundos
      expires: new Date(Date.now() + 360000), //marca a hora de expirar
      httpOnly: true
    }
  })
);
app.use(flash());
app.use(function(req, res, next){
  // if there's a flash message in the session request, make it available in the response, then delete it
  res.locals.sessionFlash = req.session.sessionFlash;
  delete req.session.sessionFlash;
  next();
});
app.use((req, res, next)=>{
  app.locals.success = req.flash('success')
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


const port = 3000;
conn
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(port);
    console.log('Server Started');
  })
  .catch(err => {
    console.log(err);
  });

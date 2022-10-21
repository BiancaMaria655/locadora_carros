const User = require('../models/User');

module.exports = class authController {
    //tela de login
    static login(req, res) {
            res.render('users/login');
        }
        //logout
    static logout(req, res) {
            req.session.destroy();
            res.redirect('/cliente/login');
        }
        //realizar login
    static async loginSend(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            req.flash('message', 'Usuário não encontrado');
            res.render('users/customer/Registration');
        } else if (password != user.password) {
            req.flash('message', 'Senha inválida!');
            res.render('users/login');
        }
        req.session.userid = user.id;
        req.flash('message', 'Usuário logado com sucesso');
        req.session.save(() => {
            res.redirect('/cliente/dashboard');
        });
    }
}
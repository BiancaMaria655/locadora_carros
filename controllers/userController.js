const { raw } = require('body-parser');
const User = require('../models/User');


module.exports = class userController {
    //tela de login
    static login(req, res) {
            res.render('users/login');
        }
        //logout
    static logout(req, res) {
            req.session.destroy();
            res.redirect('/');
        }
        //realizar login
    static async loginSend(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            req.flash('message', 'Usuário não encontrado');
            res.render('users/customerRegistration');
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

    //tela de registrar cliente
    static newCustomer(req, res) {
        res.render('users/customerRegistration');
    }

    //salvar registro de cliente
    static async newCustomerSave(req, res) {
        const customer = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            cpf: req.body.cpf,
            user_type: req.body.user_type,
            cnh: req.body.cnh,
            phone: req.body.phone,
            address: req.body.address
        }
        try {
            await User.create(customer);
            req.flash('Você se cadastrou com sucesso!');
            req.session.save(() => {
                res.redirect('/cliente/login');
            })
        } catch (error) {
            console.log(error);
        }
    }

    //dashboard dos clientes
    static customerDashboard(req, res) {
        res.render('users/customerDashboard');
    }

    //lista de todos os clientes
    static async allCustomers(req, res) {
        try {
            const customers = await User.findAll({ raw: true });
            res.render('users/allCustomers', { customers });
        } catch (error) {
            console.log(error);
        }
    }

    //tela de editar cliente
    static async updateCustomer(req, res) {
        try {
            const id = req.params.id;
            const customer = await User.findAll({ where: { id: id }, raw: true });
            res.render('users/updateCostumer', { customer });
        } catch (error) {
            console.log(error);
        }
    }

    //salvar edição do cliente
    static async updateCustomerSave(req, res) {
        try {
            const id = req.body.id;
            const customer = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                cpf: req.body.cpf,
                user_type: req.body.user_type,
                cnh: req.body.cnh,
                phone: req.body.phone,
                address: req.body.address
            };
            await User.update(customer, { where: { id: id } });
            req.flash('message', 'Você atualizou seu cadastro com sucesso!');
            req.session.save(() => {
                res.redirect('cliente/dashboard');
            });
        } catch (error) {
            console.log(error);
        }
    }
    static async removeCustomer(req, res) {
        try {
            const id = req.body.id;
            await User.destroy({ where: { id: id } });
            req.flash('O seu cadastro foi apagado com sucesso!');
            req.session.save(() => {
                res.redirect('/cliente/home');
            });
        } catch (error) {
            console.log(error);
        }
    }

    // admin functions

    static async adminDashboard(req, res) {
        try {
            const users = await User.findAll({
                where: { user_type: 'ADM' },
                raw: true
            });
            res.render('users/admin/Dashboard', { users });
        } catch (error) {
            console.log(error);
        }
    }
    static async newAdminSave(req, res) {
        const formAdmin = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            cpf: req.body.cpf,
            user_type: req.body.user_type
        };
        try {
            await User.create(formAdmin);
            req.flash('success', 'cadastrado com sucesso!');
            req.session.save(() => {
                res.redirect('/admin/dashboard');
            });
        } catch (error) {
            console.log(error);
        }
    }
    static async updateAdmin(req, res) {
        try {
            const id = req.body.id;
            const admin = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                cpf: req.body.cpf,
                user_type: req.body.user_type,
            };
            await User.update(admin, { where: { id: id } });
            req.flash('success', 'Você atualizou com sucesso!');
            req.session.save(() => {
                res.redirect('/admin/dashboard');
            });
        } catch (error) {
            console.log(error);
        }
    }
};
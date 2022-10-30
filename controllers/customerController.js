const Car = require('../models/Car');
const User = require('../models/User');

module.exports = class userController {

    //tela de registrar cliente
    static newCustomer(req, res) {
        res.render('users/customer/customerRegistration');
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
        };
        try {
            await User.create(customer);
            req.flash('Você se cadastrou com sucesso!');
            req.session.save(() => {
                res.redirect('/cliente/login');
            });
        } catch (error) {
            console.log(error);
        }
    }

    //dashboard dos clientes
    static async customerDashboard(req, res) {
        try {
            const id = req.session.userid;
            const customer = await User.findOne({ where: { id: id }, raw: true })
            res.render('users/customer/Dashboard', { customer });
        } catch (error) {
            console.log(error)
        }
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
            const id = req.session.userid
            const customer = await User.findOne({ where: { id: id }, raw: true });
            res.render('users/customer/updateCustomer', { customer });
        } catch (error) {
            console.log(error);
        }
    }

    //salvar edição do cliente
    static async updateCustomerSave(req, res) {
        try {
            const id = req.session.userid
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
                res.redirect('/cliente/dashboard');
            });
        } catch (error) {
            console.log(error);
        }
    }

    //modal de confirmação para remover cliente
    static async removeCustomerConfirmacao(req, res) {
        try {
            const id = req.session.userid
            const customer = await User.findOne({ where: { id: id }, raw: true });
            res.render('users/customer/remove', { customer });
        } catch (error) {
            console.log(error);
        }
    }

    //apagar cadastro
    static async removeCustomer(req, res) {
        try {
            const id = req.session.userid;
            await User.destroy({ where: { id: id } });
            req.flash('O seu cadastro foi apagado com sucesso!');
            req.session.save(() => {
                res.redirect('/cliente/login');
            });
        } catch (error) {
            console.log(error);
        }
    }


};
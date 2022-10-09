const User = require('../models/User')

module.exports = class userController {
    // static verifySession(req, res, next) {

    // }

    //tela de login
    static login(req, res) {
            res.render('users/login')
        }
        //logout
    static logout(req, res) {
            req.session.destroy()
            res.redirect('/')
        }
        //realizar login
    static async loginSend(req, res) {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email: email } })
        if (!user) {
            req.flash('message', 'Usuário não encontrado')
            res.render('users/customerRegistration')
        }
        if (!password === user.password) {
            req.flash('message', 'Senha inválida!')
            res.render('users/customerRegistration')
        }
        req.session.userid = user.id
        req.flash('message', 'Usuário logado com sucesso')
        req.session.save(() => {
            res.redirect('/')
        })
    }

    //tela de registrar cliente
    static newCustomer(req, res) {
        res.render('users/custumerRegistration')
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
            address: req.body.address,
        }
        try {
            await User.create(customer)
            req.flash('Você se cadastrou com sucesso!')
            req.session.save(() => {
                res.redirect('/clientes/login')
            })
        } catch (error) {
            console.log(error)
        }
    }

    //dashboard dos clientes
    static customerDashboard(req, res) {
        res.render('users/customerDashboard')
    }

    //lista de todos os clientes
    static async allCustomers(req, res) {
        try {
            const customers = await User.findAll({ raw: true })
            res.render('users/allCustomers', { customers })
        } catch (error) {
            console.log(error)
        }
    }

    //tela de editar cliente
    static async updateCustomer(req, res) {
        try {
            const id = req.params.id
            const customer = await User.findAll({ where: { id: id }, raw: true })
            res.render('users/updateCostumer', { customer })
        } catch (error) {
            console.log(error)
        }
    }

    //salvar edição do cliente
    static async updateCustomerSave(req, res) {
        try {
            const id = req.body.id
            const customer = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                cpf: req.body.cpf,
                user_type: req.body.user_type,
                cnh: req.body.cnh,
                phone: req.body.phone,
                address: req.body.address,
            }
            await User.update(ostumer, { where: { id: id } })
            req.flash('message', 'Você atualizou seu cadastro com sucesso!')
            req.session.save(() => {
                res.redirect('cliente/dashboard')
            })
        } catch (error) {
            console.log(error)
        }
    }
    static async removeCustomer(req, res) {
        try {
            const id = req.body.id
            await User.destroy({ where: { id: id } })
            req.flash('O seu cadastro foi apagado com sucesso!')
            req.session.save(() => {
                res.redirect('cliente/cadastro')
            })
        } catch (error) {
            console.log(error)
        }

    }
}
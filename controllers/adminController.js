const Car = require('../models/Car');
const User = require('../models/User');
const Loc = require('../models/Loc');

module.exports = class AdminController {
  // admin functions

  static async adminDashboard(req, res) {
    try {
      const users = await User.findAll({
        where: { user_type: 'ADM' },
        raw: true
      });
      const cars = await Car.findAll({
        raw: true
      });
      const locacoes = await Loc.findAll({
        raw: true
      });
      res.render('users/admin/Dashboard', { users, cars, locacoes });
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
        user_type: req.body.user_type
      };
      const a = await User.update(admin, { where: { id: id } });
      req.flash('success', 'Você atualizou com sucesso!');
      req.session.save(() => {
        res.redirect('/admin/dashboard');
      });
    } catch (error) {
      console.log(error);
      res.redirect('/admin/dashboard');
    }
  }

  static async deleteAdmin(req, res) {
    try {
      const id = req.body.id;

      await User.destroy({ where: { id: id } });

      req.flash('success', 'Deletetado com Sucesso!');
    } catch (error) {
      console.log(err);
    } finally {
      res.redirect('/admin/dashboard');
    }
  }

  static async removeCar(req, res) {
    try {
      const id = req.body.id;
      await Car.destroy({ where: { id: id } });
      res.redirect('/admin/dashboard');
    } catch (error) {
      console.log(error);
    }
  }
};

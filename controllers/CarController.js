const Car = require('../models/Car');
const User = require('../models/User');

module.exports = class CarController {
  //tela para cadastrar veículo
  static async newCar(req, res) {    
    try {
      const id = req.session.userid;
      const user = await User.findOne({ where: { id: id } });

      if (user.user_type == "ADM") {
        res.render('car/addCar');
      }
      else {
        req.flash('message', 'Você precisa ser Administrador para acessar essa página');
        res.redirect('/cliente/dashboard');
      }
      // res.render('car/addCar');
    } catch (error) {
      console.log(error);
    }
  }

  // salvar registro do veículo
  static async newCarSave(req, res) {
    try {
      const car = {
        nome: req.body.nome,
        modelo: req.body.modelo,
        ano: req.body.ano,
        fabricante: req.body.fabricante,
        valor_loc: req.body.valor_loc,
        cor: req.body.cor,
        disponivel: req.body.disponivel,
        adicionais: req.body.adicionais
      };
      await Car.create(car);
      res.redirect('/carro/todos');
    } catch (error) {
      console.log(error);
    }
  }

  //lista de todos os veículos
  static async allCars(req, res) {    
    try {
      const id = req.session.userid;
      const user = await User.findOne({ where: { id: id } });

      if (user.user_type == "ADM") {
        const cars = await Car.findAll({ raw: true });
        res.render('car/allCars', { cars });
      }
      else {
        req.flash('message', 'Você precisa ser Administrador para acessar essa página');
        res.redirect('/cliente/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  }

  //tela de editar veículo
  static async updateCar(req, res) {
    try {
      // const id = req.session.userid
      // const car = await Car.findOne( { where: { UserId: id }, raw: true })
      // const user = await User.findOne({ where: { id: id }, raw: true })
      const id = req.params.id;
      const car = await Car.findOne({ where: { id: id }, raw: true });
      res.render('car/edit', { car });
    } catch (error) {
      console.log(error);
    }
  }

  //salvar alterações dos dados do veículo
  static async updateCarSave(req, res) {
    try {
      const id = req.body.id;
      const car = {
        nome: req.body.nome,
        modelo: req.body.modelo,
        ano: req.body.ano,
        fabricante: req.body.fabricante,
        valor_loc: req.body.valor_loc,
        cor: req.body.cor,
        disponivel: req.body.disponivel,
        adicionais: req.body.adicionais
      };
      await Car.update(car, { where: { id: id } });
      res.redirect('todos');
    } catch (error) {
      console.log(error);
    }
  }

  // remover veículo
  static async removeCar(req, res) {
    try {
      const id = req.body.id;
      await Car.destroy({ where: { id: id } });
      res.redirect('todos');
    } catch (error) {
      console.log(error);
    }
  }

  static async buscaFrota(req, res) {
    const carro = await Car.findAll({ raw: true });
    res.render('car/frota', { carro });
  }
};

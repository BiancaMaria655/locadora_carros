const Car = require('../models/Car')
const User = require('../models/User')


module.exports = class CarController{
    static async newCar(req, res){
        try {
         res.render('car/addCar')        
        } catch (error) {
         console.log(error)
        }
     }
    
     static async newCarSave(req, res){
        try {
            const car = {
                nome: req.body.nome,
                modelo: req.body.modelo,
                ano: req.body.ano,
                fabricante: req.body.fabricante,
                valor_loc: req.body.valor_loc,
                cor: req.body.cor,
                disponivel: req.body.disponivel,
                adicionais: req.body.adicionais,                
            }
            await Car.create(car)
            res.redirect('/car/allCars')


        } catch (error) {
            console.log(error)
        }
    }

    static async allCars(req, res){
        try {
            //por enquanto exibe sem pedir login
            const  cars = await Car.findAll({ raw: true })
            res.render('car/allCars', { cars })           
        } catch (error) {
            console.log(error)
        }
    }

    static async updateCar(req, res){
        try {
            // const id = req.session.userid
            // const car = await Car.findOne( { where: { UserId: id }, raw: true })
            // const user = await User.findOne({ where: { id: id }, raw: true })
            const id = req.params.id
            const car = await Car.findOne( { where: { id: id }, raw: true })
            res.render('car/edit', { car })
        } catch (error) {
            console.log(error)
        }
    }

    static async updateCarSave(req, res){
        try {
            const id = req.body.id
            const car = {
                nome: req.body.nome,
                modelo: req.body.modelo,
                ano: req.body.ano,
                fabricante: req.body.fabricante,
                valor_loc: req.body.valor_loc,
                cor: req.body.cor,
                disponivel: req.body.disponivel,
                adicionais: req.body.adicionais, 
            }
            await Car.update(car, { where: { id : id }})
            res.redirect('allCars')


        } catch (error) {
            console.log(error)
        }
    }

    static async removeCar(req, res){
        try {
            const id = req.body.id
            await Car.destroy({ where: { id: id }})
            res.redirect('allCars')
        } catch (error) {
            console.log(error)
        }
    }



}
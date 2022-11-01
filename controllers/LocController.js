const Loc = require('../models/Loc')
const User = require('../models/User')
const Car = require('../models/Car')
const dif = require('date-fns/differenceInDays')
var app = require('express');


module.exports = class LocController {
    //tela para cadastrar locações de veículo
    static async newLoc(req, res) {
            try {
                const id1 = req.session.userid;
                const customer = await User.findOne({ where: { id: id1 }, raw: true })

                const id2 = req.params.id
                const car = await Car.findOne({ where: { id: id2 }, raw: true })
                res.render('loc/addLoc', {car, customer})
            } catch (error) {
                console.log(error)
            }
        }
        // salvar registro de locação
    static async newLocSave(req, res) {
            try {
                const id1 = req.session.userid;
                const customer = await User.findOne({ where: { id: id1 }, raw: true })
                const id = req.params.id
                const car = await Car.findOne({ where: { id: id }, raw: true })

                const dias = dif(
                    new Date(req.body.dataFim),
                    new Date(req.body.dataIn)
                    )
                const valor = dias*car.valor_loc
                if(valor==0){
                    const val=car.valor_loc
                    const loc = {
                        nome: req.body.nome,
                        veiculo: req.body.veiculo,
                        dataIn: req.body.dataIn,
                        dataFim: req.body.dataFim,
                        valor:val,
                        idCarro:car.id,
                        idUser:customer.id,
                    }
                    await Loc.create(loc)
                    const status = "Não"
                    const carro = {
                        nome: car.nome,
                        modelo: car.modelo,
                        ano: car.ano,
                        fabricante: car.fabricante,
                        valor_loc:car.valor_loc,
                        cor: car.cor,
                        disponivel: status,
                        adicionais: car.adicionais
                    }
                    await Car.update(carro, { where: { id: id } })
                    res.redirect('/locacao/todas')
                }else{
                const loc = {
                    nome: req.body.nome,
                    veiculo: req.body.veiculo,
                    dataIn: req.body.dataIn,
                    dataFim: req.body.dataFim,
                    valor:valor,
                    idCarro:car.id,
                    idUser:customer.id,
                }
                await Loc.create(loc)
                const status = "Não"
                    const carro = {
                        nome: car.nome,
                        modelo: car.modelo,
                        ano: car.ano,
                        fabricante: car.fabricante,
                        valor_loc:car.valor_loc,
                        cor: car.cor,
                        disponivel: status,
                        adicionais: car.adicionais
                    }
                await Car.update(carro, { where: { id: id } })
                res.redirect('/locacao/todas')
            }
            } catch (error) {
                console.log(error)
            }
        }
        //listar locações
    static async allLoc(req, res) {
            try {
                const loc = await Loc.findAll({ raw: true })
                res.render('loc/allLoc', { loc })
            } catch (error) {
                console.log(error)
            }
        }
        //Editar Locações
    static async updateLoc(req, res) {
            try {
                const id = req.params.id
                const loc = await Loc.findOne({ where: { id: id }, raw: true })
                res.render('loc/editLoc', { loc })
            } catch (error) {
                console.log(error)
            }
        }
        //salvar alterações
    static async updateLocSave(req, res) {
            try {
                const id = req.params.id
                const locacao = await Loc.findOne({ where: { id: id }, raw: true })

                const iduser = locacao.idUser
                const customer = await User.findOne({ where: { id: iduser }, raw: true })

                const idcar=locacao.idCarro
                const car = await Car.findOne({ where: { id: idcar }, raw: true })

                const dias = dif(
                    new Date(req.body.dataFim),
                    new Date(req.body.dataIn)
                    )
                const valor = dias*car.valor_loc
                if(valor==0){
                    const val = car.valor_loc
                    const loc = {
                        nome: req.body.nome,
                        veiculo: req.body.veiculo,
                        dataIn: req.body.dataIn,
                        dataFim: req.body.dataFim,
                        valor:val,
                        idCarro:car.id,
                        idUser: customer.id
                    }
                    await Loc.update(loc, { where: { id: id } })
                    res.redirect('/locacao/todas')
                }else{
                    const loc = {
                        nome: req.body.nome,
                        veiculo: req.body.veiculo,
                        dataIn: req.body.dataIn,
                        dataFim: req.body.dataFim,
                        valor:valor,
                        idCarro:car.id,
                        idUser: customer.id
                    }
                    await Loc.update(loc, { where: { id: id } })
                    res.redirect('/locacao/todas')
                }
            } catch (error) {
                console.log(error)
            }
        }
        // remover registro
    static async removeLoc(req, res) {
        try {
            const id = req.body.id
            const locacao = await Loc.findOne({ where: { id: id }, raw: true })
            const idcar=locacao.idCarro
            const car = await Car.findOne({ where: { id: idcar }, raw: true })
            const status = "Sim"
                    const carro = {
                        nome: car.nome,
                        modelo: car.modelo,
                        ano: car.ano,
                        fabricante: car.fabricante,
                        valor_loc:car.valor_loc,
                        cor: car.cor,
                        disponivel: status,
                        adicionais: car.adicionais
                    }
                await Car.update(carro, { where: { id: idcar } })
            await Loc.destroy({ where: { id: id } })
            res.redirect('/locacao/todas')
        } catch (error) {
            console.log(error)
        }
    }
}
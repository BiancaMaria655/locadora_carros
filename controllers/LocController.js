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

                var data = new Date();
                var dia = String(data.getDate()).padStart(2, '0');
                var mes = String(data.getMonth() + 1).padStart(2, '0');
                var ano = data.getFullYear();
                const dataAtual = new Date(dia + '/' + mes + '/' + ano);
                const data_inicial=new Date(req.body.dataIn)
                if(data_inicial < dataAtual){
                    req.flash('message', 'Data inicial não pode ser menor que a data de hoje');
                    res.redirect('/carro/frota');
                }else{
                    if(dias>365){
                        req.flash('message', 'As datas não podem superar o período de um ano');
                        res.redirect('/carro/frota');
                    }else{
                        if(dias<0){
                            req.flash('message', 'A data inicial não pode ser maior que a final');
                            res.redirect('/carro/frota');
                        }else{
                            const valor = dias*car.valor_loc
                            if(valor==0){
                                const val=car.valor_loc
                                const StatusLoc = "Em Andamento"
                                const loc = {
                                    nome: req.body.nome,
                                    veiculo: req.body.veiculo,
                                    dataIn: req.body.dataIn,
                                    dataFim: req.body.dataFim,
                                    valor:val,
                                    status:StatusLoc,
                                    idCarro:car.id,
                                    idUser:customer.id,
                                }
                                await Loc.create(loc)

                                const Status = "Não"
                                const carro = {
                                    nome: car.nome,
                                    modelo: car.modelo,
                                    ano: car.ano,
                                    fabricante: car.fabricante,
                                    valor_loc:car.valor_loc,
                                    cor: car.cor,
                                    disponivel: Status,
                                    adicionais: car.adicionais
                                }
                                await Car.update(carro, { where: { id: id } })
                                res.redirect('/locacao/todasUsu')
                            }else{
                                const StatusLoc = "Em Andamento"
                                const loc = {
                                    nome: req.body.nome,
                                    veiculo: req.body.veiculo,
                                    dataIn: req.body.dataIn,
                                    dataFim: req.body.dataFim,
                                    valor:valor,
                                    status:StatusLoc,
                                    idCarro:car.id,
                                    idUser:customer.id,
                            }
                            await Loc.create(loc)
                            const Status = "Não"
                                const carro = {
                                    nome: car.nome,
                                    modelo: car.modelo,
                                    ano: car.ano,
                                    fabricante: car.fabricante,
                                    valor_loc:car.valor_loc,
                                    cor: car.cor,
                                    disponivel: Status,
                                    adicionais: car.adicionais
                                }
                            await Car.update(carro, { where: { id: id } })
                            res.redirect('/locacao/todasUsu')
                            }
                        }
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        
        //listar locações feitas pelo usuário logado
    static async allLocUsu(req, res) {
        try {
            const id1 = req.session.userid;
            const loc = await Loc.findAll({ where: { idUser: id1 }, raw: true })
            res.render('loc/allLocUsu', { loc })
        } catch (error) {
            console.log(error)
        }
    }
        //Editar Locações Usuário
    static async updateLoc(req, res) {
            try {
                const id = req.params.id
                const loc = await Loc.findOne({ where: { id: id }, raw: true })
                res.render('loc/editLoc', { loc })
            } catch (error) {
                console.log(error)
            }
        }
        //salvar alterações Usuário
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
                if(dias>365){
                    req.flash('message', 'As datas não podem superar o período de um ano');
                    res.redirect('/locacao/todasUsu');
                }else{
                    if(dias<0){
                        req.flash('message', 'A data inicial não pode ser maior que a final');
                        res.redirect('/locacao/todasUsu');
                    }else{
                        const valor = dias*car.valor_loc
                        if(valor==0){
                            const val = car.valor_loc
                            const StatusLoc = "Em Andamento"
                            const loc = {
                                nome: req.body.nome,
                                veiculo: req.body.veiculo,
                                dataIn: req.body.dataIn,
                                dataFim: req.body.dataFim,
                                valor:val,
                                status:StatusLoc,
                                idCarro:car.id,
                                idUser: customer.id
                            }
                            await Loc.update(loc, { where: { id: id } })
                            res.redirect('/locacao/todasUsu')
                        }else{
                            const StatusLoc = "Em Andamento"
                            const loc = {
                                nome: req.body.nome,
                                veiculo: req.body.veiculo,
                                dataIn: req.body.dataIn,
                                dataFim: req.body.dataFim,
                                valor: valor,
                                status: StatusLoc,
                                idCarro:car.id,
                                idUser: customer.id
                            }
                            await Loc.update(loc, { where: { id: id } })
                            res.redirect('/locacao/todasUsu')
                        }
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        // remover registro ADM
    static async removeLoc(req, res) {
        try {
            const id = req.body.id
            const locacao = await Loc.findOne({ where: { id: id }, raw: true })
            const idcar=locacao.idCarro
            const car = await Car.findOne({ where: { id: idcar }, raw: true })
            const Status = "Sim"
                    const carro = {
                        nome: car.nome,
                        modelo: car.modelo,
                        ano: car.ano,
                        fabricante: car.fabricante,
                        valor_loc:car.valor_loc,
                        cor: car.cor,
                        disponivel: Status,
                        adicionais: car.adicionais
                    }
                await Car.update(carro, { where: { id: idcar } })
            await Loc.destroy({ where: { id: id } })
            res.redirect('/locacao/todasAdm')
        } catch (error) {
            console.log(error)
        }
    }

    //Editar Locações Administrador
    static async updateLocAdm(req, res) {
        try {
            const id = req.params.id
            const loc = await Loc.findOne({ where: { id: id }, raw: true })
            res.render('loc/editLocADM', { loc })
        } catch (error) {
            console.log(error)
        }
    }
    //salvar alterações Administrador 
    static async updateLocSaveAdm(req, res) {
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
            var data = new Date();
            var dia = String(data.getDate()).padStart(2, '0');
            var mes = String(data.getMonth() + 1).padStart(2, '0');
            var ano = data.getFullYear();
            const dataAtual = new Date(dia + '/' + mes + '/' + ano);
            const data_inicial=new Date(req.body.dataIn)
            if(data_inicial < dataAtual){
                req.flash('message', 'Data inicial não pode ser menor que a data de hoje');
                res.redirect('/carro/frota');
            }else{
                if(dias>365){
                    req.flash('message', 'As datas não podem superar o período de um ano');
                    res.redirect('/locacao/todasAdm');
                }else{
                    if(dias<0){
                        req.flash('message', 'A data inicial não pode ser maior que a final');
                        res.redirect('/locacao/todasAdm');
                    }else{
                        const valor = dias*car.valor_loc
                        if(valor==0){
                            const val = car.valor_loc
                            const loc = {
                                nome: req.body.nome,
                                veiculo: req.body.veiculo,
                                dataIn: req.body.dataIn,
                                dataFim: req.body.dataFim,
                                valor:val,
                                status:req.body.status,
                                idCarro:car.id,
                                idUser: customer.id
                            }
                            await Loc.update(loc, { where: { id: id } })
                            res.redirect('/locacao/todasAdm')
                        }else{
                            const loc = {
                                nome: req.body.nome,
                                veiculo: req.body.veiculo,
                                dataIn: req.body.dataIn,
                                dataFim: req.body.dataFim,
                                valor: valor,
                                status: req.body.status,
                                idCarro:car.id,
                                idUser: customer.id
                            }
                        await Loc.update(loc, { where: { id: id } })
                        const statusLoc = req.body.status
                        if(statusLoc=="Pago"||statusLoc=="Cancelada"){
                            const Status = "Sim"
                                const carro = {
                                    nome: car.nome,
                                    modelo: car.modelo,
                                    ano: car.ano,
                                    fabricante: car.fabricante,
                                    valor_loc:car.valor_loc,
                                    cor: car.cor,
                                    disponivel: Status,
                                    adicionais: car.adicionais
                                }
                            await Car.update(carro, { where: { id: idcar } })
                        }else{
                                const Status = "Não"
                                const carro = {
                                    nome: car.nome,
                                    modelo: car.modelo,
                                    ano: car.ano,
                                    fabricante: car.fabricante,
                                    valor_loc:car.valor_loc,
                                    cor: car.cor,
                                    disponivel: Status,
                                    adicionais: car.adicionais
                                }
                            await Car.update(carro, { where: { id: idcar } })
                        }
                        res.redirect('/locacao/todasAdm')
                        }
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    //listar locações de todos os usuarios
    static async allLoc(req, res) {
        try {
            const loc = await Loc.findAll({ raw: true })
            res.render('loc/allLocADM', { loc })
        } catch (error) {
            console.log(error)
        }
    }

    static async devolverVeiculo(req, res){
        const id = req.params.id;

        const locData = {
            status: 'Entregue'
        }
        await Loc.update(locData, {where:{id:id}})
        res.redirect('/locacao/todasUsu')
    }
}
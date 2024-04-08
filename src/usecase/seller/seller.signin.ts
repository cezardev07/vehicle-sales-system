import { Request, Response } from "express";
import database from "../../model/prisma";
import Bcrypt from "../../bcrypt/bcrypt";

export default class SignIn{
  public async handle(request: Request, response: Response): Promise<Response>{
    const {username, senha} = request.body
    if(!username || !senha){
      return response.status(400).json({
        message: "dados incompletos"
      })
    }
    const seller = await database.vendedor.findUnique({
      where:{
        username
      },
      select: {
        id: true,
        nome: true,
        username: true,
        telefone: true,
        senha: true,
        veiculos: {
          include: {
            imagens: true
          }
        }
      }
    })
    
    if(!seller){
      return response.status(404).json({
        message: "não foi possivel fazer login, username não encontrado"
      });
    }

    const bcrypt = new Bcrypt()

    if(!await bcrypt.compare(senha, seller.senha)){
      return response.status(401).json({
        message: "não foi possivel fazer login, a senha está incorreta"
      });
    }

    return response.status(200).json({
      message: "login realizado com sucesso",
      seller
    });
  }
}
import { Request, Response } from "express";
import database from "../../model/prisma";
import Bcrypt from "../../bcrypt/bcrypt";

export default class SignUp{
  public async handle(request: Request, response: Response): Promise<Response>{
    const {nome, username, senha, telefone} = request.body
    if(!nome || !username || !senha || !telefone){
      return response.status(400).json({
        message: "dados incompletos"
      })
    }
    if(await database.vendedor.findUnique({
      where: {
        username
      }
    })){
      return response.status(400).json({
        message: "O username já existe"
      });
    }
    const bcrypt = new Bcrypt()
    const encrypt = await bcrypt.encrypt(senha)
    const saller = await database.vendedor.create({
      data:{
        nome,
        username,
        senha: encrypt,
        telefone
      }
    })
    return response.status(200).json({
      message: "Cadastrado com sucesso! Boas vendas",
      saller
    });
  }
}
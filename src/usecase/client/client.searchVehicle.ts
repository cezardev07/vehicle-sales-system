import { Request, Response } from "express";
import database from "../../model/prisma";

export default class SearchVehicle{
  public async handle(request: Request, response: Response): Promise<Response>{
    const {nome} = request.params
    if(!nome.trim()){
      return response.status(400).json({
        message: "nome não informado"
      })      
    }
    const data = await database.veiculo.findMany({
      where: {
        nome 
      }
    })
    if(data.length <= 0){
      return response.status(404).json({
        message: "veiculo não encontrado"
      })
    }
    return response.status(200).json(data)
  }
}
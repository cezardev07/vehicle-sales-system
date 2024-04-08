import { Request, Response } from "express";
import database from "../../model/prisma";

export default class GetOneVehicle{
  public async handle(request: Request, response: Response): Promise<Response>{
    const {id} = request.params
    if(!id.trim()){
      return response.status(400).json({
        message: "id não informado"
      })      
    }
    const data = await database.veiculo.findUnique({
      where: {
        id 
      },
      include: {
        imagens: true
      }
    })
    if(!data){
      return response.status(404).json({
        message: "veiculo não encontrado ou foi vendido"
      })
    }
    return response.status(200).json(data)
  }
}
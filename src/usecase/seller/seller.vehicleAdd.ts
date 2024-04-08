import { Request, Response } from "express";
import database from "../../model/prisma";
import { port } from "../../serve";
import path from "path";
import fs from "fs";

export default class VehicleAdd{
  public async handle(request: Request, response: Response): Promise<Response>{
    const {
      vendedorId,
      nome,
      marca,
      descricao,
      preco,
      km,
      cidade,
      cambio
    } = request.body

    const imagem = request.file

    if(!imagem) {
      return response.status(400).json({
        message: "Sem imagem"
      })
    }

    if(
      !vendedorId ||
      !nome ||
      !marca ||
      !descricao ||
      !preco ||
      !km ||
      !cidade ||
      !cambio
    ){
      const file = request.file?.filename
      if(file){
        const imagePath = path.join(process.cwd(), "src", "uploads", file);
        fs.unlinkSync(imagePath);
      }
      return response.status(400).json({
        message: "Dados incompletos"
      })
    }
    
    const veiculo = await database.veiculo.create({
      data:{
        vendedorId,
        nome,
        marca,
        descricao,
        preco: Number(preco),
        km: Number(km),
        cidade,
        cambio
      }
    })

    await database.imagem.create({
      data:{
        imagem: `${request.protocol}://${request.hostname}:${port}/${imagem.filename}`,
        nomeDaImagem: imagem.filename,
        veiculoId: veiculo.id
      }
    })

    return response.status(200).json({
      message: "Veiculo cadastrado com sucesso! Boas vendas",
    });
  }
}
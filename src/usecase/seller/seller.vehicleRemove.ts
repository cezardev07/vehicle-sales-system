import { Request, Response } from "express";
import database from "../../model/prisma";
import fs from 'fs';
import path from 'path';

export default class VehicleRemove{
  public async handle(request: Request, response: Response): Promise<Response>{
    const { id, vendedorId } = request.params;
    if (!id || !vendedorId) {
      return response.status(400).json({
        message: "Dados incompletos"
      });
    }

    const veiculo = await database.veiculo.findUnique({
      where: {
        id,
        vendedorId
      },
      include: {
        imagens: true // Carregar as imagens associadas ao veículo
      }
    });

    if (!veiculo) {
      return response.status(404).json({
        message: "Veículo não encontrado"
      });
    }

    // Excluir todas as imagens associadas ao veículo
    await Promise.all(veiculo.imagens.map(async (imagem) => {
      await database.imagem.delete({
        where: {
          id: imagem.id
        }
      });

      // Excluir as imagens do sistema de arquivos
      veiculo.imagens.forEach(imagem => {
        const imagePath = path.join(process.cwd(), "src", "uploads", imagem.nomeDaImagem);
        fs.unlinkSync(imagePath);
      });
    }));

    // Depois que todas as imagens são excluídas, você pode excluir o veículo
    await database.veiculo.delete({
      where: {
        id,
        vendedorId
      }
    });

    return response.status(200).json({
      message: "Veículo deletado com sucesso"
    });
  }
}
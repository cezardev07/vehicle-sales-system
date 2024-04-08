import { Request, Response } from "express";
import database from "../../model/prisma";
import Bcrypt from "../../bcrypt/bcrypt";
import fs from 'fs';
import path from 'path';

export default class SellerDelete {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { username, senha } = request.body;
    if (!username || !senha) {
      return response.status(400).json({
        message: "dados incompletos"
      });
    }

    const seller = await database.vendedor.findUnique({
      where: {
        username
      },
      include: {
        veiculos: {
          include: {
            imagens: true
          }
        }
      }
    });

    if (!seller) {
      return response.status(404).json({
        message: "não foi possível deletar, username não encontrado"
      });
    }

    const bcrypt = new Bcrypt();

    if (!await bcrypt.compare(senha, seller.senha)) {
      return response.status(401).json({
        message: "não foi possível deletar, a senha está incorreta"
      });
    }

    await Promise.all(seller.veiculos.map(async (veiculo) => {
      await database.imagem.deleteMany({
        where: {
          veiculoId: veiculo.id,
        },
      });

      veiculo.imagens.forEach(imagem => {
        const imagePath = path.join(process.cwd(), "src", "uploads", imagem.nomeDaImagem);
        fs.unlinkSync(imagePath);
      });
    }));

    await database.veiculo.deleteMany({
      where: {
        vendedorId: seller.id,
      },
    });

    await database.vendedor.delete({
      where: {
        username
      },
    });

    return response.status(200).json({
      message: "Deletado com sucesso",
      seller
    });
  }
}

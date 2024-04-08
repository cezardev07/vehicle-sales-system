import { Request, Response } from "express";
import database from "../../model/prisma";

const DEFAULT_PAGE_SIZE = 20;

export default class GetAllVehicle {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { page, pageSize } = request.query;
    const pageNumber = parseInt(page as string) || 1;
    const limit = parseInt(pageSize as string) || DEFAULT_PAGE_SIZE;
    const offset = (pageNumber - 1) * limit;

    try {
      const totalCount = await database.veiculo.count(); 
      const maxPage = Math.ceil(totalCount / limit); 

      const data = await database.veiculo.findMany({
        include: {
          imagens: true,
        },
        skip: offset,
        take: limit,
      });

      return response.status(200).json({
        skip: offset,
        take: limit,
        pageNumber,
        maxPage,
        data
      });
    } catch (error) {
      return response.status(500).json({ message: "Erro ao buscar veículos", error });
    }
  }
}

import { Router, Request, Response } from "express";
import GetAllVehicle from "../usecase/client/client.getAllVehicle";
import GetOneVehicle from "../usecase/client/client.getOneVehicle";
import SearchVehicle from "../usecase/client/client.searchVehicle";

export default class ClientRouter{
  constructor(
    protected router: Router
  ){
    this.handle()
  }
  protected handle(): void{
    this.router.get("/", async (request:Request, response:Response): Promise<Response> => {
      const getAllVehicle = new GetAllVehicle()
      return getAllVehicle.handle(request, response)
    })   
    this.router.get("/unique/:id", async (request:Request, response:Response): Promise<Response> => {
      const getOneVehicle = new GetOneVehicle()
      return getOneVehicle.handle(request, response)
    }) 
    this.router.get("/search/:nome", async (request:Request, response:Response): Promise<Response> => {
      const searchVehicle = new SearchVehicle()
      return searchVehicle.handle(request, response)
    })  
  }
  get routes(): Router{
    return this.router
  }
}
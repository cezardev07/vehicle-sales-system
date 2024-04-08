import { Router, Request, Response } from "express";
import SignUp from "../usecase/seller/seller.signup";
import SignIn from "../usecase/seller/seller.signin";
import SellerDelete from "../usecase/seller/seller.delete";
import VehicleAdd from "../usecase/seller/seller.vehicleAdd";
import { upload } from "../multer/multer";
import VehicleRemove from "../usecase/seller/seller.vehicleRemove";

export default class SellerRouter{
  constructor(
    protected router: Router
  ){
    this.handle()
  }
  protected handle(): void{
    this.router.post("/signup", async (request:Request, response:Response): Promise<Response> => {
      const signUp = new SignUp()
      return signUp.handle(request, response)
    })
    this.router.post("/signin", async (request:Request, response:Response): Promise<Response> => {
      const signin = new SignIn()
      return signin.handle(request, response)
    }) 
    this.router.delete("/delete", async (request:Request, response:Response): Promise<Response> => {
      const sellerDelete = new SellerDelete()
      return sellerDelete.handle(request, response)
    }) 
    this.router.post("/addvehicle", upload.single("imagem"),async (request:Request, response:Response): Promise<Response> => {
      const vehicleAdd = new VehicleAdd()
      return vehicleAdd.handle(request, response)
    })  
    this.router.delete("/removevehicle/:id/:vendedorId", async (request:Request, response:Response): Promise<Response> => {
      const vehicleRemove = new VehicleRemove()
      return vehicleRemove.handle(request, response)
    })
  }
  get routes(): Router{
    return this.router
  }
}
import { Request, Response } from "express"
import { UsersService } from "../services/UsersServices"

class UsersController {
    async create(request: Request, response: Response): Promise<Response>{
        const { email } = request.body

        const usersServices = new UsersService();

        const users = await usersServices.create(email)

        return response.json(users)
    }

} 

export { UsersController }
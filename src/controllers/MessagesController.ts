import { Request, Response } from "express"
import { MessagesServices } from "../services/MessagesServices"

class MessagesController {
    async create(request: Request, response: Response){
        const { admin_id, user_id, text } = request.body

        const messagesServices = new MessagesServices()

        const message = await messagesServices.create({ admin_id, user_id, text })

        return response.json(message)

    }    
}

export { MessagesController }
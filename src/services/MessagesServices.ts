import { getCustomRepository } from "typeorm"
import { MessagesRespository } from "../repositories/messagesRepository"

interface IMessagesCreate{
    admin_id?: string // Caso o Admin não for preenchido para o controller a aplicação continua
    text: string
    user_id: string
}

class MessagesServices {
    async create( { admin_id, text, user_id } : IMessagesCreate){
        const messagesRepository = getCustomRepository(MessagesRespository)

        const message = messagesRepository.create({
            admin_id,
            text,
            user_id
        })

        await messagesRepository.save(message)

        return message
    }
    
}

export { MessagesServices }
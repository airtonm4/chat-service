import { getCustomRepository, Repository } from "typeorm"
import { Message } from "../entities/Message"
import { MessagesRespository } from "../repositories/messagesRepository"

interface IMessagesCreate {
    admin_id?: string // Caso o Admin não for preenchido para o controller a aplicação continua
    text: string
    user_id: string
}

class MessagesServices {
    private messagesRepository: Repository<Message>

    constructor() {
        this.messagesRepository = getCustomRepository(MessagesRespository)
    }
    async create({ admin_id, text, user_id }: IMessagesCreate) {
        const message = this.messagesRepository.create({
            admin_id,
            text,
            user_id
        })

        await this.messagesRepository.save(message)

        return message
    }

    async listByUser(user_id: string) {
        const list = await this.messagesRepository.find({
            where: { user_id },
            relations: ["user"]
        })

        return list
    }

}

export { MessagesServices }
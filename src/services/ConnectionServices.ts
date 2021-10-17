import { getCustomRepository, Repository } from "typeorm";
import { ConnectionsRepository } from "../repositories/connectionsRespository";
import { Connection } from "../entities/Connection"

interface IConnetion {
    socket_id: string,
    user_id: string,
    admin_id?: string,
    id?: string
}
class ConnectionsServices {
    private connectionRepository: Repository<Connection>

    constructor() {
        this.connectionRepository = getCustomRepository(ConnectionsRepository)
    }

    async create({ socket_id, user_id, admin_id, id }: IConnetion) {
        const connection = this.connectionRepository.create({
            socket_id,
            user_id,
            admin_id,
            id
        })
        await this.connectionRepository.save(connection)
    }

    async findByUserId(user_id: string) {
        const connection = await this.connectionRepository.findOne({
            user_id
        })
        return connection
    }

    async findWithoutAdmin() {
        const connection = this.connectionRepository.find({
            where: { admin_id: null },
            relations: ["user"]
        })

        return connection
    }

    async findBySocketID(socket_id: string) {
        const connection = this.connectionRepository.findOne({
            socket_id
        })

        return connection
    }

    async udpateAdminID(user_id: string, admin_id: string) {
        await this.connectionRepository.createQueryBuilder().update(Connection).set({ admin_id }).where("user_id = :user_id", {
            user_id
        }).execute()
    }
}

export { ConnectionsServices }
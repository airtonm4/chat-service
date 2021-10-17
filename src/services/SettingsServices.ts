import { getCustomRepository, Repository } from "typeorm"
import { Setting } from "../entities/Setting"
import { SettingsRepository } from "../repositories/settingsRepository"

interface SettingsCreate {
    chat: boolean,
    username: string
}

class SettingsServices {
    private settingsRepository: Repository<Setting>

    constructor() {
        this.settingsRepository = getCustomRepository(SettingsRepository)
    }
    async create({ chat, username }: SettingsCreate) {
        // Select * from settings where username = "username" limit 1;
        const userAlreadyExist = await this.settingsRepository.findOne({
            username
        })

        if (userAlreadyExist) {
            throw new Error("User already exist.")
        }

        const settings = this.settingsRepository.create({
            chat,
            username
        })

        await this.settingsRepository.save(settings)

        return (settings)
    }
    async findByUsername(username: string) {
        const settings = await this.settingsRepository.findOne({
            username
        })
        return settings
    }

    async update(username: string, chat: boolean) {
        await this.settingsRepository.createQueryBuilder().update(Setting).set({ chat })
            .where("username = :username", {
                username
            }).execute()
    }
}

export { SettingsServices }
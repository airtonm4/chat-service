import { getCustomRepository } from "typeorm"
import { SettingsRepository } from "../repositories/settingsRepository"

interface SettingsCreate{
    chat: boolean,
    username: string
}

class SettingsServices {

    async create ({ chat, username } : SettingsCreate) {
        const settingsRepository = getCustomRepository(SettingsRepository)
        // Select * from settings where username = "username" limit 1;
        const userAlreadyExist = await settingsRepository.findOne({
            username
        })

        if (userAlreadyExist) {
            throw new Error("User already exist.")
        }
    
        const settings = settingsRepository.create({
            chat,
            username
        })
        
        await settingsRepository.save(settings)

        return (settings)
    }
}

export {SettingsServices}
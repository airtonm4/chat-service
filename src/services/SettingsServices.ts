import { getCustomRepository } from "typeorm"
import { SettingsRepository } from "../repositories/settingsRepository"

interface SettingsCreate{
    chat: boolean,
    username: string
}

class SettingsServices {

    async create ({ chat, username } : SettingsCreate) {
        const settingsRepository = getCustomRepository(SettingsRepository)
    
        const settings = settingsRepository.create({
            chat,
            username
        })
        
        await settingsRepository.save(settings)

        return (settings)
    }
}

export {SettingsServices}
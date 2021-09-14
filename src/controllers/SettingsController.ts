import { Request, Response } from "express";
import { SettingsServices } from "../services/SettingsServices"

class SettingsControllers {
    async create(request: Request, response: Response){
        const {chat, username} = request.body;

        const settingsServices = new SettingsServices();

        const settings = await settingsServices.create({ chat, username })

        return response.json(settings)
    }
}

export { SettingsControllers}
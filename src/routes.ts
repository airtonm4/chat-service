import { Router } from "express";
import { SettingsControllers } from "./controllers/SettingsController";

const routes = Router()
const settingsController = new SettingsControllers()
routes.post("/settings", settingsController.create)

export { routes }
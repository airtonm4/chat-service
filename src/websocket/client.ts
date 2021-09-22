import { io } from "../http"
import { ConnectionsServices } from "../services/ConnectionServices"
import { UsersService} from "../services/UsersServices"

io.on("connect", (socket) => {
    const connectionsServices = new ConnectionsServices()
    const userService = new UsersService()


    socket.on("client_first_acess", async params => {
        const socket_id = socket.id
        const { text, email } = params

        const userExists = await userService.findByEmail(email)

        if (!userExists) {
            const user = await userService.create(email)
            
            await connectionsServices.create({
                socket_id,
                user_id: user.id
            })
        }else{
            await connectionsServices.create({
                socket_id,
                user_id: userExists.id
            })
        }

        
    })
})
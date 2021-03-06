import { io } from "../http"
import { ConnectionsServices } from "../services/ConnectionServices"
import { MessagesServices } from "../services/MessagesServices"
import { UsersService } from "../services/UsersServices"

io.on("connect", (socket) => {
    const connectionsServices = new ConnectionsServices()
    const userService = new UsersService()
    const messagesServices = new MessagesServices()
    let user_id = null

    interface IParams {
        email: string,
        text: string
    }

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

            user_id = user.id
        } else {
            user_id = userExists.id
            const connection = await connectionsServices.findByUserId(userExists.id)
            if (!connection) {
                await connectionsServices.create({
                    socket_id,
                    user_id: userExists.id
                })
            } else {
                connection.socket_id = socket_id

                await connectionsServices.create(connection)
            }
        }

        await messagesServices.create({
            text,
            user_id
        })

        const allMessages = await messagesServices.listByUser(user_id)

        socket.emit("client_list_all_messages", allMessages)

        const allUsers = await connectionsServices.findWithoutAdmin()

        io.emit("admin_list_all_users", allUsers)
    })

    socket.on("client_message_to_admin", async params => {
        const { text, socketAdminId } = params

        const socket_id = socket.id

        const { user_id } = await connectionsServices.findBySocketID(socket_id)

        const message = await messagesServices.create({
            text,
            user_id
        })
        io.to(socketAdminId).emit("admin_receive_message", {
            message,
            socket_id
        })
    })
})
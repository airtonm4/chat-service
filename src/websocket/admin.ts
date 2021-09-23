import { io } from "../http"
import { ConnectionsServices } from "../services/ConnectionServices"
import { MessagesServices } from "../services/MessagesServices"

io.on("connect", async (socket) => {
    const connectionsServices = new ConnectionsServices()
    const messagesServices = new MessagesServices()

    const allConectionsWithoutAdmin = await connectionsServices.findWithoutAdmin()

    io.emit("admin_list_all_users", allConectionsWithoutAdmin)

    socket.on("admin_list_message_by_user",async (params, callback) => {
        const { user_id } = params

        const allMessages = await messagesServices.listByUser(user_id)

        callback(allMessages)
    })
})
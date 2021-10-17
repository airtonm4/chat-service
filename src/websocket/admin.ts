import { io } from "../http"
import { ConnectionsServices } from "../services/ConnectionServices"
import { MessagesServices } from "../services/MessagesServices"

io.on("connect", async (socket) => {
    const connectionsServices = new ConnectionsServices()
    const messagesServices = new MessagesServices()

    const allConectionsWithoutAdmin = await connectionsServices.findWithoutAdmin()

    io.emit("admin_list_all_users", allConectionsWithoutAdmin)

    socket.on("admin_list_message_by_user", async (params, callback) => {
        const { user_id } = params

        const allMessages = await messagesServices.listByUser(user_id)

        callback(allMessages)
    })

    socket.on("admin_send_message", async params => {
        const { text, user_id } = params

        await messagesServices.create({
            text,
            user_id,
            admin_id: socket.id
        })

        const { socket_id } = await connectionsServices.findByUserId(user_id)

        io.to(socket_id).emit("admin_send_to_client", {
            text,
            socket_id: socket.id
        })
    })

    socket.on("user_in_suppport", async params => {
        const { user_id } = params
        await connectionsServices.udpateAdminID(user_id, socket.id)

        const allConectionsWithoutAdmin = await connectionsServices.findWithoutAdmin()

        io.emit("admin_list_all_users", allConectionsWithoutAdmin)

    })
})
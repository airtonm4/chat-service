let socketAdminId = null
document.querySelector("#start_chat").addEventListener("click", (event) => {
    const socket = io();

    const chat_help = document.getElementById("chat_help");
    chat_help.style.display = "none";

    const chat_in_support = document.getElementById("chat_in_support");
    chat_in_support.style.display = "block";

    const email = document.getElementById("email").value;
    const text = document.getElementById("txt_help").value;

    socket.on("connect", () => {
        const params = {email, text}
        socket.emit("client_first_acess", params, (call, err) => {
            if (err) {
                console.log(err)
            }else{
                console.log(call)
            }
        })
    })

    socket.on("client_list_all_messages", messages => {
        let template_client = document.getElementById("message-user-template").innerHTML
        let template_admin = document.getElementById("admin-template").innerHTML

        messages.forEach(messages => {
            if (messages.admin_id == null) {
                const rendered =  Mustache.render(template_client, {
                    message: messages.text,
                    email
                }) 

                document.getElementById("messages").innerHTML += rendered
            }else{
                const rendered = Mustache.render(template_admin, {
                    message_admin: messages.text
                })

                document.getElementById("messages").innerHTML += rendered
            }
        })
    })

    socket.on("admin_send_to_client", data => {
        socketAdminId = data.socket_id
        const template_admin = document.getElementById("admin-template").innerHTML

        const rendered = Mustache.render(template_admin, {
            message_admin: data.text
        })
        
        document.getElementById("messages").innerHTML += rendered
    })

})
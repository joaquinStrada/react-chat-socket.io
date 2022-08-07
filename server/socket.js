const socket = io => {
    io.on('connection', socket => {
        console.log('New user connected', socket.id)

        socket.on('client:message', message => {
            socket.broadcast.emit('server:message', {
                from: socket.id,
                body: message
            })
        })
    })
}

export default socket
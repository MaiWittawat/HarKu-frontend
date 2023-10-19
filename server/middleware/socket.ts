import { Server } from 'socket.io'

const io = new Server(3002, {
    cors: {
        origin: 'http://localhost:3000',
    }
});

io.on('connection', (socket) => {
    console.log('Connection', socket.id)
})

io.on('connect', (socket) => {

    // socket.emit('message', `welcome ${socket.id}`)
    // socket.broadcast.emit('message', `${socket.id} joined`)

    // socket.on('message', (message) => {
    //     console.log(`ID [${socket.id}] speak [${message}]`)
    //     socket.broadcast.emit('message', message)
    // })

    // socket.on('disconnecting', () => {
    //     console.log('disconnected', socket.id)
    //     socket.broadcast.emit('message', `${socket.id} left`)
    // })


    socket.on('message', (message) => {
        console.log(`ID [${socket.id}] speak [${message}]`)
        socket.broadcast.emit('message', message)
    })


    socket.on('messageTo',(user)=>{
        console.log("userId : ",user.id)
        console.log("userName : ",user.name)
        console.log("userEmail : ",user.email)
        console.log("socket.room :",socket.rooms)
        // io.to()
    })

});


export default defineEventHandler((event) => {
    // console.log('New request: ' + getRequestURL(event))
    console.log('New request event')
})




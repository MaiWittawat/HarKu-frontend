import { useFetch } from 'nuxt/app';
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


    socket.on('message', (message, user) => {
        const roomName = `room-${user.id}`;
        socket.to(roomName).emit('message', message);
        // console.log(`userId ${user.id} speak ${message} to room: ${roomName}`)
        // console.log(`ID [${socket.id}] speak [${message}]`)
        // socket.broadcast.emit('message', message)
    })


    socket.on('messageTo', async(sender, receiver)=>{
        console.log("sender: ",sender)
        console.log("receiver:", receiver)
        const {data:res,error} = await useFetch('http://localhost/api',{
            method: "POST",
            body: {
                sender_id: sender.id,
                receiver_id: receiver.id
            }
        });

        if(res.value !== null){
            console.log("have value")
            const room = `room-${res.value.match_by}${res.value.match_to}`
            socket.join(room)
            console.log(`user ${sender.name} join room : ${room}`)

        }
        else {
            console.log("don't have value")
        }


        // const roomName = `room-${sender.id}`;
        // socket.join(roomName);

        // console.log(user.id, "join room :", roomName)

        // console.log("userId : ",user.id)
        // console.log("userName : ",user.name)
        // console.log("userEmail : ",user.email)
        // console.log("socket.room :",socket.rooms)
        // io.to()
    })


    socket.on('disconnecting', () => {
        console.log('disconnected', socket.id)
        socket.broadcast.emit('message', `${socket.id} left`)
    })

});


export default defineEventHandler((event) => {
    // console.log('New request: ' + getRequestURL(event))
    console.log('New request event')
})




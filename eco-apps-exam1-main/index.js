import express, { request, response } from "express";
import {
    Server
} from "socket.io";


const PORT = 8080
const expressApp = express()
const httpServer = expressApp.listen(PORT, () => {
    console.table({
        'Game': `http://localhost:${PORT}/game`,
        'Controller': `http://localhost:${PORT}/controller`
    })

})
const io = new Server(httpServer, { path: '/real-time'})

expressApp.use('/game', express.static('public-game'))
expressApp.use('/controller', express.static('public-controller'))
expressApp.use(express.json())

/*___________________________________________

1) Create the socket methods to listen the events and emit a response
It should listen for directions and emit the incoming data.
_____________________________________________ */

let currentScore = 0;

io.on('connection', (socket) => {
    console.log(socket.id)

    socket.on('message-controller', message => {
        socket.broadcast.emit('message-server', message)
    })

    socket.on('controller-sendDirection', position => {
        socket.broadcast.emit('game-position', position)
    })
})

/*___________________________________________

2) Create an endpoint to POST player's current score and print it on console
_____________________________________________ */

expressApp.post('/score', (request, response) => {
   //
})

/*___________________________________________

3) Create an endpoint to GET player's final score and print it on canvas
_____________________________________________ */

expressApp.get('/final-score', (request, response) => {
    const { score } = request.body
    currentScore = score
    consol.log('Score: ' + scoreActual)
    response.end()
})

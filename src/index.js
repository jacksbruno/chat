import express from 'express'
import http from 'http'
import sockeio from 'socket.io'

const app = express()
const server = http.Server(app)
const io = sockeio(server)

app.use(express.static(__dirname + '/public'))

io.on('connect', (socket) => {
  io.to(socket.id).emit({
    status: true,
    message: 'Conexão estabelecida com o servidor!'
  })

  socket.on('teste', res => {
    console.log('Mensagem Recebida', res)
    socket.broadcast.emit('teste', res)
  })
})

app.get('/', (req, res) => {
  res.render('index.html')
})

server.listen(3333, () => {
  console.log('servidor ouvindo na porta 3333')
})
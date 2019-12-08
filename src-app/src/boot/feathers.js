import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'
import VueFeathers from '@vue-feathers/vue-feathers'

// Boot function
export default ({ Vue }) => {
  // Create a feathersClient over websockets
  const socket = io('http://localhost:3030', { transports: ['websocket'] })
  const feathersClient = feathers()
  feathersClient.configure(socketio(socket))

  // Register VueFeathers
  Vue.use(VueFeathers, { feathersClient })
}

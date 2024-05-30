const app = require('../app'); // Ubah path sesuai dengan lokasi app.js Anda
const debug = require('debug')('yourapp:server');
const http = require('http');

// Dapatkan port dari lingkungan dan simpan di Express
const port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

// Buat server HTTP
const server = http.createServer(app);

// Dengarkan pada port yang disediakan, pada semua antarmuka jaringan
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// Normalisasi port menjadi angka, string, atau false
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // nomor port
    return port;
  }

  return false;
}

// Penangan kesalahan spesifik dengan pesan ramah
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' memerlukan hak istimewa yang ditinggikan');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' sudah digunakan');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Listener acara HTTP server "listening"
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

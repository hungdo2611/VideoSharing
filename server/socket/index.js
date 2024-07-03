let connection = null;

class Socket {
    socket;

    constructor() {
        this.socket = null;
    }
    connect(server) {
        console.log('connect sv')
        const io = require("socket.io")(server, {
            cors: {
                origin: '*',
            }
        });
        io.on("connection", (socket) => {
            console.log("new connection")
            this.socket = socket;
        });
    }
    emit(event, data) {
        this.socket.emit(event, data);
    }
    static init(server) {
        console.log('init ws');
        if (!connection) {
            connection = new Socket();
            connection.connect(server);
        }
    }
    static getConnection() {
        if (connection) {
            return connection;
        }
    }
}
module.exports = {
    connect: Socket.init,
    connection: Socket.getConnection
};
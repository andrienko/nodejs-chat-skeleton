/** The class for chat engine itself. Everything happens here. */

class Chat {

  constructor(io){
    this.io = io;
    this.connections = [];
  }

  /**
   * Triggered when new connection is initialized
   * @param {Connection} connection The connection that was just established
   */
  connected(connection){
    this.connections.push(connection);

    connection.send_message(
      'System',
      "\n\nWelcome! This is the MOTD or something\nServer time is "+(new Date()),
      'system'
    );
  }

  /**
   * Triggered when connection sends message to chat
   * @param {Connection} connection The connection that sent the message
   * @param {Object} data Message data
   */
  incomming_message(connection,data){
    if(data.msg && data.msg.trim() !== '') {
      this.io.emit('message', Object.assign({time: new Date()}, data));
    }
  }

  /**
   * Triggered when the connection is disconnected
   * @param {Connection} connection The connection that was just disconnected
   */
  disconnected(connection){

  }
}

module.exports = Chat;
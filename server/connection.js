/** The class wrapper for client connection. Connection is not same as authorization - if you want connections to have
 * account names or something - you should probably think about creating a new class, something like "User" or whatever
 */

class Connection {

  constructor(socket){
    this.socket = socket;
    this.ip = socket.request.connection.remoteAddress;
  }

  /**
   * Sends a message to the connection (personally)
   * @param {string} name Name that will be displayed
   * @param {string} msg Message that will be displayed
   * @param {string} cls Class that will be displayed ('default' by default)
   */
  send_message(name, msg, cls){
    cls = cls || 'default';
    const time = new Date();
    this.socket.emit('message', { cls, name, time, msg} );
  }

  /** Forces the client to disconnect */
  disconnect(){
    this.socket.disconnect();
  }

}

module.exports = Connection;
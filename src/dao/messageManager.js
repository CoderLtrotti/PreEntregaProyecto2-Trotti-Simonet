import Message from './models/message.js';

class MessageManager {
    constructor() {
      this.messages = [];
    }
  
    getAllMessages() {
      return this.messages;
    }
  
    getMessageById(id) {
      return this.messages.find((message) => message.id === id);
    }
  
    createMessage(content) {
      const id = Date.now().toString();
      const message = {
        id,
        content,
      };
      this.messages.push(message);
      return message;
    }
  
    updateMessage(id, content) {
      const message = this.getMessageById(id);
      if (message) {
        message.content = content;
        return message;
      }
      return null;
    }
  
    deleteMessage(id) {
      const index = this.messages.findIndex((message) => message.id === id);
      if (index !== -1) {
        this.messages.splice(index, 1);
        return true;
      }
      return false;
    }
  }
  
  export default MessageManager;
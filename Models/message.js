class Message {
  constructor(message, code) {
    this.Message = message
    if
      (code >= 200 && code <= 299) {
      this.type = "success";
    }
    else if
      (code >= 300 && code <= 400) {
      this.type = "redirection"
    }
    else if
      (code >= 500 && code <= 600) {
        this.type = "client error"
      }
      else {
      this.type = "server error"
    }

  }
}
module.exports = Message










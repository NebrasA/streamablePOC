from flask import Flask, render_template
from flask_socketio import SocketIO,send,emit
import time
import _thread

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)
messages=[]

@socketio.on('message')
def handle_json(json):
    print('received json: ' + str(json))
    messages.append(json['data'])

@app.route("/")
def hello():
    try:
        _thread.start_new_thread(generateEvent, ("myEventOne","testOne",1))
        _thread.start_new_thread(generateEvent, ("myEventTwo","testTwo",.2))
        return "threads started successfully"
    except e:
        print(e)

def generateEvent(eventName, data, t):
    while 1:
        socketio.emit(eventName,data)
        time.sleep(t)
        

if __name__ == '__main__':
    socketio.run(app)

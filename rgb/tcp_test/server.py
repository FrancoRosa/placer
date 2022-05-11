from tcpcom import TCPServer
from time import sleep
from threading import Thread

port = 5000
print("...running server")


def onStateChanged(state, msg):
    if state == TCPServer.CONNECTED:
        print("....device connected")


def saySomething():
    global server

    while True:
        sleep(5)
        print("sending message")
        server.sendMessage("This sucks")


def startServer():
    global server
    server = TCPServer(port, stateChanged=onStateChanged)


Thread(target=startServer, args=()).start()
Thread(target=saySomething, args=()).start()

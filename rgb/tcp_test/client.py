from tcpcom import TCPClient
from time import sleep

port = 5000
host = "localhost"


def onStateChanged(state, msg):
    if state == TCPClient.MESSAGE:
        print(msg)
    if state == TCPClient.CONNECTION_FAILED:
        print("...unable to connect")


client = TCPClient(host, port, stateChanged=onStateChanged)
while True:
    sleep(5)
    client.connect()

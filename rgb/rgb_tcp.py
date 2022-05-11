from samplebase import SampleBase
from rgbmatrix import graphics
from colormap import colors
from time import sleep
from threading import Thread
from json import loads

from tcpcom import TCPClient
from time import sleep

port = 5000
host = "192.168.1.4"


FONTS = '/home/pi/pile-placer/rgb/fonts/'
piles = [
    {
        'distance': 1,
        'color': 'red'
    },
    {
        'distance': 20,
        'color': 'green'
    }
]

timer_counter = 0
timer_limit = 30
display_values = True


def onStateChanged(state, msg):
    global piles, timer_counter

    if state == TCPClient.MESSAGE:
        print(msg)
        piles = loads(p)
        timer_counter = 0
    if state == TCPClient.CONNECTION_FAILED:
        print("...unable to connect")


def get_color_by_distance(distance):
    if distance >= 25:
        return 'red'
    if distance <= 6:
        return 'green'
    return 'orange'


class RunText(SampleBase):
    def __init__(self, *args, **kwargs):
        super(RunText, self).__init__(*args, **kwargs)
        self.parser.add_argument(
            "-t", "--text", help="The text to scroll on the RGB LED panel", default="Hello world!")

    def run(self):
        offscreen_canvas = self.matrix.CreateFrameCanvas()
        font = graphics.Font()
        font_big = graphics.Font()
        font_small = graphics.Font()
        font.LoadFont(FONTS+"7x13.bdf")
        font_big.LoadFont(FONTS+"10x20.bdf")
        font_small.LoadFont(FONTS+"5x8.bdf")

        def left_block(color, text, distance):
            if color in colors.keys():
                rgb_color = color
            else:
                rgb_color = 'white'

            if distance != -1:
                if color == 'black':
                    graphics.DrawText(offscreen_canvas, font_big,
                                      1, 17, colors['brown'], "\u2588\u2588\u2588\u2588\u2588\u2588\u2588")
                    graphics.DrawText(offscreen_canvas, font_big,
                                      1, 35, colors['brown'], "\u2588\u2588\u2588\u2588\u2588\u2588\u2588")

                if distance < 100:
                    graphics.DrawText(offscreen_canvas, font_big, 20,
                                      15, colors[rgb_color], str(distance)+'Ft')
                else:
                    graphics.DrawText(offscreen_canvas, font, 13,
                                      15, colors[rgb_color], 'too far')
                graphics.DrawText(offscreen_canvas, font_small,
                                  30, 30, colors[rgb_color], color.upper()[:8])

                graphics.DrawText(offscreen_canvas, font_big, 2,
                                  18, colors[rgb_color], "\u2691")

            graphics.DrawText(offscreen_canvas, font,
                              1, 30, colors[get_color_by_distance(distance)], text)

        def right_block(color, text, distance):
            if color in colors.keys():
                rgb_color = color
            else:
                rgb_color = 'white'

            if distance != -1:
                if color == 'black':
                    graphics.DrawText(offscreen_canvas, font_big,
                                      65, 17, colors['brown'], "\u2588\u2588\u2588\u2588\u2588\u2588\u2588")
                    graphics.DrawText(offscreen_canvas, font_big,
                                      65, 35, colors['brown'], "\u2588\u2588\u2588\u2588\u2588\u2588\u2588")

                graphics.DrawText(offscreen_canvas, font_big, 115,
                                  18, colors[rgb_color], "\u2691")
                if distance < 100:
                    graphics.DrawText(offscreen_canvas, font_big, 70,
                                      15, colors[rgb_color], str(distance)+'Ft')
                else:
                    graphics.DrawText(offscreen_canvas, font, 65,
                                      15, colors[rgb_color], 'too far')
                graphics.DrawText(offscreen_canvas, font_small,
                                  66, 30, colors[rgb_color], color.upper()[:8])

                graphics.DrawText(offscreen_canvas, font_big, 115,
                                  18, colors[rgb_color], "\u2691")

            graphics.DrawText(offscreen_canvas, font,
                              100, 30, colors[get_color_by_distance(distance)], text)

        speed = 0.25

        while True:
            if display_values:
                offscreen_canvas = self.matrix.SwapOnVSync(offscreen_canvas)
                offscreen_canvas.Clear()
                left_block(piles[0]['color'], ' <<<', piles[0]['distance'])
                right_block(piles[1]['color'], '>>> ', piles[1]['distance'])
                sleep(speed)

                offscreen_canvas = self.matrix.SwapOnVSync(offscreen_canvas)
                offscreen_canvas.Clear()
                left_block(piles[0]['color'], '< <<', piles[0]['distance'])
                right_block(piles[1]['color'], '>> >', piles[1]['distance'])
                sleep(speed)

                offscreen_canvas = self.matrix.SwapOnVSync(offscreen_canvas)
                offscreen_canvas.Clear()
                left_block(piles[0]['color'], '<< <', piles[0]['distance'])
                right_block(piles[1]['color'], '> >>', piles[1]['distance'])
                sleep(speed)

                offscreen_canvas = self.matrix.SwapOnVSync(offscreen_canvas)
                offscreen_canvas.Clear()
                left_block(piles[0]['color'], '<<< ', piles[0]['distance'])
                right_block(piles[1]['color'], ' >>>', piles[1]['distance'])
                sleep(speed)
            else:
                offscreen_canvas = self.matrix.SwapOnVSync(offscreen_canvas)
                offscreen_canvas.Clear()
                graphics.DrawText(offscreen_canvas, font_small,
                                  1, 30, colors['white'], ' <<')
                graphics.DrawText(offscreen_canvas, font_small,
                                  110, 30, colors['white'], '>> ')
                sleep(speed)
                offscreen_canvas = self.matrix.SwapOnVSync(offscreen_canvas)
                offscreen_canvas.Clear()
                graphics.DrawText(offscreen_canvas, font_small,
                                  1, 30, colors['white'], '< <')
                graphics.DrawText(offscreen_canvas, font_small,
                                  110, 30, colors['white'], '> >')
                sleep(speed)
                offscreen_canvas = self.matrix.SwapOnVSync(offscreen_canvas)
                offscreen_canvas.Clear()
                graphics.DrawText(offscreen_canvas, font_small,
                                  1, 30, colors['white'], '<< ')
                graphics.DrawText(offscreen_canvas, font_small,
                                  110, 30, colors['white'], ' >>')
                sleep(speed)


def timer():
    global display_values, timer_counter
    while True:
        if timer_counter >= timer_limit:
            display_values = False
        else:
            timer_counter = timer_counter + 1
            display_values = True

        sleep(1)


def tcp_client():
    client = TCPClient(host, port, stateChanged=onStateChanged)
    while True:
        sleep(5)
        client.connect()


Thread(target=tcp_client, args=[]).start()
Thread(target=timer, args=[]).start()


if __name__ == "__main__":
    run_text = RunText()
    if (not run_text.process()):
        run_text.print_help()

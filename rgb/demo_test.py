#!/usr/bin/env python
# Display a runtext with double-buffering.
from samplebase import SampleBase
from rgbmatrix import graphics
import time


class RunText(SampleBase):
    def __init__(self, *args, **kwargs):
        super(RunText, self).__init__(*args, **kwargs)
        self.parser.add_argument("-t", "--text", help="The text to scroll on the RGB LED panel", default="Hello world!")

    def run(self):
        offscreen_canvas = self.matrix.CreateFrameCanvas()
        font = graphics.Font()
        font.LoadFont("fonts/7x13.bdf")
        fontBig = graphics.Font()
        fontBig.LoadFont("fonts/10x20.bdf")
        textColor1 = graphics.Color(0, 255, 0)
        textColor2 = graphics.Color(0, 0, 255)
        textColor3 = graphics.Color(255, 0, 0)
        textColor4 = graphics.Color(100, 100, 0)
        pos = offscreen_canvas.width
        my_text = self.args.text

        while True:
            offscreen_canvas.Clear()
            graphics.DrawText(offscreen_canvas, font, 50, 15, textColor1, "Hello ")
            graphics.DrawText(offscreen_canvas, font, 35, 25, textColor2, "Mortenson")
            graphics.DrawText(offscreen_canvas, fontBig, 0, 15, textColor3, "<<")
            graphics.DrawText(offscreen_canvas, fontBig, 0, 29, textColor3, "<<")
            graphics.DrawText(offscreen_canvas, fontBig, 108, 15, textColor4, ">>")
            graphics.DrawText(offscreen_canvas, fontBig, 108, 29, textColor4, ">>")


            time.sleep(0.05)
            offscreen_canvas = self.matrix.SwapOnVSync(offscreen_canvas)


# Main function
if __name__ == "__main__":
    run_text = RunText()
    if (not run_text.process()):
        run_text.print_help()

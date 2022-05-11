# RBG Display
> Use an RGB matrix to show the next Pile

## Installation
Install the following library

https://github.com/hzeller/rpi-rgb-led-matrix

```BASH
git clone https://github.com/hzeller/rpi-rgb-led-matrix.git

```

Compile the demos:

```BASH
make -C examples-api-use/
```

### Adafruit display with adafruit bonet

```BASH
sudo examples-api-use/demo -D0 --led-no-hardware-pulse --led-rows=32 --led-cols=64 --led-chain=2  --led-gpio-mapping=adafruit-hat


sudo ./demo -D9 --led-no-hardware-pulse --led-rows=32 --led-cols=64 --led-chain=2  --led-gpio-mapping=adafruit-hat --led-brightness=10

```

## Python library
```BASH
cd rpi-rgb-led-matrix/bindings/python
sudo apt-get update && sudo apt-get install python3-dev python3-pillow -y
make build-python PYTHON=$(command -v python3)
sudo make install-python PYTHON=$(command -v python3)
```

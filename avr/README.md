# Laser pointer

> This part of the project uses an Arduino to handle servomotors in order to move a laser pointer

## Arduino cli

This is a command line tool to compile and upload arduino codes.

### Install the cli

Download the latest release with the following command:

```BASH
curl -fsSL https://raw.githubusercontent.com/arduino/arduino-cli/master/install.sh | sh
```

Move the `arduino-cli` to `/usr/local/bin` folder, then add `/usr/local/bin` to your path

```BASH
sudo move arduino-cli /usr/local/bin
sudo nano ~/.bashrc
# Append this line to the file:
export PATH=$PATH:/usr/local/bin
```

### First steps:

* Update the index `arduino-cli core update-index`
* Search board support `arduino-cli core search arduino`
* Install board support `arduino-cli core install arduino:avr`
* Verify installed cores `arduino-cli core list`
* Complete list of supported cores `arduino-cli board listall`
* List connected boards `arduino-cli board list`

### Create & upload sketch:

* Go to the avr folder and run `arduino-cli sketch new laserpointer`
* Edit the `laserpointer/laserpointer.ino` sketch
* Find the qualified board name (FQBN) since I am using the Arduino Nano `arduino:avr:nano`.
* Compile `arduino-cli compile --fqbn arduino:avr:nano laserpointer`*
* Upload `arduino-cli upload --port /dev/ttyUSB0 --fqbn arduino:avr:nano laserpointer`*
* For the old boot loader use `arduino:avr:nano:cpu=atmega328old`

### Library management:

* Update library index `arduino-cli lib update-index`
* Search for a library `arduino-cli lib search arduinojson`
* Install the library by its name, for example "ArduinoJson" `arduino-cli lib install "ArduinoJson"`
* Check if the library is installed `arduino-cli lib list"`

### Install aditional boards:

* Create a configuration file `touch arduino-cli.yaml`
* Add the following code

```code
board_manager:
  additional_urls:
    - https://dvarrel.github.io/dynamixel/package_arbotix_index.json
```
* Update index `arduino-cli core update-index`
* Search for board  `arduino-cli core search arbotix`
* Install board `arduino-cli core install arbotix:avr`

## References:

* https://siytek.com/arduino-cli-raspberry-pi/
* https://www.devdungeon.com/content/arduino-cli-tutorial#toc-1

# Pile Placer

> Set of software to optimize the location of piles on the field

- [Pile Placer](#pile-placer)
  - [Project description](#project-description)
  - [Requirements](#requirements)
    - [File formats supported](#file-formats-supported)
    - [Colors](#colors)
  - [Installation instructions](#installation-instructions)
    - [Requirements:](#requirements-1)
    - [Node dependencies:](#node-dependencies)
    - [Python dependencies:](#python-dependencies)
    - [Software donwload:](#software-donwload)
  - [Start Software](#start-software)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [How to use it.](#how-to-use-it)

## Project description

The main goal is to develop a tool that can be used by the truck driver and operators of a pile placer.
This software is supposed to be "served" from a raspberry pi, gps and compass devices are also required.

Item|Name|Description
-----|-----|-----
1|Raspberry PI|Device to store UI and communicate with GPS, compass and user devices.
2|GPS RTK|High precision GPS device to know the position of the truck
3|Compass|Magnetic sensor to know the course of the truck and rotate the map

## Requirements

In order to improve the accuracy of this tool it is required to know the following data:
* Size of the truck to be used, position of the RTK/Rover antenna relative to the truck, distance of the trowing points from the front of the truck
* EPSG code, that matches the projection datum used on the survey, this code can be found on the links provided on the tool 
* File with waypoints or pile trowing points with the allowed formats.

### File formats supported

This tool supports *.xlsx and *.cvs files but in order to recognize the values provided they should be formated as shown on the examples bellow

Pile ID|Pile Color|Y|X|...
-------|----------|-|-|---

PILE ID|Pile Color|X|Y|Z
-------|----------|-|-|-

P|N|E|N|N
-|-|-|-|-

P|N|E|N|C
-|-|-|-|-

Name|Latitude|Longitude|Special WP|Dominant
----|--------|---------|----------|--------
1|44.985893| -93.330876| |Red
2|44.985803| -93.330880| |Red
3|44.985712| -93.330878| |Red
4|44.985622| -93.330881| |Red

Inverter|Rack ID|Pile ID|Pile ID with Color|X|Y
--------|-------|-------|------------------|-|-

Pilecode|N|E
--------|-|-
1.1.A.RED|13692101.5244|3010240.6871
1.1.B.WHT|13692080.7784|3010240.6871
1.1.C.RED|13692053.3001|3010240.6871
1.1.D.RED|13692025.8218|3010240.6871

### Colors

The software is able to show colors if they are provided in the table or they are part of the pile name, it uses the following color codes bellow. 

```Python
color_codes = {
    'BLK': 'black',
    'BRO': 'brown',
    'DBL': 'darkblue',
    'LBL': 'lightblue',
    'LGR': 'lightgreen',
    'ORA': 'orange',
    'PNK': 'pink',
    'PRP': 'purple',
    'RED': 'red',
    'WHT': 'white',
    'YEL': 'yellow',
}
```

## Installation instructions
### Requirements:
Go to the NodeJS and Python web pages and follow the installation instructions that fit your operative system

NodeJS
https://nodejs.org/
Python3
https://docs.python.org/3/index.html

### Node dependencies:
Using a terminal run the following command:
```BASH
npm i -g serve
```

### Python dependencies:
Using a terminal run the following command:
```BASH
pip install flask
pip install requests
pip install flask-cors
pip install flask-socketio
pip install pyproj
```

### Software donwload:
Open a terminal and use this command:

```BASH
git clone https://github.com/FrancoRosa/placer.git
```

## Start Software
### Backend
Open a terminal, navigate to the project directory, then run the python script as shown below:

```BASH
cd placer/api
python source.py
```

### Frontend
Open a terminal, navigate to the project directory, then run the user interface as shown below:

```BASH
cd placer
npx serve -s build/
```

## How to use it.
1. Open your web browser and go to *localhost:3000*
2. Go to the configuration tap and save your truck parameters.
3. Upload the waypoint files.
4. Go to Laser or GPS tabs to see if they are connected.



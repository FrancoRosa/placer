from os import getcwd
from time import process_time_ns, sleep, time
from math import degrees, sin, cos, atan2, sqrt, radians
from pyproj import Transformer
from requests import post

import openpyxl


print(getcwd())

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

global wgs84_to_proj, proj_to_wgs84


def is_csv(filedir):
    return filedir.split('.')[-1] == 'csv'


def xlsx_to_rows(filename):
    xlsx = openpyxl.load_workbook(filename)
    sheet = xlsx.active
    data = sheet.rows
    result = []
    for row in data:
        newrow = ''
        l = list(row)
        for i in range(len(l)):
            if i == len(l) - 1:
                newrow += str(l[i].value)
            else:
                newrow += str(l[i].value) + ','
        result.append(newrow)
    return result


def cvs_to_rows(path):
    result = []
    f = open(path, "r")
    while True:
        line = f.readline()
        if line:
            result.append(line)
        else:
            return result


def color_convert(str):
    if ' - ' in str:
        str = str.split(' - ')[0]
    if '"' in str:
        str = str.replace('"', '')
    if ' ' in str:
        str = str.replace(' ', '')
    if '/' in str:
        str = str.split('/')[0]
    if '-' in str:
        code = str.split('-')[-1]
        str = color_codes.get(code, '')
    if len(str.split('.')) == 4:
        code = str.split('.')[-1]
        str = color_codes.get(code, '')
    try:
        return str.lower()
    except:
        return ''


def rows_to_json(rows, epsg_code):
    # try:
    #     if epsg_code != '0':
    #         transformer = Transformer.from_crs(
    #             'epsg:%s' % epsg_code, 'epsg:4326')
    # except:
    #     print('... invalid crs code')
    #     return
    result = []
    headers = rows[0]
    print("... headers found:", headers)
    values = rows[1:]
    if 'PILE ID,Pile Color,X,Y,Z' in headers:
        for value in values:
            value = value.split(',')
            x, y = float(value[2]), float(value[3])
            latlng = proj_to_wgs84.transform(x, y)
            result.append({
                "pile_id": value[0],
                "lat": latlng[0],
                "lng": latlng[1],
                "color": color_convert(value[1]),
                "x": x,
                "y": y,
                "placed": False
            })

    if 'P,N,E,N,N' in headers:
        for value in values:
            value = value.split(',')
            x, y = float(value[2]), float(value[1])
            latlng = proj_to_wgs84.transform(x, y)
            result.append({
                "pile_id": value[0],
                "lat": latlng[0],
                "lng": latlng[1],
                "color": '',
                "x": x,
                "y": y,
                "placed": False
            })

    if 'P,N,E,N,C' in headers:
        for value in values:
            value = value.split(',')
            x, y = float(value[2]), float(value[1])
            latlng = proj_to_wgs84.transform(x, y)
            result.append({
                "pile_id": value[0],
                "lat": latlng[0],
                "lng": latlng[1],
                "color": color_convert(value[4]),
                "x": x,
                "y": y,
                "placed": False
            })

    if 'Name,Latitude,Longitude,Special WP,Dominant' in headers:
        for value in values:
            value = value.split(',')
            result.append({
                "pile_id": value[0],
                "lat": float(value[1]),
                "lng": float(value[2]),
                "color": color_convert(value[4]),
                "x": 0,
                "y": 0,
                "placed": False
            })

    if 'Inverter,Rack ID,Pile ID,Pile ID with Color,X,Y' in headers:
        for value in values:
            value = value.split(',')
            x, y = float(value[4]), float(value[5])
            latlng = proj_to_wgs84.transform(x, y)
            result.append({
                "pile_id": value[2],
                "lat": latlng[0],
                "lng": latlng[1],
                "color": color_convert(value[3]),
                "x": x,
                "y": y,
                "placed": False
            })

    if 'Pilecode,N,E' in headers:
        for value in values:
            value = value.split(',')
            x, y = float(value[2]), float(value[1])
            latlng = proj_to_wgs84.transform(x, y)
            result.append({
                "pile_id": value[0],
                "lat": latlng[0],
                "lng": latlng[1],
                "color": color_convert(value[0]),
                "x": x,
                "y": y,
                "placed": False
            })

    return result


def distance(ax, ay, bx, by):
    return sqrt((bx-ax)**2 + (by-ay)**2)


def polygon(center, heading, config):
    global wgs84_to_proj, proj_to_wgs84
    proj_center = wgs84_to_proj.transform(
        float(center['lat']), float(center['lng']))

    cenX = proj_center[0]
    cenY = proj_center[1]
    anX = float(config['antennaX'])
    anY = float(config['antennaY'])
    tWid = float(config['truckWid'])
    tLen = float(config['truckLen'])
    bay1 = float(config['bay1'])
    bay2 = float(config['bay2'])
    fromCenter = float(config['fromCenter'])
    laserX = float(config['laserX'])
    laserY = float(config['laserY'])
    rot = radians(float(heading['heading']))

    def rotate_point(x, y, rot):
        # example:  x = cenX - anX,  y = cenY + anY,
        # vectors
        dist = distance(cenX, cenY, x, y)
        ang = atan2(y - cenY, x - cenX)
        # Cartesian coordinates
        newX = dist*cos(ang - rot) + cenX
        newY = dist*sin(ang - rot) + cenY
        return proj_to_wgs84.transform(newX, newY)

    return {
        'truck': [
            # truck edges
            rotate_point(cenX - anX, cenY + anY, rot),                  # 0
            rotate_point(cenX - (anX - tWid), cenY + anY, rot),         # 1
            rotate_point(cenX - (anX - tWid), cenY + anY - tLen, rot),  # 2
            rotate_point(cenX - anX, cenY + anY - tLen, rot),           # 3
            # line in front of truck
            rotate_point(cenX - anX + tWid/2, cenY + anY, rot),          # 4
            rotate_point(cenX - anX + tWid/2, cenY + anY + 100, rot),    # 5
            # Rectangle representing bundle
            rotate_point(cenX - anX - 1, cenY + anY - \
                         bay1 - 6, rot),           # 6
            rotate_point(cenX - anX + tWid + 1, cenY + \
                         anY - bay2 - 6, rot),     # 7
            rotate_point(cenX - anX + tWid + 1, cenY + \
                         anY - bay2 + 6, rot),     # 8
            rotate_point(cenX - anX - 1, cenY + anY - \
                         bay1 + 6, rot),           # 9
            # line crossing bays
            rotate_point(cenX - anX - 6, cenY + anY - bay1, rot),         # 10
            rotate_point(cenX - anX + tWid + 6, cenY + anY - bay2, rot),  # 11
            # Laser on the edges of the truck (left & right)
            rotate_point(cenX - anX, cenY, rot),           # 12
            rotate_point(cenX - (anX - tWid), cenY, rot),  # 13
            # Galvo based laser
            rotate_point(cenX - anX - laserX,
                         cenY + anY - laserY, rot),           # 14
        ],
        'bays': [
            # bay points
            rotate_point(cenX - anX + tWid/2 - fromCenter,
                         cenY + anY - bay1, rot),
            rotate_point(cenX - anX + tWid - tWid/2 + fromCenter,
                         cenY + anY - bay2, rot),
        ],
    }


def coordinate_distance(p1, p2):
    global wgs84_to_proj
    p1_proj = wgs84_to_proj.transform(p1['lat'], p1['lng'])
    p2_proj = wgs84_to_proj.transform(p2['lat'], p2['lng'])
    distances = {
        "abs": distance(p1_proj[0], p1_proj[1], p2_proj[0], p2_proj[1]),
        "x": p1_proj[0] - p2_proj[0],
        "y": p1_proj[1] - p2_proj[1]
    }
    return distances


def create_projs(epsg_code):
    global wgs84_to_proj, proj_to_wgs84
    wgs84_to_proj = Transformer.from_crs(
        'epsg:4326', 'epsg:%s' % epsg_code)
    proj_to_wgs84 = Transformer.from_crs(
        'epsg:%s' % epsg_code, 'epsg:4326')


def servoCommand(angles):
    def baseAngle(angle):
        if angle > 0:
            return angle - 90
        if angle <= 0:
            return angle + 270

    def topAngle(angle):
        return 180-angle

    command = {
        "turrets": [
            {
                "base": baseAngle(angles["base1"]),
                "top": topAngle(angles["top1"]),
                "laser": 0,
            },
            {
                "base": baseAngle(angles["base2"]),
                "top": topAngle(angles["top2"]),
                "laser": 0,
            }
        ]
    }
    print("command base:", command["turrets"][0]["base"])
    print("command top:", command["turrets"][0]["top"])
    if command["turrets"][0]["base"] > 0 and command["turrets"][0]["top"] > 0:
        command = f'{int(baseAngle(angles["base1"])):03},{int(topAngle(angles["top1"])):03},001\n'
    else:
        command = '080,080,001\n'
    print("servo command:", command)
    serialCommand = command
    return serialCommand.encode('utf-8')


def moveLasers(height, laser1, laser2):
    angles = {
        "base1": degrees(atan2(laser1["y"], laser1["x"])),
        "top1": degrees(atan2(float(height), laser1["abs"])),
        "base2": degrees(atan2(laser2["y"], laser2["x"])),
        "top2": degrees(atan2(float(height), laser2["abs"])),
    }
    print('======================')
    print("base:", angles["base1"], ", top:", angles["top1"])
    print('======================')
    command = servoCommand(angles)
    # servoSerial.write(command)


def get_middles(arr):
    result = []
    for i, e in enumerate(arr):
        if i > 0:
            result.append((e + arr[i - 1]) / 2.0)
    return result


def group_by_neighbor(arr, th):
    result = []
    last = 0
    arr.sort()
    for i, e in enumerate(arr):
        if (i == 0):
            last = e
            result.append(e)
        else:
            if (e > th + last):
                last = e
                result.append(e)
    return result


def get_guides(points):
    xs = list(map(lambda x: x["x"], points))
    xs = group_by_neighbor(xs, 1)
    middles = get_middles(xs)
    ys = list(map(lambda x: x["y"], points))
    min_y = min(ys) - 100
    max_y = max(ys) + 100
    lines = []
    for i in middles:
        start = proj_to_wgs84.transform(i, min_y)
        end = proj_to_wgs84.transform(i, max_y)
        lines.append({
            "from": [start[1], start[0]],
            "to": [end[1], end[0]]
        })
    return lines


create_projs('2229')

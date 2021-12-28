import serial
try:
    ser = serial.Serial('/dev/ttyACM0')
except:
    pass


def to_geo(ddmm_mmm, hemisfere):
    if len(ddmm_mmm) == 10:
        dd = float(ddmm_mmm[:2])
        mm_mm = float(ddmm_mmm[2:])
    else:
        dd = float(ddmm_mmm[:3])
        mm_mm = float(ddmm_mmm[3:])
    dd = dd + mm_mm/60
    if hemisfere == 'W' or hemisfere == 'S':
        dd = -dd
    return dd


def get_latlng(nmea):
    nmea = str(nmea)
    nmea = nmea.split(',')
    values = {
        'header': nmea[0],
        'UTC': nmea[1],
        'latitude': nmea[2],
        'hemisfere_lat': nmea[3],
        'longitude': nmea[4],
        'hemisfere_lng': nmea[5],
        'quality': nmea[6],
        'satelites': nmea[7],
        'HDOP': nmea[8],
        'height': nmea[9],
        'unit': nmea[10],
    }
    try:
        lat = to_geo(values['latitude'], values['hemisfere_lat'])
        lng = to_geo(values['longitude'], values['hemisfere_lng'])
        return {'lat': lat, 'lng': lng}
    except:
        return {'lat': 0, 'lng': 0}

def get_course(nmea):
    nmea = str(nmea)
    nmea = nmea.split(',')
    values = {
        'header': nmea[0],
        'course1': nmea[1],
        'degrees1': nmea[2],
        'course2': nmea[3],
        'degrees2': nmea[4],
        'speed1': nmea[5],
        'speed_unit1': nmea[6],
        'speed2': nmea[7],
        'speed_unit2': nmea[8],
    }
    if len(values['course1']) > 0:
        course = float(values['course1'])
    else:
        course = None
    return {'heading': course}


def read_uart():
    while True:
        nmea = ser.readline()
        # $GNVTG,,T,,M,0.074,N,0.138,K,A*34
        # $GNGGA,001801.40,4459.08735,N,09319.82716,W,1,12,0.50,281.2,M,-30.8,M,,*78
        if b'$GNGGA' in nmea:
            print(get_latlng(nmea))
        if b'$GNVTG' in nmea:
            print(get_course(nmea))

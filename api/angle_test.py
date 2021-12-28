def ang_to_servo(angle):
    min_val = 255
    max_val = 767

    if angle <= 0:
        return min_val
    if angle > 180:
        return max_val
    return int(512*angle/180)


angle = -1
print(angle, '=>', ang_to_servo(angle))
angle = 0
print(angle, '=>', ang_to_servo(angle))
angle = 10
print(angle, '=>', ang_to_servo(angle))
angle = 90
print(angle, '=>', ang_to_servo(angle))
angle = 170
print(angle, '=>', ang_to_servo(angle))
angle = 180
print(angle, '=>', ang_to_servo(angle))
angle = 190
print(angle, '=>', ang_to_servo(angle))

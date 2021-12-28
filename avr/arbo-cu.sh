#  Arduino nano commands
#  echo '... compile'
#  arduino-cli compile --fqbn arduino:avr:nano:cpu=atmega328old laserpointer
#  echo '... upload'
#  arduino-cli upload --port /dev/ttyUSB0 --fqbn arduino:avr:nano:cpu=atmega328old laserpointer
#  echo '... done'
 

#  Arbotix commands
 echo '... compile'
 arduino-cli compile --fqbn arbotix:avr:arbotix dynapointer
 echo '... upload'
 arduino-cli upload --port /dev/ttyUSB0 --fqbn arbotix:avr:arbotix dynapointer
 echo '... done'
 
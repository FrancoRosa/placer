#  Arduino nano commands
 echo '... compile & upload'
 arduino-cli compile --fqbn arduino:avr:nano:cpu=atmega328old ds_nano -u -p /dev/ttyUSB0 
 echo '... done'
 

# #  Arbotix commands
#  echo '... compile'
#  arduino-cli compile --fqbn arbotix:avr:arbotix dynapointer
#  echo '... upload'
#  arduino-cli upload --port /dev/ttyUSB0 --fqbn arbotix:avr:arbotix dynapointer
#  echo '... done'

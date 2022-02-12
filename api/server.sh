# Start HTTPS server from boot
# Manage with pm2 with the following command
# sudo pm2 start api/server.sh --name "web"

echo "... start HTTPS Server"
date
cd /home/pi/placer/build && sudo https-serve


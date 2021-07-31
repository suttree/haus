# haus – passive digital art for yr home


## blinkstick setup
sudo apt-get install -y python-pip python2.7-dev
sudo pip install blinkstick
sudo blinkstick --info
echo "SUBSYSTEM==\"usb\", ATTR{idVendor}==\"20a0\", ATTR{idProduct}==\"41e5\", MODE:=\"0666\" | sudo tee /etc/udev/rules.d/85-blinkstick.rules"


#!/bin/bash
sudo apt-get update
sudo apt-get dist-upgrade -y

sudo mkdir /opt/nodejs
sudo chown vscode:vscode /opt/nodejs
wget https://nodejs.org/dist/v18.17.1/node-v18.17.1-linux-x64.tar.xz -O /opt/nodejs/node.tar.xz
tar -xf /opt/nodejs/node.tar.xz -C /opt/nodejs/
rm /opt/nodejs/node.tar.xz

mv /opt/nodejs/node-v*-linux-x64/* /opt/nodejs/
sudo chown -R root:root /opt/nodejs

echo 'export PATH="/opt/nodejs/bin${PATH:+:${PATH}}"' >> ~/.bashrc

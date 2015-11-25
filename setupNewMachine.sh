#!/bin/bash
set -e 
sudo apt-get -y install git
sudo apt-get -y install vim
sudo apt-get -y update
sudo apt-get -y install build-essential
sudo apt-get -y install python libssl-dev

#dot file
if [[ ! -d ~/dotfile ]]; then
    cd ~
    git clone https://github.com/nghiank/dotfile.git
    cp ~/dotfile/.vimrc ~/.vimrc
    vim +PluginInstall +qall
fi

#Install Node v0.12.7
nodeversion=$(node -v)
if [[ "$nodeversion" != "v0.12.7" ]]; then
    cd ~
	sudo mkdir node
	cd node
	sudo wget https://nodejs.org/dist/v0.12.7/node-v0.12.7.tar.gz
	sudo tar -xzvf node-v0.12.7.tar.gz
	cd node-v0.12.7
	sudo ./configure
	sudo make
	sudo make install
fi

#Checkout my packages
cd ~
if [[ ! -d ~/code ]]; then
    mkdir code
fi
cd code
rm -rf spikeCodeV1
rm -rf runCompile
git clone https://github.com/nghiank/spikeCodeV1.git
git clone https://github.com/nghiank/runCompile.git
#Install docker
cd ~/code/runCompile/setup
sudo ./Install_14.04.sh

npm install -g grunt-cli bower

FROM ubuntu:xenial

MAINTAINER Carlos Gemmell

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update --fix-missing
RUN apt-get upgrade -y

# install essentials
RUN apt-get install -y vim software-properties-common git
RUN apt-get install -y g++ zlib1g-dev build-essential parallel wget zlibc zlib1g nginx-full

# install python packages
RUN add-apt-repository -y ppa:deadsnakes/ppa
RUN apt-get update -y
RUN apt-get install -y python3 python3-pip
# RUN update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.7 2
RUN apt-get install -y unzip
RUN python3 -m pip install --upgrade pip
RUN pip install --upgrade setuptools
RUN pip3 install setuptools flask virtualenv gitpython

# install node
RUN apt-get install npm -y
RUN npm install pm2 -g
RUN ln -s /usr/bin/nodejs /usr/bin/node

WORKDIR /my_shared
RUN echo "YOUR INSTANCE IS READY :)"

# on startup run init script
#ENTRYPOINT /bin/bash --login -c "/my_shared/docker/init.sh" && /bin/bash
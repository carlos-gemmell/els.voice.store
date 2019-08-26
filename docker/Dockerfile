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
RUN pip3 install setuptools flask virtualenv gitpython flask_jwt_extended

RUN echo hey5
# install node
WORKDIR /my_shared/frontend
RUN apt-get install curl
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash
RUN apt-get install nodejs -y
RUN npm install -g npm
RUN echo foo$CWD
RUN npm install --prefix /my_shared/frontend 
RUN npm run build --prefix /my_shared/frontend

WORKDIR /my_shared
RUN echo "YOUR INSTANCE IS READY :)"

# on startup run init script
ENTRYPOINT /bin/bash --login -c "bash /my_shared/docker/init.sh" && /bin/bash

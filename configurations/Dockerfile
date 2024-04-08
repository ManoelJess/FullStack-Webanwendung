# syntax=docker/dockerfile:1

ARG NODE_VERSION=18.18.0

FROM node:${NODE_VERSION}



WORKDIR /src/app

## Launcher script #############################################################################
COPY back_fronExec.sh .
RUN ["chmod","+x","back_fronExec.sh"]

## All necessary dependencies for Backend ##################################################################

COPY tsconfig.json .

COPY package*.json ./

RUN npm install -g
RUN npm i --save-dev
RUN npm i -g @types/express
RUN npm install -g ts-node
RUN npm install -g express 
RUN npm install -g morgan
# RUN npm install ts-node --save-dev
RUN npm install -g typescript
# RUN npm install typescript --save-dev

## All necessary Babel dependencies for Backend Tests ###########################################################

COPY .babelrc .

##############################################################################

WORKDIR /src/app/backend

COPY backend/ .

# Expose the port of server that the application listens on.
EXPOSE 3000

WORKDIR /src/app
# Run the server application.
CMD ./back_fronExec.sh

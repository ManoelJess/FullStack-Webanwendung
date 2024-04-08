# syntax=docker/dockerfile:1

ARG NODE_VERSION=18.18.0

FROM node:${NODE_VERSION} AS build


## All necessary dependencies for frontEnd ##########################################################################
WORKDIR /src/app/frontend

COPY . .

RUN npm install --save --legacy-peer-deps
RUN npm config set legacy-peer-deps true
RUN npm install 
####
# RUN npx ngcc --properties es2023 browser module --first-only --create-ivy-entry-points
# RUN npm run build
# FROM nginx:stable
# COPY --from=build /src/app/frontend/dist/frontend/ /usr/share/nginx/html

#Step 2
# FROM nginx:alpine
# COPY --from=node /src/app/frontend/dist/frontend /usr/share/nginx/html


## Launcher script #############################################################################
COPY executeFron.sh .
RUN ["chmod","+x","executeFron.sh"]


EXPOSE 4200

CMD /src/app/frontend/node_modules/.bin/ng s -o


# Run the server application.
# CMD ./executeFron.sh

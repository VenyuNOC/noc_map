FROM nginx:alpine
LABEL maintainer "Nathan Mann <nathan.mann@venyu.com>"

RUN apk update && \
    apk --no-cache add nodejs npm
RUN npm install -g typescript gulp

RUN mkdir /app
WORKDIR /app

COPY package.json package-lock.json dist ./
RUN npm install

RUN gulp build


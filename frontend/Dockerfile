# syntax=docker/dockerfile:1
FROM node:18-buster-slim
LABEL Name=nc-frontend Version=0.1.0

WORKDIR /frontend
COPY package.json /frontend/

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN npm install --loglevel verbose

COPY . /frontend/

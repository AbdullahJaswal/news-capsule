# syntax=docker/dockerfile:1
FROM python:3.11-slim-buster
ENV PYTHONUNBUFFERED=1
LABEL Name=nc-backend Version=0.1.0

WORKDIR /backend
COPY requirements.dev.txt /backend/

RUN apt-get update \
    && apt-get install -y build-essential netcat libpq-dev --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN pip install -U pip --no-cache-dir
RUN pip install -r requirements.dev.txt --no-cache-dir

COPY . /backend/

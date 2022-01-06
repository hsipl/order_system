#!/bin/bash

docker-compose -f ../server/docker-compose.yml up -d

docker-compose -f ../admin/docker-compose.yml up -d

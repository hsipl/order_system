#!/bin/bash

docker-compose -f ../server/docker-compose.yml down

docker-compose -f ../admin/docker-compose.yml down

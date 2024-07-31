#!/bin/bash

docker build -t pmat-test .
wait 
docker run -p 4000:4000 -v "$(pwd):/app" -v /app/node_modules pmat-test
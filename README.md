## Draft - WIP - Follow releases to get notified ##

# Node.js Traffic Shadowing Demo


## Motivation
A 10 min intro and demo of traffic shadowing with Node.js code

[![](http://img.youtube.com/vi/sWuF_TyPBWo/0.jpg)](http://www.youtube.com/watch?v=sWuF_TyPBWo "")

## How To Play The Demo
 - Run npm install
 - Run the production-like process using `node index-production.js 8000`
 - Run the staging-like process using `node index.js 8001`
 - Start forwarding and comparing traffic using `sudo ./gor --input-raw :8000 --output-http-track-response --input-raw-track-response --middleware "node {path to your local project}/middleware" --output-http http://localhost:8001`
 - Browse to the UI: `http://localhost:8000' and `http://localhost:8001'

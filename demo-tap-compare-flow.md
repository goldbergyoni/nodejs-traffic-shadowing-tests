# Context
About the system - show UI
The new change

# Separated env
Start both side by side
`PORT=9000 ENVIRONMENT_NAME=Staging node index-production.js`
`PORT=8000 ENVIRONMENT_NAME=Production node index-staging.js`

Get confidence - GoReplay
`sudo ./gor --input-raw :8000 --output-http-track-response --input-raw-track-response --middleware "node ./middleware" --output-http http://localhost:9000`
Highlight the status with story

# Punch
I land my staging env
Get confidence before deploy
Everything green
Suddenly...
Why? code
This could happen only thanks to realistic data
It's just one example
# Avatar
## What is Project Avatar?
Project Avatar is a telepresence robot that we, FRC Team 568, have developed for our virtual members. Because there is only one FRC team in the state of Alaska, we have virtual members from over 100 miles away who join our weekly meetings through Zoom. Project Avatar is a robot that can be controlled from anywhere in the world to increase the interactivity between our virtual and in-person members.

## About this repository
This repository features JS code for the frontend web application and Python code with Flask for backend development. The web application takes user input (WASD + up/down arrow keys) to move the robot and sends ajax requests to the Flask server. The server receives this data and sends the appropriate serial communication message to the arduino. Depending on the received message, the arduino performs various tasks (see Avatar-Arduino repository).

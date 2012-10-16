Ping Service
=====

A very simple Node.js app that pings URLs at regular intervals.


On Heroku, 1 dyno web processes go idle after 1 hour of inactivity. This service pings apps at regular intervals to keep them from going idle. 
Ping Service is meant to be run as a worker process on Heroku because 1 dyno worker processes never go idle.

Read more about [dynos on Heroku DevCenter](https://devcenter.heroku.com/articles/dynos)
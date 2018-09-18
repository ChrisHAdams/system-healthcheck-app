# I'm no longer maintaining this repo....
I've created another healthcheck application you can find at [here](https://github.com/ChrisHAdams/application-healthcheck).  


# System Healthcheck Application

## A System Healthcheck Application

This application supports checking whether the following are available.

1. Webpages/websites
2. Web Services
3. Servers
4. Databases

More details to follow, but in the meantime, clone and run the app.

```
npm start // Just runs the app
npm watch // Runs the app under Nodemon
```

When running, the app will check various websites (BBC, Google) and an API for availability and response times every 10 minutes.

If you want to trigger the checks, open localhost\8006\api\runMonitor, results will be returned in JSON format.

Events and monitoring results are sent to the console.  Additionally, there is an app log in the log folder.  There are also results from every time the check is run in monitor_reports.

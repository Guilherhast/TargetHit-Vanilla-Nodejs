# TargetHit

## Description

The TargetHit game with a backend written in vanilla NodeJs.
This repository aims to teach students basic concepts about NodeJs, software architecture, and backend development.

## Instructions

### Before starting

As it is a node repository you will need to install all packages before running.
To do this use the command below:

```bash
npm i
```

### Run development server

The following command will start a development version of the project.
The application will be reloaded every time a file is changed to
speed up the development process.
The application won't reload when it crashes or exits.
It will facilitate reading the error logs.

```bash
npm run dev
```

### Run application

The following command will start a production version of the application.
This application will restart every time it crashes or exits.

```bash
npm start
```

### Monitor

To monitor the production version of the application you can use the `pm2` commands.
If you do not have `pm2` installed globally on your computer you should use the `npx` before the `pm2` command.

[pm2 cheatsheet](https://pm2.keymetrics.io/docs/usage/quick-start/#cheatsheet)

Example:

```bash
# List running applications
npx pm2 list
# Stop the application by name
npx pm2 stop TargetHit
# Delete the application from the list
npx pm2 delete TargetHit
```


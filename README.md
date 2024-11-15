<h1 align="center">idh-mex</h1>
<br>

<p align="center">
  <a href="https://idh-mex.web.app/">
    <img alt="idh-mex.web.app" title="GitPoint" src="https://github.com/servo98/idh-mex/blob/2c7494372433040b9668346b0196713035f2e194/public/logo_size.jpg" width="450">
  </a>
  <br />
  <a href="https://idh-mex.web.app/" target="_blank">Visita site</a>
</p>

<p align="center">
  <a href="https://idh-mex.web.app/">
    <img alt="GitHub Actions - App" src="https://img.shields.io/github/actions/workflow/status/servo98/idh-mex/firebase-hosting-push.yml?logo=Firebase&label=App&color=DD2C00" />
  </a>
  <a href="https://github.com/servo98/idh-mex/actions/workflows/firebase-hosting-push.yml">
    <img alt="GitHub Actions - Backend" src="https://img.shields.io/github/actions/workflow/status/servo98/idh-mex/firebase-hosting-push.yml?logo=Firebase&label=Backend&color=DD2C00" />
  </a>
</p>

<p align="center">
  Human development index of Mexico
</p>

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Build Process](#build-process)
- [Acknowledgments](#acknowledgments)


## Introduction
This application allows users to consult the Human Development Index (HDI) of Mexico's states and visualize it on a heatmap. Users can sort the data by different criteria, making it easier to compare the states.

## Features

A few of the things you can do with this app:

* View IDH records from different years
* Filter by multiple years
* Filter by state name
* Sort data by state name or IDH record
* Data is paginated
* Heat map of Mexico synchronized with filters
* Tested with Cypress
* Automatic frontend build and deploy
* Automatic backend functions deploy
* Detects which part should deploy
* Monorepo
* Connects to MongoDB

## Build Process

> [!IMPORTANT]  
> Use node v18 `node -v` to check your version

1. Clone or download the repo: `git clone https://github.com/servo98/idh-mex.git`
2. Run `yarn install` to install dependencies
3. Run `yarn build` to export the files into the `out` folder
4. You can serve the `out` folder with: `npx serve out`

## Run Local
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Run `yarn install` to download front dependencies
3. Run `yarn install` **inside** the `functions` directory to install backend dependencies
4. Set up MongoDB credentials: `echo MONGO_URI="mongodb://localhost:27017/test2" >> functions/.env` (replace with your credentials)
5. Run `yarn dev:backend` to run backend locally (emulate Firebase functions)
6. Run `yarn dev` to run the frontend app

**Development Keys**: 
- `NEXT_PUBLIC_API_URL`: Used to connect the front with the back (base URL for Axios, e.g., `http://127.0.0.1:5001/idh-mex/us-central1/` inside `.env.local` for frontend).
- `MONGO_URI`: Inside `.env` in the `functions` directory for backend.

## Acknowledgments

### Used in this web:
- Next.js
- Material UI
- MongoDB
- Firebase
- GitHub Actions
- Simple-react-maps
- ESLint
- Cypress
- Axios

# TODO List
- Docker Compose
- i18n

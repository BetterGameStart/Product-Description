# Project Name

> Item Details section

## Related Projects

  - https://github.com/Team-Aragorn/Carousel-Images
  - https://github.com/Team-Aragorn/addToCart-service
  - https://github.com/Team-Aragorn/details-service
  - https://github.com/Team-Aragorn/review_service
  - https://github.com/Team-Aragorn/details-proxy

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

### Seed the DB

```sh
npm run seed
```
When you see 'DONE SEEDING' Press CTRL-C

### Starting the App
Open two terminal windows and run the following:

Build the webpack bundle

```sh
npm run react-dev
```

Start the App

```sh
npm start
```
## CRUD Operations
| HTTP Verb |           Endpoint          |            Action            |
|-----------| --------------------------- | ---------------------------- |
| **POST**  |         /api/items/         |  CREATE a new item into DB   |
| **GET**   |       /api/items/:id        |  READ data and return data   |
| **PATCH** |       /api/items/:id        |  UPDATE item with new image  |
| **DELETE**|       /api/items/:id        |  DELETE item based on ID     |

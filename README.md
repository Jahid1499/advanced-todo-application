<!-- GET SERVER TEMPLATE -->

## Get SERVER Template

You can find the raw SERVER template of the RTK Query - advanced todo application from the "server" folder.

## How to clone project

```sh
git clone https://github.com/Jahid1499/advanced-todo-application
```

## How to run server

1. Go to the cloned project directory

```sh
cd advanced-todo-application
```

2. First you need run server - for this follow those step

```sh
cd server
```

```sh
npm i
```

```sh
npm start
```

The server run in http://localhost:4010

## How to run react application

1.  Go to the cloned project directory

```sh
cd advanced-todo-application
```

2. Setup environment - create a .env file in root directory and add those variable

```sh
VITE_API_URL=http://localhost:4010
VITE_ENVIRONMENT_SERVER="development"
```

3. Install package

```sh
npm i
```

4. Run application

```sh
npm run dev
```

# Goal
Our goal is to create a digital inspiration board.

Users should be able to create one or more boards.

Then, a user can select a single board. When a user selects a board, they can see all the cards associated with that board.

Users can even "+1" the cards that they agree with!

We will use this project as a chance to see how the front-end layer and back-end layer interact. This is also an opportunity to bring some creativity to the UI.

# One-time Project Setup

## Clone

Clone the forked repo. Do _not_ clone this inside of another project folder, because that will cause issues.

## Scaffold the App

Create a new React app within this project folder. **You must perform this within this front-end project folder**.

```bash
$ npm create vite@latest . -- --template react
```

## Add `axios`

Install axios:

```bash
$ npm install axios@latest
```

## Creating a `.env` File

Create a file named `.env`.

The front-end layer needs to send API requests to the back-end layer. In order to handle this, the front-end layer repo **must** include a `.env` file with this line:

```
VITE_APP_BACKEND_URL=http://localhost:5000
```

Note that this `VITE_APP_BACKEND_URL` _must_ include `http://`.

Use this environment variable to send your API requests. You can read it by using the expression `import.meta.env.VITE_APP_BACKEND_URL`. For example, we may use it like this in any component:

```js
const VITE_APP_BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL

axios.get(`${VITE_APP_BACKEND_URL}/boards`, {
    // ...
```

This will make Render deployment easier.

## Commit and Push

Commit and push your files to your repo, especially including the `package.json` file!

</details>


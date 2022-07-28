## Callback Hell Example
---

This project demonstrates what callback hell, or the Pyramid of Doom, looks like in a working application. 

The goal of these examples is to bolster the message [in this lesson](https://www.learnhowtoprogram.com/intermediate-javascript/asynchrony-and-apis/tools-for-handling-async-code) from Epicodus's LearnHowToProgram.com, about why modern tools for handling async code (promises and `aync`/`await`) came about.

This application makes 3 arbitrary API calls. The first is dependent on user input, and the other two are dependent on the results from the previous API call. 

In `src/index.js`, you'll find callback hell. 

In `src/without-callbacks.js`, you'll find the same code without callbacks. This second example shows that you do not need callbacks specifically to manage async code, however, callbacks remain the old standard for managing async code!

### Project Setup

You'll need an API key from [the OpenWeather API](https://openweathermap.org/api) to proceed. Once you have a key, create a `.env` file in the root directory of the project. Name this key `API_KEY`:

```
API_KEY=oqi3hrfnof3232f
```

Then, install dependencies by running `npm install` in the root directory of the project.

To start development server, run `npm run start` in the root directory of the project.

To switch between `index.js` and `without-callbacks.js`, change the entry point in `webpack.config.js`:

```js
module.exports = {
  entry: './src/index.js',  // <-- change index.js to without-callbacks.js
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  ...
}  
```
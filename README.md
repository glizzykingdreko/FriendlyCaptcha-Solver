# FriendlyCaptcha Solver
This repository shows how to quickly solve the [FriendlyCaptcha](https://friendlycaptcha.com/) challenge using NodeJS with no dependencies.
Read more about it on [Takion API Blog](https://blog.takionapi.tech/friendlycaptcha).

[![FriendlyCaptcha](https://i.imgur.com/hvxJhPh.jpeg)](https://blog.takionapi.tech/friendlycaptcha)

## Table of contents
- [FriendlyCaptcha Solver](#friendlycaptcha-solver)
  - [Table of contents](#table-of-contents)
  - [How it works](#how-it-works)
    - [NodeJS Solver](#nodejs-solver)
  - [My links](#my-links)

## How it works
Inside [original_files](/original_files) you can find the original challenge files.

The script [main.js](/original_files/main.js) contains the main core of the FriendlyCaptcha challenge.
It is going to load the puzzle string using the website key, convert it into a 2D array, and then start exactly 4 workers to solve the challenge.
You can find the code of the workers inside [worker.js](/original_files/worker.js).

The "solving" process is just a bounch of math calculations, when a worker calculate his "piece" of the puzzle, the main script is going to send him another piece to solve, and so on, until the challenge is solved.

The challenge by default uses WASM for the calculations, but there's a support for native JS too, obviously it's really slower.

### NodeJS Solver
In order to create a "solver" for this "captcha" the only things I've had to do is just to clean a bit the usless frontend related functions from the code, improved a bit the name of functions/classes/variables for a better understanding, and replace the WebWorker with a native NodeJS worker, nothing more.

Check the [solver](/solver/) folder for the final code. Inside of it you'll find a file called [test.js](/solver/test.js) that is going to load, solve and submit a solved puzzle directly to the FriendlyCaptcha server using via the demo form.
To run it, after moving into the [solver](/solver/) folder, run `npm install` and then `node test.js`. (You need to install just axios and cheerio, to cominicate with the FriendlyCaptcha server and to parse the HTML response)

For the solver itself take a look into the [puzzleSolver.js](/solver/puzzleSolver.js) file (the adapted version of the original [main.js](/original_files/main.js) file) and the [worker.js](/solver/worker.js) file (the adapted version of the original [worker.js](/original_files/worker.js) file).


## My links
- [Website](https://glizzykingdreko.github.io)
- [GitHub](https://github.com/glizzykingdreko)
- [Twitter](https://mobile.twitter.com/glizzykingdreko)
- [Medium](https://medium.com/@glizzykingdreko)
- [Email](mailto:glizzykingdreko@protonmail.com) 
- [Buy me a coffee ❤️](https://www.buymeacoffee.com/glizzykingdreko)
- [TakionAPI Article](https://blog.takionapi.tech/friendlycaptcha)


But hey! is GDPR approved :P
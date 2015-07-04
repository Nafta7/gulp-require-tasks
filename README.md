# toska

[![Build Status](https://travis-ci.org/Nafta7/toska.svg?branch=master)](https://travis-ci.org/Nafta7/toska)

Load modules from a given directory.

# Installation
```
npm install toska
```

## Usage

### `toska(dir [, options])` => [Map]

Takes a directory and returns a `Map`.
If options are provided, it will be passed to your modules as arguments expanded.

#### Example

```js
import toska from 'toska';
let tasks = toska('tasks');
```
Given the following directory structure:
```
tasks/
  build/
    compile_js.js
    compile_sass.js
  deploy/
    minify_css.js
    minify_js.js
```
`toska` will return the following map:

```js
{
  compile_js: [Function: compile_js],
  compile_sass: [Function: compile_sass],
  build: {
    compile_js: Function: compile_js],
    compile_sass: [Function: compile_js]
  },
  minify_css: [Function: minify_css],
  minify_js: [Function: minify_js],
  deploy: {
    minify_css: [Function: minify_css],
    minify_js: [Function: minify_js]
  }
}
```

## Options

`options`: Can be whatever you want to be made available to all of your modules,
options are dynamically expanded to the modules. See:

```js
import toska from 'toska';

let path = {
  styles:  { src: 'styles/', dest: 'www/styles/' },
  scripts: { src: 'scripts/', dest: 'www/scripts/' }
};
let plugins = { browserSync: browserSync };

let tasks = toska('tasks', {gulp: gulp, path: path, $: plugins});
```

With this configuration, your modules will receive all options expanded. See
a module example:

```js
// tasks/build/compile:sass.js <- A simple node module
import sass from 'gulp-sass';
import rename from 'gulp-rename';

module.exports = (gulp, path, $) => {
  return () => {
    gulp.src([`${path.styles.src}**/*.sass`])
    .pipe(sass())
    .pipe(gulp.dest(path.styles.dest))
    .pipe($.browserSync.stream());
  };
};
```

## License

MIT

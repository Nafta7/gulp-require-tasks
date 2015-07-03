# toska

[![Build Status](https://travis-ci.org/Nafta7/toska.svg?branch=master)](https://travis-ci.org/Nafta7/toska)

Easily load modules from a given directory.

# install
```
npm install toska
```

## api

### `toska.reflect(dir, [options])` => [Map]

Reflect takes a directory and returns a `Map`, mapping each directory and
the modules inside.
If options are provided, it will be passed to your modules as arguments expanded.

#### example

```js
import toska from 'toska';
let tasks = toska.reflect('tasks');
```
Given the following directory structure:
```
gulp_tasks/
  build/
    compile_js.js
    compile_sass.js
  deploy/
    minify_css.js
    minify_js.js
```
`reflect` will return the following map:

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

## options

`options`: Can be whatever you want to be made available to all of your modules,
options are dynamically expanded to the modules. See:

```js
import toska from 'toska';

let opts = {
  gulp: gulp,
  path: {
    styles:  { src: 'styles/', dest: 'www/styles/' },
    scripts: { src: 'scripts/', dest: 'www/scripts/' }
  },
  plugins: { browserSync: browserSync }
};

let tasks = toska.reflect('tasks', opts);
```

With this configuration, your modules will receive all options expanded. See
a module example:

```js
// tasks/build/compile:sass.js <- A simple node module
import sass from 'gulp-sass';
import rename from 'gulp-rename';

module.exports = (gulp, path, plugins) => {
  return () => {
    gulp.src([`${path.styles.src}**/*.sass`])
    .pipe(sass())
    .pipe(gulp.dest(path.styles.dest))
    .pipe(plugins.browserSync.stream());
  };
};
```

## release history

* 0.1.0 Initial release (06/19/2015)
* 0.1.5 Add new API function: reflect (07/02/2015)

## license

MIT

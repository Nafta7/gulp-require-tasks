# toska

[![Build Status](https://travis-ci.org/Nafta7/toska.svg?branch=master)](https://travis-ci.org/Nafta7/toska)

# install
```
npm install toska
```

## api

### `toska.reflect(dir, [options])` => [Map]

Reflect takes a directory and returns a `Map`, mapping each directory and
the modules inside.

If options are provided, it will be passed to your modules as arguments expanded.

### `toska.mirror(dir, gulp, [options])` => [Map] # Deprecated

Mirror takes a directory and a gulp instance. It will automatically create
gulp tasks based on all modules inside the directory name provided.

#### example

```js
import toska from 'toska';
let tasks = toska.mirror('gulp_tasks', gulp);
```
Given the following directory structure:
```
gulp_tasks/
  build/
    compile:js.js
    compile:sass.js
  deploy/
    minify:css.js
    minify:js.js
```
Running `gulp -T` with
the previous directory structure will result in the following task tree:

```
├── compile:js
├── compile:sass
├── minify:css
├── minify:js
```

## options

`options`: Can be whatever you want to be made available to all of your modules,
options are dynamically expanded to the modules. See:

```js
import toska from 'toska';

let opts = {
  path: {
    styles:  { src: 'styles/', dest: 'www/styles/' },
    scripts: { src: 'scripts/', dest: 'www/scripts/' }
  },
  plugins: { browserSync: browserSync }
};

let tasks = toska.mirror('gulp_tasks', gulp, opts);
```

With this configuration, your modules will receive all options expanded. See
a module example:

```js
// gulp_tasks/build/compile:sass.js <- A simple node module
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

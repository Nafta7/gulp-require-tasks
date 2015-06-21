# toska [![Build Status](https://travis-ci.org/Nafta7/toska.svg?branch=master)](https://travis-ci.org/Nafta7/toska)

Automatically create gulp tasks from node modules by a given directory.

# install
```
npm install toska
```

# usage

For toska automatically create the tasks you will need to provide a directory
name in which your modules reside along with gulp.

```js
import toska from 'toska';
toska.mirror('gulp_tasks', gulp);
```

# examples

```js
import toska from 'toska';
let tasks = toska.mirror('gulp_tasks', gulp);
```
Given the following directory structure:
```
gulp_tasks/
  build/
    compile:sass.js
    compile:scripts.js
  deploy/
    minify:css.js
    minify:js.js
```

`toska.mirror('gulp_tasks', gulp)` will return the equivalent of:

```js
{
  build: ['compile:sass', 'compile:js']
  deploy: ['minify:css', 'minify:js']
}
```
Toska will create all tasks with gulp and their dependencies following the
directory structure passed to `mirror`. Running `gulp -T` with
the previous directory structure will result in the following task tree:

```
build
├──compile:sass.js
├──compile:js.js
deploy
├──minify:css
├──minify:js
```

# options

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

`gulp` will always be available to all your modules inside the directory you
provided to toska.

# release history

* 0.1.0 Initial release (06/19/2015)

# license

MIT

gulp-require-tasks
===================


A module to require and load gulp tasks with parameters.

----------

Usage
-------------
```es6
let path = {
  styles: {
    src: 'styles/',
    dest: 'www/styles'
  },

  scripts: {
    src: 'scripts/',
    dest: 'www/scripts/'
  }
};

import req from 'gulp-require-tasks';

let opts = {
  gulp: gulp,
  path: path,
  plugins: {browserSync: browserSync}
};

let tasks = req.loadTasks('gulp_tasks', opts);

req.startTasks(gulp, tasks);
```
Given this directory structure:
```
gulp_tasks/
  build/
    compile:sass.js
    compile:scripts.js
  deploy/
    minify:css.js
    minify:js.js
```

`req.loadTasks('gulp_tasks', opts)` will return the equivalent of:

```js
{
  build: ['compile:sass', 'compile:js']
  deploy: ['minify:css', 'minify:js']
}
```
Now with can automatically load our tasks into gulp following their directory structure.
```js
req.startTasks(gulp, tasks)
```

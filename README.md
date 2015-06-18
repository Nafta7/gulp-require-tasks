#toska
A module to automatically start gulp tasks by a given directory. To start the tasks you will need to provide a directory name where the tasks are stored. You you also need to provide a hash with gulp and a path (as a map). See Usage section for examples.

##Usage

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

import toska from 'toska';

let opts = {
  gulp: gulp,
  path: path,
  plugins: {browserSync: browserSync}
};

let tasks = toska.loadTasks('gulp_tasks', opts);

toska.startTasks(gulp, tasks);
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

`toska.loadTasks('gulp_tasks', opts)` will return the equivalent of:

```js
{
  build: ['compile:sass', 'compile:js']
  deploy: ['minify:css', 'minify:js']
}
```
Now we can automatically load our tasks into gulp following their directory structure.
```js
toska.startTasks(gulp, tasks)
```

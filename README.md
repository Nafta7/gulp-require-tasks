#toska
A module to automatically start gulp tasks by a given directory. To start the tasks you will need to provide a directory name where the tasks are stored and a hash with gulp and a path (as a map). See usage section for examples.

##usage

```
import toska from 'toska';
toska.mirror('gulp_tasks', {gulp: gulp, path: path, plugins: plugins});
```

##examples

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

let tasks = toska.mirror('gulp_tasks', opts);

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

`toska.mirror('gulp_tasks', opts)` will return the equivalent of:

```js
{
  build: ['compile:sass', 'compile:js']
  deploy: ['minify:css', 'minify:js']
}
```
Toska will automatically load all tasks and their dependencies following
the directory structure passed to `mirror`. So running `gulp -T` with the previous directory structure will result in the following tree:

```
build
├──compile:sass.js
├──compile:js.js
deploy
├──minify:css
├──minify:js
```
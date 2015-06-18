# toska

A module to automatically start gulp tasks by a given directory. To start the tasks you will need to provide a directory name where the tasks are stored and a hash with gulp and a path (as a map). See usage section for examples.

# usage

```es6
import toska from 'toska';
toska.mirror('gulp_tasks', {gulp: gulp, path: path, plugins: plugins});
```

# install
```
npm install git://github.com/Nafta7/toska.git --save
```

# examples

```es6
import toska from 'toska';

let opts = {
  gulp: gulp,
  path: { 
    styles:  { src: 'styles', dest: 'www/styles' },
    scripts: { src: 'scripts', dest: 'www/scripts' }
  },
  plugins: {browserSync: browserSync}
};

let tasks = toska.mirror('gulp_tasks', opts);
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

`toska.mirror('gulp_tasks', opts)` will return the equivalent of:

```js
{
  build: ['compile:sass', 'compile:js']
  deploy: ['minify:css', 'minify:js']
}
```
Toska will automatically start all tasks and their dependencies following
the directory structure passed to `mirror`. Running `gulp -T` with the previous directory structure will result in the following task tree:

```
build
├──compile:sass.js
├──compile:js.js
deploy
├──minify:css
├──minify:js
```
	
# license

MIT
# toska

[<img src="https://travis-ci.org/Nafta7/toska.svg?branch=master" alt="Build status" >] (https://travis-ci.org/Nafta7/toska)

A module to automatically create gulp tasks by a given directory.

# usage

For toska automatically create the tasks you will need to provide a directory
name in which your tasks reside along with gulp.

```es6
import toska from 'toska';
toska.mirror('gulp_tasks', gulp);
```

# install
```
npm install git://github.com/Nafta7/toska.git --save
```

# examples

```es6
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

`options`: Can be whatever you want to be made available to all of your tasks,
options are dynamically expanded to your tasks. See:

```es6
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

With this configuration, your tasks will receive all options expanded like this:

```es6
module.exports = (gulp, path, plugins) => {
  return () =>
    path.styles; // { src: 'styles/', dest: 'www/styles/' }
    plugins;    // { browserSync: browserSync }
    // Your tasks...
  };
}
```

`gulp` will always be available to all your tasks inside the directory you
provided to toska.

# release history

* 0.1.0 Initial release (06/19/2015)

# license

MIT

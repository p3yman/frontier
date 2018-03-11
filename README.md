# 🚀 Frontier
### A starter for front-end projects with gulp

This is a workflow for front-end and ui projects. Works done with this workflow is:
    
- Sass: Watch, compile, add source maps, autoprefix, minify, csscomb and rtl 
- HTML: Use partials, conditions and loops using gulp-file-include
- JS: Concat, uglify and minify js files with seperation of vendor and libraries files.
- Images: Compression
- Fonts: Copy
- Build: Backup source, zip and clear dist

### Packages used:
- [gulp](https://www.npmjs.com/package/gulp)
- [gulp-sass](https://www.npmjs.com/package/gulp-sass)
- [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
- [gulp-cssnano](https://www.npmjs.com/package/gulp-cssnano)
- [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
- [gulp-rename](https://www.npmjs.com/package/gulp-rename)
- [gulp-newer](https://www.npmjs.com/package/gulp-newer)
- [gulp-rimraf](https://www.npmjs.com/package/gulp-rimraf)
- [gulp-concat](https://www.npmjs.com/package/gulp-concat)
- [gulp-file-include](https://www.npmjs.com/package/gulp-file-include)
- [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
- [gulp-csscomb](https://www.npmjs.com/package/gulp-csscomb)*

* `gulp-csscomb` has a config file that is placed in route folder called `.csscomb.json`. You can change it's configs using it's own [documentations](http://csscomb.com/docs).

### Install
- Make sure you have these installed
    - [Node.js](https://nodejs.org)
    - [Git](https://git-scm.com/)
- Clone this repository using `git clone https://github.com/peyman3d/frontier.git FOLDERNAME`
- CD to the folder cd FOLDERNAME
- Run `npm install` to install the node.js dependencies
- Run `gulp` to start gulp workflow watchers
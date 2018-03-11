/*-----------------------------------------------------------------
- Frontier gulp workflow
-----------------------------------------------------------------*/

/// Load plugins
var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    sourcemaps      = require('gulp-sourcemaps'),
    cssnano         = require('gulp-cssnano'),
    autoprefixer    = require('gulp-autoprefixer'),
    rename          = require('gulp-rename'),
    newer           = require('gulp-newer'),
    rimraf          = require('gulp-rimraf'),
    concat          = require('gulp-concat'),
    fileinclude     = require('gulp-file-include'),
    uglify          = require('gulp-uglify'),
    csscomb         = require('gulp-csscomb');

/// Directories
var src_dir         = 'src/',
    dist_dir        = 'dist/',

    html = {
        in: src_dir + '*.html',
        watch: src_dir + '**/*.html',
        out: dist_dir,
        partials: src_dir + 'html/partial/*.html',
        elements: src_dir + 'html/elements/*.html',
    },

    images = {
        in:     src_dir + 'images/**/*.*',
        out:    dist_dir + 'images/'
    },

    css = {
        in:     src_dir + 'sass/**/*.scss',
        out:    dist_dir + 'css/',
    },

    fonts = {
        in:     src_dir + 'fonts/**/*.*',
        out:    dist_dir + 'fonts/'
    },

    js = {
        in_lib:         src_dir + 'js/lib/**/*.js',
        in_vendor:      src_dir + 'js/vendor/**/*.*',
        out:            dist_dir + 'js/',
        out_vendor:     dist_dir + 'js/vendor/'
    };



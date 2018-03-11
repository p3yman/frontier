/*-----------------------------------------------------------------
- Frontier gulp workflow
-----------------------------------------------------------------*/

// Load Plugins
//----------------------
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
    csscomb         = require('gulp-csscomb'),
    prettify        = require('gulp-prettify'),
    zip             = require('gulp-zip'),
    dateFormat      = require('dateformat'),
    runSequence     = require('run-sequence'),
    rtlcss          = require('gulp-rtlcss');


// Directories
//----------------------
var src_dir         = 'src/',
    dist_dir        = 'dist/',
    backup_dir      = 'backup/',
    build_dir       = 'build/',

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


// Tasks
//----------------------

// Styles
gulp.task('styles', function() {
    return gulp.src(css.in)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer("last 5 version"))
        .pipe(sourcemaps.write())
        .pipe( gulp.dest( css.out ) )
        // .pipe(rtlcss())
        // .pipe(rename({ suffix: '-rtl' }))
        .pipe( gulp.dest( css.out ) );
});
gulp.task('stylesBuild', function() {
    return gulp.src(css.in)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer("last 5 version"))
        .pipe(csscomb())
        .pipe(gulp.dest(css.out))
        .pipe( rename({suffix: '.min'}) )
        .pipe( cssnano() )
        .pipe( gulp.dest( css.out ) );
});

// Scripts
gulp.task('scripts-vendor', function () {
    return gulp.src(js.in_vendor)
        .pipe(newer(js.out))
        .pipe(gulp.dest(js.out_vendor));
});
gulp.task('scripts-lib', function () {
    return gulp.src(js.in_lib)
        .pipe(newer(js.out))
        .pipe(concat('app.js'))
        .pipe(gulp.dest(js.out));
});

// Fonts
gulp.task('fonts', function() {
    return gulp.src(fonts.in)
        .pipe(newer(fonts.out))
        .pipe(gulp.dest(fonts.out));
});

// Images
gulp.task('images', function() {
    return gulp.src(images.in)
        .pipe(newer(images.out))
        .pipe(gulp.dest(images.out));
});

// Template files
gulp.task('html', function() {
    gulp.src( [html.in, '!' + html.partials, '!' + html.elements ])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(prettify({indent_size: 4}))
        .pipe(gulp.dest(html.out));
});
// Clean all files in destination folder
gulp.task('clean', function() {
    return gulp.src(dist_dir + '*', { read: false })
        .pipe(rimraf({ force: true }));
});

// Backup
gulp.task('backup', ['clean'], function() {
    var date = new Date();
    var name = 'backup-' + dateFormat(date, "yyyy-mm-dd--H-MM-ss") + '.zip';
    return gulp.src([src_dir + '**/*', 'gulpfile.js', 'package.json'])
        .pipe(zip(backup_dir + name))
        .pipe(gulp.dest('.'));
});

// Build
gulp.task('dist', function() {
    var date = new Date();
    var name = 'build-' + dateFormat(date, "yyyy-mm-dd--H-MM-ss") + '.zip';
    return gulp.src([dist_dir + '**/*'])
        .pipe(zip(build_dir + name))
        .pipe(gulp.dest('.'));
});

// Default and Watch
gulp.task('default', ['styles', 'scripts-vendor', 'scripts-lib', 'images', 'fonts', 'html'], function() {

    gulp.watch( css.in          , ['stylesBuild']  );
    gulp.watch( js.in_vendor    , ['scripts-vendor'] );
    gulp.watch( js.in_lib       , ['scripts-lib'] );
    gulp.watch( images.in       , ['images']  );
    gulp.watch( fonts.in        , ['fonts']   );
    gulp.watch( html.watch      , ['html']    );

});

// Build
gulp.task('build', function() {
    runSequence(
        'backup',
        ['stylesBuild', 'scripts-vendor', 'scripts-lib', 'images', 'fonts', 'html'],
        'dist'
    );
});
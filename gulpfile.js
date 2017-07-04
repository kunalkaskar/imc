var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-clean-css');
var htmlreplace = require('gulp-html-replace');
var clean = require('gulp-clean');
var sass = require('gulp-sass');

var css = [
			'./bower_components/bootstrap/dist/css/bootstrap.css',
			'./bower_components/jquery.scrollbar/jquery.scrollbar.css',
			'./src/css/style.css'
		]

var js = [
			'./bower_components/jquery/dist/jquery.js',
			'./bower_components/bootstrap/dist/js/bootstrap.js',
			'./bower_components/jquery.scrollbar/jquery.scrollbar.js',
			'./src/js/main.js'
]		

gulp.task('default', ['clean', 'build', 'minify', 'uglify'], () => {
	gulp.src('src/*.html')
    .pipe(htmlreplace({
        'css': './css/styles.min.css',
        'js': './js/main.min.js'
    }))
    .pipe(gulp.dest('./build/'));

    gulp.src('src/img/*')
    .pipe(gulp.dest('./build/'));
});

gulp.task('clean', (cb) => {
	gulp.src('./build/', {read: false})
        .pipe(clean());

    cb();    
});

gulp.task('build', ['clean']);

gulp.task('uglify', () => {
	gulp.src(css)
	.pipe(concat('styles.min.css'))
	.pipe(minify())
	.pipe(gulp.dest('./build/css/'));
});

gulp.task('minify', () => {
	gulp.src(js)
	.pipe(concat('main.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./build/js/'));
});

gulp.task('sass', () => {
	return gulp.src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css'));
});

gulp.task('sass:watch', () => {
	gulp.watch('./src/scss/*.scss', ['sass']);
});


var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var $ = plugins = gulpLoadPlugins();
var autoprefixer = require('gulp-autoprefixer');
var ngHtml2Js = require("gulp-ng-html2js");
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');//Minify JavaScript with UglifyJS2.
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var jshint = require('gulp-jshint');    //jshint检测javascript的语法错误
var useref = require('gulp-useref');
var csso = require('gulp-csso');
var concat = require('gulp-concat');
var rename = require("gulp-rename");
const babel = require('gulp-babel');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var url = require('url');
var mockApi = require('./mockApi');
var del = require('del');  //删除文件

//自动化部署阿里云服务器所需
var minimist = require('minimist');
var GulpSSH = require('gulp-ssh');

var distFolderUrl = "appDist";

//***********开发目录中各种资源的路径*************************************************************
var jsList = [                    //所有JS代码在开发目录中位置
  './app/*.js',
  './app/src/directives/*.js',
  './app/src/controllers/*.js',
  './app/src/services/*.js',
  './app/src/filters/*.js',
  './tmp/templates/*.js',
];

var cssList = [                    //所有CSS代码在开发目录中位置
  './app/src/styles/app.css',
  './app/src/styles/*.css'
];
//***************************************************************************************************

//***********删除部署目录、临时目录及其他*************************************************************
gulp.task('clean', function () {
    return del([distFolderUrl + '/**','tmp/**','dist/**']);
});
//***************************************************************************************************

gulp.task('templatesTpls', function () {
    return gulp.src([
        './app/src/directives/tpls/*.html',
    ])
        .pipe(ngHtml2Js({
            moduleName: "myApp",
            prefix: "src/directives/tpls/"
        }))
        .pipe(concat("templatesTpls.min.js"))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./tmp/templates'))
});


gulp.task('templatesViews', function () {
    return gulp.src([
        './app/src/templates/**/*.html'
    ])
        .pipe(ngHtml2Js({
            moduleName: "myApp",
            rename:function (templateUrl, templateFile) {
                var pathParts = templateFile.path.split('\\');
                var file = pathParts[pathParts.length - 1];
                var folder = pathParts[pathParts.length - 2];
                if ("templates" === folder) {
                    return "./src/templates/" + file
                } else {
                    return "./src/templates/" + folder + '/' + file
                }
            }
        }))
        .pipe(concat("templatesViews.min.js"))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./tmp/templates'))
});

//***********开发目录的公共资源拷贝到部署目录*************************************************************
gulp.task('public', function() {           //公共资源
    return gulp.src(['./app/public/**/*','./app/*.ico'], {base: './app/'})
        .pipe(gulp.dest(distFolderUrl))
});

gulp.task('vendor', function () {           //框架资源
    return gulp.src(['./app/bower_components/**/*'])
        .pipe(gulp.dest(distFolderUrl + '/vendor'))
});

gulp.task('less', function () {          //less文件转换成CSS文件
    return gulp.src('./app/src/styles/less/*.less')
        .pipe(less())
        .pipe(sourcemaps.write('./app/src/styles'))
        .pipe(gulp.dest('./app/src/styles'))
});

gulp.task('css', ['less'], function() {      //CSS资源
    return gulp.src(cssList)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(concat('app.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(distFolderUrl + '/static/css'))
})

gulp.task('copyTemplatesToDist', function () {    //Angular模板html源文件
  return gulp.src([
    './app/src/templates/**/*.html',
  ])
    .pipe(gulp.dest(distFolderUrl + '/src/templates'));
});

gulp.task('copyTplsToDist', function () {        //Angular指令中的模板html源文件
  return gulp.src([
    './app/src/directives/tpls/**/*.html',
  ])
    .pipe(gulp.dest(distFolderUrl + '/src/directives/tpls'));
});

gulp.task('html', ['copyTemplatesToDist', 'copyTplsToDist'], function () {   //所有的html源文件
  return gulp.src(['app/index-dist.html'])
    .pipe(rename('index.html'))
    .pipe(gulp.dest(distFolderUrl))
});
//*****************************************************************************************************

//***********JS代码检查*************************************************************
gulp.task('jshint', function () {
    return gulp.src(jsList)
        .pipe(reload({stream: true, once: true}))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
});
//*********************************************************************************

//***********把JS代码从开发目录拷贝到部署目录并打包********************************
gulp.task('js', ['templatesTpls','templatesViews'], function () {
    return gulp.src(jsList)
        .pipe(concat('app.min.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify({
            mangle: false,//类型：Boolean 默认：true 是否修改变量名
            compress: false,//类型：Boolean 默认：true 是否完全压缩
            preserveComments: 'all' //保留注释
        }).on('error', function(e){
            console.log(e);
        }))
        .pipe(gulp.dest(distFolderUrl + '/static/js'))
});
//*************************************************************************************

gulp.task('htmlVendor', function () {
    return gulp.src(['app/index-vendor.html'])
        .pipe(useref({ searchPath: ['app'] }))
        // .pipe(rename('index1.html'))
        .pipe(gulpif('*.js', uglify({
            mangle: false,
            compress: false,
            preserveComments: 'all'
        })))
        .pipe(gulpif('*.css', csso()))
        // .pipe(gulpif('*.html', htmlMinify({conditionals: true, loose: false})))
        .pipe(gulp.dest(distFolderUrl));
});

//***********项目构建中实际使用的指令**************************************************
gulp.task('build', ['public','vendor','js','css','html'], function () {
    return gulp.src(distFolderUrl + '/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

gulp.task('server',  function () {
    browserSync({
        notify: false, // Don't show any notifications in the browser.
        port: 8082,
        open: false,
        server: {
            baseDir: ['app'],
            routes: {
                // 'bower_components': 'bower_components',//if bower_components' path is up the tree of app
            },
            middleware:
                function (req, res, next) {
                    var urlObj = url.parse(req.url, true),
                        method = req.method,
                        paramObj = urlObj.query;
                    mockApi(res, urlObj.pathname, paramObj, next);
                }
        }
    });
    // watch for changes
    gulp.watch([
        'app/**/*.html',
        'app/**/*.css',
        'app/**/*.js',
        'app/public/**/*',
        'app/data/**/*',
        'app/temp_data/*'
    ]).on('change', reload);
    gulp.watch('app/src/**/*.less', ['css', reload]);
});

gulp.task('serve-release',  function () {
    browserSync({
        notify: false,
        port: 8082,
        server: {
            baseDir: [distFolderUrl]
        }
    });

});
//***********************************************************************************

//***********自动部署到阿里云服务器***************************************************
  //载入配置文件
var config = require(`./config.aliyun.js`);
var sshConfig = config.ssh;
  //打开ssh通道
var gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: sshConfig
});

//删除阿里云服务器部署根目录上文件
gulp.task('removeRemoteFilesAll', function() {       //删除所有文件
  console.log('删除服务器上所有文件...');
  return gulpSSH.shell(config.commandsRemoveAll, {filePath: 'commands.log'})
    .pipe(gulp.dest('logs')); //在本地项目文件夹保存远程命令日志
});
gulp.task('removeRemoteFilesNotAll', function() {       //删除除bower_components文件夹外所有文件
  console.log('删除服务器上除bower_components文件夹外其他文件...');
  return gulpSSH.shell(config.commandsRemoveNotAll, {filePath: 'commands.log'})
    .pipe(gulp.dest('logs')); //在本地项目文件夹保存远程命令日志
});

//上传本地项目文件到阿里云服务器
gulp.task('deployAliFirst', ['removeRemoteFilesAll'],function() {
  console.log('2s后开始上传文件...');
  setTimeout(function(){
    return gulp
      .src(['./app/**', '!**/node_modules/**'])
      .pipe(gulpSSH.dest(config.remoteDir));
  },2000);
});
gulp.task('deployAli', ['removeRemoteFilesNotAll'],function() {
  console.log('2s后开始上传文件...');
  setTimeout(function(){
    return gulp
      .src(['./app/**', '!**/bower_components/**'])
      .pipe(gulpSSH.dest(config.remoteDir));
  },2000);
});
//*********************************************************************************



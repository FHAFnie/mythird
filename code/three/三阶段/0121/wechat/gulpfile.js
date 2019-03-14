


// gulp  实现项目工程自动化  
// 自动合并文件 压缩文件 自动重命名  编译less/scss  复制文件 

// gulpfile ==> gulp  

// gulp.js - 基于流的自动化构建工具。 | gulp.js 中文网
// gulp 实现项目工程自动化  自动压缩文件  自动编译scss/css 自动合并压缩JS 压缩gzip/img
//  实现监听 和 文件复制    
//  gulp.src(source).gulp.dest(result)  
// 支持链式操作 


var gulp = require("gulp");
var imagemin  =  require("gulp-imagemin");
var sass = require("gulp-sass");
var rename = require('gulp-rename');


// gulp.task() 创建任务
gulp.task("hello",()=>{
    console.log("hello-1807");
})


gulp.task("daydayup",()=>{
    console.log("wh1807 daydayup")
})

// gulp.src(源路径).pipe(gulp.dest(新路径))  
gulp.task("copy-pages",()=>{
    gulp.src("./pages/**/*")
  
    .pipe(gulp.dest("./my-pages"))
});

gulp.task("imagemin",()=>{
    gulp.src("./images/**/*")
    .pipe(imagemin())  // 压缩图片
    .pipe(gulp.dest("imgs"))
})

gulp.task("scss",()=>{
    gulp.src(["./**/*.scss","!node_modules/**/*"])
    .pipe(sass().on("error",sass.logError))   // 把 scss 打包成 css 文件 
    .pipe(rename(function(path){
        console.log(path);
        path.extname = ".wxss";
    }))
    .pipe(gulp.dest("./"))
})



gulp.task("watch",()=>{
    gulp.watch(["./**/*.scss"],["sass"]);
    gulp.watch("pages/**/*.scss",["sass"])
})



gulp.task("default",['hello','daydayup','copy-pages','scss','watch']);
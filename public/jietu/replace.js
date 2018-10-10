var fs = require('fs');
var path = require('path');

var str = 
`<a class="tips-water" target="_blank" href="../user/register.html">去水印</a>`;

// var filename = './red.html';
function replace(filename){
    fs.readFile(filename,function(err,data){
        if(err){
            console.log("读取失败"+filename);
        }else{
            var newData = data.toString().replace(str, ``);
            
            fs.writeFile(filename, newData, function(){
                if(err){
                    console.log("文件写入失败" + filename)
                }else{
                    console.log("文件追加成功" + filename);
                }
            });
        }
    });
}


//解析需要遍历的文件夹，我这以E盘根目录为例
var filePath = path.resolve('./');

//调用文件遍历方法
fileDisplay(filePath);

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath){
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath,function(err,files){
        if(err){
            console.warn(err)
        }else{
            //遍历读取到的文件列表
            files.forEach(function(filename){
                //获取当前文件的绝对路径
                var filedir = path.join(filePath,filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,function(eror,stats){
                    if(eror){
                        console.warn('获取文件stats失败');
                    }else{
                        var isFile = stats.isFile();//是文件
                        var isDir = stats.isDirectory();//是文件夹
                        if(isFile && filedir.indexOf('.html') != -1){
                            console.log(filedir);
                            replace(filedir);
                        }
                        if(isDir){
                            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            });
        }
    });
}

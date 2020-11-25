var moment = require('moment');
const fs = require('fs')
const path = require('path')

var fileData = []
var fileCtime = function(dir) {
    var list = fs.readdirSync(dir)
    list.forEach(function(file) {
        if (file === 'node_modules' || file === 'assets') {
            return false
        }
        file = dir + '/' + file
        var fileStats = fs.statSync(file)
        if (fileStats && fileStats.isDirectory()) {
            fileCtime(file)
        } else {
        	// 过滤
            if (path.extname(file) === '.vue') {
                fileData.push(moment(fileStats.mtime).format('YYYY/MM'))
            }
        }
    })
}
fileData.sort(function(a,b){
    return b > a ? 1 : -1 
})
function arrayCnt(arr) {
    var newArr = []; 
    newArr = [...new Set(arr)]; 
    var newarr2 = new Array(newArr.length);
    for(var i = 0; i < newarr2.length; i++) {
        newarr2[i] = 0;
    }
    for(var i = 0; i < newArr.length; i++) {
        for(var j = 0; j < arr.length; j++) {
            if(newArr[i] == arr[j]) {
                newarr2[i]++;
            }
        }

    }
    var statis = [];
    for(var i = 0; i < newArr.length; i++) {
        statis.push({
            tiem:newArr[i],
            total: newarr2[i]
        })
    }
    console.log(statis)
}
fileCtime('E:/web/code/MES-611/big-screen-vue-datav') //项目路径
arrayCnt(fileData);
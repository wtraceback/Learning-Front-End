/*
知乎有一个求助题, 破译密码的
链接在此
https://www.zhihu.com/question/28324597
这一看就是凯撒加密...
*/

(function() {
    var code = 'VRPHWLPHV L ZDQW WR FKDW ZLWK BRX, EXW L KDYH QR UHDVRQ WR FKDW ZLWK BRX';

    var decode = function(s, shift) {
        var lower = 'abcdefghijklmnopqrstuvwxyz';
        var result = '';

        s = s.toLowerCase();
        for (var i = 0; i < s.length; i++) {
            var temp = s[i];
            var index = lower.indexOf(temp);

            if (-1 != index) {
                index = (index + shift) % lower.length;
                result += lower[index];
            } else {
                result += temp;
            }
        }

        return result;
    }

    var decrypt = function(str) {
        // 将所有的位移情况都计算在内
        for (var i = 1; i <= 26; i++) {
            var result = decode(str, i);
            console.log(result);
        }
    }

    decrypt(code);
})();

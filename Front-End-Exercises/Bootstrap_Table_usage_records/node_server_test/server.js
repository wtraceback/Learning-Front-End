var express = require('express');
var app = express();

app.use(express.static('library'));

app.get('/', function(req, res) {
    console.log("user /")
     res.sendFile(__dirname + "/library/library.html")
})

app.get('/getData', function(req, res) {
    console.log("use getData");

    var data = [{
        id: 1,
        name: '万物静默如谜',
        author: '维斯拉瓦·辛波斯卡',
        category: '外国文学',
        sorce: '',
        img_url: '',
        download_url: 'https://pan.baidu.com/s/lnwO8hrN',
        introduction: `《辛波斯卡诗选：万物静默如谜》收录辛波斯卡各阶段名作75首，
        包括激发知名绘本作家吉米创作出《向左走，向右走》的《一见钟情》，收录高中语文教材的
        《底片》，网上广为流传的最佳图书`,
        author_info: '',
        directory: '',
        create_edit: '2018-03-24 09:53:28'
    }];

    res.send(JSON.stringify(data));
})

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
})

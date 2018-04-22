1) <!-- Bootstrap Table其默认语言为英文、导入了中文的js文件后，就将会其语言设置为中文 -->
    <!-- <script src="scripts/locale/bootstrap-table-en-US.js"></script> -->
    <!-- <script src="scripts/locale/bootstrap-table-zh-CN.min.js"></script> -->

2)
    $('#table').bootstrapTable({
        url: '/getData',                    // 服务器数据的加载地址
        method: "get",                      // 请求类别
        responseHandler: function(res) {    //加载服务器数据之前的处理程序，可以用来格式化数据。
            return res;                     //参数：res为从服务器请求到的数据。可以根据需要来改变返回值res
        },                                  // responseHandler的返回值相当于设置了其表格参数data，不需要而外设表格参数data
        onLoadSuccess: function(data){      //加载成功时执行
          console.log("加载数据成功");
        },
        onLoadError: function(data){        //加载失败时执行
          console.log("加载数据失败");
        },
        striped: true,                      // 有隔行变色效果
        search: true,                       // 启用搜索框
        pagination: true,                   // 在表格底部显示分页条
        pageSize: 5,                        // 每页数据条数
        pageList: [5, 10],                  // 可供选择的页面数据条数
        paginationPreText: 'Previous',      // 指定分页条中上一页按钮的图标或文字
        paginationNextText: 'Next',         // 指定分页条中下一页按钮的图标或文字
        columns: [{                         // 列配置项
            field: 'id',
            title: 'Rank'
        }, {
            field: 'img_url',
            title: 'Img Url',
            formatter: function(value, row, index) {        //列参数:根据需要将列表中的某项改为超链接项
                if (row.img_url !== '' && row.img_url !== undefined) {
                    return `<a href=${row.img_url} target="_blank">Image download</a>`;
                }
            }
        }, {
            field: 'download_url',
            title: 'Download Url',
            formatter: function(value, row, index) {        //列参数:根据需要将列表中的某项改为超链接项
                if (row.download_url !== '' && row.download_url !== undefined) {
                    return `<a href=${row.download_url} target="_blank">Book download</a>`;
                }
            }
        }
    });

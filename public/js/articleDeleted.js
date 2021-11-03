(function () {
    let website_id = localStorage.getItem('checkWebsite');
    layui.use(['layer', 'table'], function () {
        let layer = layui.layer,
            table = layui.table;

        table.render({
            elem: '#deleted-table',
            url: '/articles/all?website_id=' + website_id + '&status=deleted',
            page: true,
            limit: 20,
            text: {
                none: '空空如也~'
            },
            cols: [[
                {
                    title: '序号', type: 'numbers', width: 80
                },
                {
                    field: 'article_id', title: 'Articles ID', width: 180, align: 'center'
                },
                {
                    title: '所属栏目', width: 180, templet: function (d) { return `<span>${d.public_api_column.title}</span>` }
                },
                {
                    field: 'title', title: '标题'
                },
                {
                    field: 'keywords', title: 'SEO关键词', width: 200
                },
                {
                    field: 'author_id', title: '作者', width: 150,
                },
                {
                    field: 'utime', title: '发布时间', width: 150, align: 'center', templet: '#utime-tr'
                },
                {
                    field: 'state', title: '状态', width: 100, align: 'center'
                },
                {
                    title: '操作', toolbar: '#handle-bar', align: 'center', width: 200
                }
            ]],
            parseData: (res) => {
                let data = {};
                if (res.status === 'fail') {
                    data = {
                        "code": 0,
                        "count": 0,
                        "data": []
                    }
                } else {
                    res.data.rows.forEach(ele => {
                        ele.utime = formatTime(ele.utime)
                    })
                    data = {
                        "code": 0,
                        "count": res.data.count,
                        "data": res.data.rows
                    }
                }
                return data;
            }
        })

        table.on('tool(deleted-table-filter)', function (obj) {
            let { data, event, tr } = obj;

            if (event === 'del') { //删除
                let msg = '确定要彻底删除 《' + data.title + '》 吗？'

                layer.confirm(msg, { icon: 3, title: '提示', move: false }, function (index) {
                    layer.msg('暂不支持该功能!');
                    return false;

                    // obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                    // layer.close(index);
                    //向服务端发送删除指令
                });
            } else if (event === 'submit') { //恢复 ， 修改状态为done
                let msg = '确定要恢复 《' + data.title + '》 吗？'
                layer.confirm(msg, { icon: 3, title: '提示', move: false }, function (index) {



                    // 向服务端发送删除指令

                    $.ajax({
                        type: 'PUT',
                        url: '/articles/update',
                        data: {
                            article_id: data.article_id,
                            state: 'done'
                        },
                        success: (res) => {
                            if (res.status === 'success') {
                                layer.msg('更新成功！', { icon: 1 });

                                obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                                layer.close(index);
                            } else {
                                layer.msg('更新失败！', { icon: 2 })
                            }
                        },
                        fail: (err) => {
                            layer.msg(err, { icon: 2 })
                        }
                    })

                });


            } else if (event === 'LAYTABLE_TIPS') {
                layer.alert('Hi，头部工具栏扩展的右侧图标。');
            }
        })
    })
}())
let template = `<form class="layui-form">
          <div class="layui-form-item">
            <label class="layui-form-label">网址</label>
            <div class="layui-input-block">
              <input type="text" autocomplete="off" name="website" lay-verify="required" class="layui-input">
            </div>
          </div>
          <div class="layui-form-item">
            <div class="layui-input-block">
              
              <button class="layui-btn" lay-submit lay-filter="website-form-filter">立即提交</button>
              <button type="reset" class="layui-btn layui-btn-primary">重置</button>
            </div>
          </div>
        </form>`

layui.use(['layer', 'table', 'form'], function () {
    let table = layui.table;
    table.render({
        elem: '#website-table',
        width: 886,
        url: '/website/',
        page: true,
        loading: true,
        limit: 20,
        cols: [[
            {
                title: '序号', width: 80, type: 'numbers', sort: true
            },
            {
                field: 'website_id', title: 'ID', width: 150
            },
            {
                field: 'website', title: '网站域名', width: 200
            },
            {
                field: 'ctime', title: '添加日期', width: 200, sort: true
            },
            {
                width: 250, title: '操作', align: 'center', toolbar: '#handle-bar'
            }
        ]],
        parseData: (res) => {
            return {
                "code": 0,
                "count": res.data.count,
                "data": res.data.rows
            }
        }
    })

    table.on('tool(website-table-filter)', function (obj) {
        let { data, event, tr } = obj;

        if (event === 'detail') { //查看
            window.open(data.website)
            //do somehing
        } else if (event === 'del') { //删除

            let msg = '你确定要删除 ' + data.website + ' 吗？'
            layer.confirm(msg, { icon: 3, title: '提示', move: false }, function (index) {
                layer.msg('暂不支持该功能!');
                return false;

                // obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                // layer.close(index);
                //向服务端发送删除指令
            });
        } else if (event === 'edit') { //编辑

            let websiteID = data.website_id;

            layer.open({
                type: '0',
                title: '更新网站',
                content: template
            })

            var form = layui.form;

            //监听提交
            form.on('submit(website-form-filter)', function (data) {
                // 获取用户输入的网址
                let website = data.field.website;

                $.ajax({
                    type: 'PUT',
                    url: '/website/update',
                    data: {
                        website_id: websiteID,
                        website: website
                    },
                    success: (res) => {
                        if (res.status === 'success') {
                            layer.msg(res.msg);
                            //同步更新缓存对应的值
                            obj.update({
                                website: website
                            });
                        } else {
                            layer.msg('更新失败，请稍后重试！')
                        }
                    },
                    fail: (err) => {
                        layer.msg('Error: ' + err);
                    }
                })

                return false;
            });

        } else if (event === 'LAYTABLE_TIPS') {
            layer.alert('Hi，头部工具栏扩展的右侧图标。');
        }
    })

})


// 点击添加网站按钮
$('.add-website-btn').on('click', () => {

    layui.use(['layer', 'form'], function () {
        const layer = layui.layer;

        layer.open({
            type: '0',
            title: '添加网站',
            content: template
        })

        var form = layui.form;

        //监听提交
        form.on('submit(website-form-filter)', function (data) {
            // 获取用户输入的网址
            let website = data.field.website;

            $.ajax({
                type: 'POST',
                url: '/website/add',
                data: {
                    website: website
                },
                success: (res) => {
                    if (res.status === 'success') {
                        layer.msg(res.msg);
                    } else {
                        layer.msg('添加失败，请稍后重试！')
                    }
                },
                fail: (err) => {
                    layer.msg('Error: ' + err);
                }
            })

            return false;
        });
    })
})

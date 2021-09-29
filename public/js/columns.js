
layui.use(['layer','form', 'table'], function(){

    let form = layui.form;
    let layer = layui.layer;
    let table = layui.table;

    let template = `<form class="layui-form" lay-filter="columns-form" style="padding-right: 30px;">
    <div class="layui-form-item" style="margin: 15px 0">
      <label class="layui-form-label">栏目名称</label>
      <div class="layui-input-block" >
        <input type="text" autocomplete="off" name="title" lay-verify="required" class="layui-input">
      </div>
    </div>
    <div class="layui-form-item" style="margin: 15px 0">
      <div class="layui-input-block">
        
        <button class="layui-btn" lay-submit lay-filter="columns-form-filter">立即提交</button>
        <button type="reset" class="layui-btn layui-btn-primary">重置</button>
      </div>
    </div>
  </form>`
    // 点击添加栏目
    $('.add-columns-btn').on('click', function () {

        layer.open({
            type: 1,
            title: '添加栏目',
            content: template
        })
    })

    // 监听表单提交
    form.on('submit(columns-form-filter)', function (data) {
        let title = data.field.title;
        let website_id = localStorage.getItem('checkWebsite');
        $.ajax({
            type: 'POST',
            url: '/columns/create',
            data: {
                title: title,
                website_id: website_id
            },
            success: (res) => {
                if (res.status === 'success') {
                    layer.msg('添加成功', { icon: 1 })
                }
            },
            fail: (err) => {
                layer.msg(err, { icon: 2 })
            }
        })
    })


    let url = '/columns/all?website_id=' + localStorage.getItem('checkWebsite');
    // 渲染表格
    table.render({
        elem: '#columns-table',
        height: 315,
        url: url,
        page: false,
        loading: true,
        text: {
            none: '空空如也~'
        },
        cols:[[
            {
                title: '序号', width: 80, type: 'numbers', sort: true
            },
            {
                field: 'columns_id', title: 'Columns ID', width: 200
            },
            {
                field: 'title', title: '栏目名称', width: 150
            },
            
            {
                field: 'ctime', title: '创建时间', width: 200, sort:true
            },
            {
                title: '操作', align: 'center', toolbar: '#handle-bar', width: 250
            }
        ]],
        parseData: (res) => {
            if (res.status === 'fail') {

                return {
                    "code": 0,
                    "count": 0,
                    "data": []
                }
            }
            return {
                "code": 0,
                "count": res.data.length,
                "data": res.data
            }
        }
    })

    // 监听表格按钮事件

    table.on('tool(columns)', function (obj) {

        let { data, event, tr } = obj;

        if (event === 'del') {
            let msg = '确定要删除【' + data.title + '】吗？'
            // 删除
            layer.confirm(msg, { title: '提示', icon: 3, move: false }, function (index) {
                layer.msg('暂不支持该功能', { icon: 2 });
                return false;
            })
        } else if (event === 'edit') {
            // 点击编辑

            let columns_id = data.columns_id;

            layer.open({
                type: 1,
                title: '更新栏目',
                content: template,
                area: 'auto',
                move: false
            })
            console.log(data);
            form.val('columns-form', {
                title: data.title
            })

            form.on('submit(columns-form-filter)', function (data) {
                let title = data.field.title;
        
                $.ajax({
                    type: 'PUT',
                    url: '/columns/update',
                    data: {
                        title: title,
                        columns_id: columns_id
                    },
                    success: (res) => {
                        if (res.status === 'success') {
                            layer.msg('更新成功', { icon: 1 })
                        }
                    },
                    fail: (err) => {
                        layer.msg(err, { icon: 2 })
                    }
                })
            })

        }
    })
})

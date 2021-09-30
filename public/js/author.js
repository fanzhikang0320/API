let templateForm = `<form class="layui-form" lay-filter="author-form" style="padding-right: 30px;">
<div class="layui-form-item" style="margin: 15px 0">
  <label class="layui-form-label">头像</label>
  <div class="layui-input-block">
      <button class="layui-btn" type="button" id="upload-btn">
          <i class="layui-icon">&#xe67c;</i>上传头像  
      </button>
  </div>
  <img src="" alt="" height="100px"  style="margin-left: 110px; margin-top: 15px; max-width: 500px; display: none" id="avatarImage">
    
</div>
<div class="layui-form-item" style="margin: 15px 0">
  <label class="layui-form-label">名字</label>
  <div class="layui-input-block" >
    <input type="text" autocomplete="off" name="name" lay-verify="required" class="layui-input">
  </div>
</div>
<div class="layui-form-item" style="margin: 15px 0">
  <label class="layui-form-label">介绍</label>
  <div class="layui-input-block" >
    <textarea name="introduce" class="layui-textarea"></textarea>
  </div>
</div>
<div class="layui-form-item" style="margin: 15px 0">
  <div class="layui-input-block">
    
    <button class="layui-btn" type="button" lay-submit lay-filter="author-form-filter">立即提交</button>
    <button type="button" lay-submit lay-filter="author-form-reset" class="layui-btn layui-btn-primary">重置</button>
  </div>
</div>
</form>`
let src = '';

let isUpdate = false;
let author_id = '';

function isShowImage(src) {
    src = src || '';
    if (src === '') {
        $('#avatarImage').css({
            display: 'none'
        });
        $('#avatarImage').attr('src', '')
        return;
    }
    $('#avatarImage').css({
        display: 'block'
    });
    $('#avatarImage').attr('src', src)
}

layui.use(['layer', 'form', 'table', 'upload'], function () {
    let layer = layui.layer;
    let form = layui.form;
    let table = layui.table;
    let upload = layui.upload;


    table.render({
        elem: '#author-table',
        url: '/author/all',
        text: {
            none: '暂无作者信息'
        },
        page: true,
        limit: 20,
        cols: [[
            {
                title: '序号', type: 'numbers', width: 80
            },
            {
                title: 'Author ID', field: 'author_id', width: 250
            },  
            {
                title: '头像', field: 'avatar', width: 150, templet: '#avatar-tr'
            },
            {
                field: 'name', title: '名字', width: 150
            },
            {
                field: 'introduce', title: '介绍'
            },
            {
                title: '操作', toolbar: '#handle-bar', align: 'center', width: 200
            }
        ]],
        parseData: (res) => {
            let data = {
                "code": 0,
                "count": 0,
                "data": []
            };
            if (res.status === 'success') {

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

    $('.add-author-btn').on('click', function () {
        isUpdate = false;
        layer.open({
            type: 1,
            content: templateForm,
            title: '添加作者',
            width: 500,
            move: false

        })


        upload.render({
            elem: '#upload-btn',
            url: '/upload', //上传接口
            accept: 'images', // 允许上传图片文件类型
            acceptMime: 'image/jpg, image/png, image/svg+xml, image/webp, image/gif, image/jpeg, image/x-icon',
            size: 10 * 1024, //最大允许上传的文件大小 为 10Mb
            multiple: false, // 只允许单文件
            field: 'photos', // 文件域的字段名
    
            before: function (obj) {
                layer.load(); // 加载loading
            },
            done: function (res) {
                //上传成功
                layer.closeAll('loading'); //关闭loading
                if (res.status === 'success') {
                    layer.msg('上传成功', { icon: 1 });
                    src = res.data[0].src;
                    isShowImage(src);
    
                } else {
                    layer.msg('上传失败', { icon: 5 })
                }
            },
            error: function (index, upload) {
                //上传失败
                layer.closeAll('loading'); //关闭loading
                layer.msg('不支持的文件类型，请重新选择！', { icon: 2 })
    
            }
        })
    })



    
    // 监听表格按钮事件

    table.on('tool(author-table-filter)', function (obj) {

        let { data, event, tr } = obj;

        if (event === 'del') {
            let msg = '确定要删除【' + data.name + '】作者吗？'
            // 删除
            layer.confirm(msg, { title: '提示', icon: 3, move: false }, function (index) {
                $.ajax({
                    type: 'DELETE',
                    url: '/author/delete',
                    data: {
                        author_id: data.author_id
                    },
                    success: (res) => {
                        if (res.status === 'success') {
                            obj.del();
                            layer.close(index);
                            layer.msg('删除成功', { icon: 1 });
                        } else {
                            layer.msg('删除失败', { icon: 2 })
                        }
                    },
                    fail: (err) => {
                        layer.msg(err, { icon: 2 })
                    }
                })
                return false;
            })
        } else if (event === 'edit') {
            // 点击编辑
            isUpdate = true;
            author_id = data.author_id;
            layer.open({
                type: 1,
                content: templateForm,
                title: '编辑 【' + data.name + '】 作者信息',
                width: 500,
                move: false
    
            })
            
            form.val('author-form', {
                name: data.name,
                introduce: data.introduce
            })

            src = data.avatar;
            isShowImage(src);
            upload.render({
                elem: '#upload-btn',
                url: '/upload', //上传接口
                accept: 'images', // 允许上传图片文件类型
                acceptMime: 'image/jpg, image/png, image/svg+xml, image/webp, image/gif, image/jpeg, image/x-icon',
                size: 10 * 1024, //最大允许上传的文件大小 为 10Mb
                multiple: false, // 只允许单文件
                field: 'photos', // 文件域的字段名
        
                before: function (obj) {
                    layer.load(); // 加载loading
                },
                done: function (res) {
                    //上传成功
                    layer.closeAll('loading'); //关闭loading
                    if (res.status === 'success') {
                        layer.msg('上传成功', { icon: 1 });
                        src = res.data[0].src;
                        isShowImage(src);
        
                    } else {
                        layer.msg('上传失败', { icon: 5 })
                    }
                },
                error: function (index, upload) {
                    //上传失败
                    layer.closeAll('loading'); //关闭loading
                    layer.msg('不支持的文件类型，请重新选择！', { icon: 2 })
        
                }
            })
            

        }
    })
    

    form.on('submit(author-form-filter)', function (data) {

        let formData = {
            name: data.field.name,
            introduce: data.field.introduce
        }
        
        formData.avatar = src;

        if (isUpdate) {


            formData.author_id = author_id;

            $.ajax({
                type: 'PUT',
                url: '/author/update',
                data: formData,
                success: (res) => {
                    if (res.status === 'success') {
                        isUpdate = false;
                        resetForm();
                        layer.msg('更新成功', { icon: 1 })
                    } else {
                        layer.msg('添加失败', { icon: 2 })
                    }

                },
                fail: (err) => {
                    layer.msg(err, { icon: 2 })
                }
            })
        } else {
            $.ajax({
                type: 'POST',
                url: '/author/create',
                data: formData,
                success: (res) => {
                    if (res.status === 'success') {
                        resetForm();
                        layer.msg('添加成功', { icon: 1 })
                    } else {
                        layer.msg('添加失败', { icon: 2 })
                    }
                },
                fail: (err) => {
                    layer.msg(err, { icon: 2 })
                }
            })
        }
        
    })

    function resetForm(){
        src = '';
        isShowImage();
        form.val('author-form',{
            name: '',
            introduce: ''
        })
    }
    // 重置表单内容
    form.on('submit(author-form-reset)', function () {
        resetForm();
    })







})
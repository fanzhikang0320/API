(function () {
    // 编辑器配置
    const config = {
        setReadyOnly: false,
        removePlugins: 'easyimage',
        extraPlugins: 'autogrow, image2',
        autoGrow_maxHeight: 1000, // 自动增长的最大高度
        autoGrow_minHeight: 600, // 自动增长的最小高度
        filebrowserImageBrowseUrl: '/uploader',
        filebrowserImageUploadUrl: '/uploader'
    }

    CKEDITOR.replace('editor', config);

    // CKEDITOR.config.UploadUrl = '/upload'

    const website_id = localStorage.getItem('checkWebsite');

    layui.use(['form', 'laydate', 'upload', 'layer'], function () {
        var form = layui.form;
        var layer = layui.layer;
        var laydate = layui.laydate;
        var upload = layui.upload;

        let src = ''; // 存储上传图片路径
        upload.render({
            elem: '#upload-btn',
            url: '/upload', //上传接口
            accept: 'images', // 允许上传图片文件类型
            acceptMime: 'image/*',
            size: 10 * 1024, //最大允许上传的文件大小 为 10Mb
            multiple: false, // 只允许单文件
            field: 'photos', // 文件域的字段名
            exts: 'jpg|png|gif|bmp|jpeg|webp|svg|ico',
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
        // 1.查看localStroage中是否存在edit_article_id, 存在即修改文章， 不存在则是上传文章
        let isUpdate = false;

        const editArticleID = localStorage.getItem('edit_article_id');

        function isShowImage(src) {
            src = src || '';
            if (src === '') {
                $('#currentImage').css({
                    display: 'none'
                });
                $('#currentImage').attr('src', '')
                return;
            }
            $('#currentImage').css({
                display: 'block'
            });
            $('#currentImage').attr('src', src)
        }

        if (editArticleID) {
            $.ajax({
                type: 'GET',
                url: '/articles/find?article_id=' + editArticleID,
                success: (res) => {
                    if (res.status === 'success') {
                        let { columns_id, content, date, introduce, keywords, main_picture, state, subtitle, title, website_id, author_id } = res.data;

                        form.val('edit-form-filter', {
                            columns_id: columns_id,
                            keywords: keywords,
                            title: title,
                            subtitle: subtitle,
                            date: date,
                            abstract: introduce,
                            author_id: author_id
                        });
                        src = main_picture;
                        isShowImage(src);

                        // 解决数据回显问题

                        CKEDITOR.instances.editor.on('instanceReady', () => {
                            CKEDITOR.instances.editor.setData(content);
                        })

                        laydate.render({
                            elem: '#time-input',
                            value: formatTime(date)
                        })

                        isUpdate = true;
                    } else {
                        localStorage.removeItem('edit_article_id');
                        isUpdate = false;
                    }
                },
                fail: (err) => {
                    localStorage.removeItem('edit_article_id');
                    layer.msg(err, { icon: 2 });
                    isUpdate = false;
                }
            })
        }
        // 监听提交表单
        form.on('submit(submitArticle)', function (data) {
            data.field.state = 'done'
            submitForm(data.field);
            return false;
        })

        // 点击保存至草稿箱
        form.on('submit(submitArticleDrafts)', function (data) {
            data.field.state = 'pending'
            submitForm(data.field)
            return false;
        })

        function submitForm(params) {
            let { abstract, author_id, columns_id, keywords, subtitle, title, date, state } = params;

            let formData = {
                website_id: website_id,
                columns_id: columns_id,
                author_id: author_id,
                main_picture: src,
                title: title,
                subtitle: subtitle,
                keywords: keywords,
                introduce: abstract,
                content: CKEDITOR.instances.editor.getData(),
                date: date,
                state: state
            }
            if (isUpdate) {
                formData.article_id = editArticleID;

                $.ajax({
                    type: 'PUT',
                    url: '/articles/update',
                    data: formData,
                    success: (res) => {
                        if (res.status === 'success') {
                            resetForm();
                            localStorage.removeItem('edit_article_id');
                            isUpdate = false; //状态重置为上传状态
                            layer.msg('更新成功！', { icon: 1 });

                        } else {
                            layer.msg('更新失败！', { icon: 2 })
                        }
                    },
                    fail: (err) => {
                        layer.msg(err, { icon: 2 })
                    }
                })
            } else {
                $.ajax({
                    type: 'POST',
                    url: '/articles/create',
                    data: formData,
                    success: (res) => {
                        if (res.status === 'success') {
                            resetForm();

                            layer.msg('上传成功', { icon: 1 });
                        } else {
                            layer.msg('上传失败', { icon: 2 })
                        }
                    },
                    fail: (err) => {
                        layer.msg(err, { icon: 2 })
                    }
                })
            }
        }

        //重置表单
        form.on('submit(resetArticle)', function () {
            resetForm();
        })

        function resetForm() {

            src = '';
            isShowImage();
            form.val('edit-form-filter', {
                columns_id: '',
                keywords: '',
                title: '',
                subtitle: '',
                abstract: '',
                author_id: ''
            });
            CKEDITOR.instances.editor.setData('')
            form.render();

            laydate.render({
                elem: '#time-input',
                value: formatTime(new Date().getTime()),
                isInitValue: true
            })
        }

        laydate.render({
            elem: '#time-input',
            value: formatTime(new Date().getTime()),
            isInitValue: true
        })

    })

    // 查询该网站下的所有栏目
    function selectColumns() {
        let url = '/columns/all?website_id=' + localStorage.getItem('checkWebsite');
        $.ajax({
            type: 'GET',
            url: url,
            success: (res) => {
                if (res.status === 'success' && res.data.length > 0) {
                    res.data.forEach(ele => {
                        $('#columns-select').append(new Option(ele.title, ele.columns_id))
                    })

                }

                layui.form.render('select')
            },
            fail: (err) => {
                layer.msg(err, { icon: 2 });
            }
        })
    }

    selectColumns();

    // 查询该网站下作者
    function selectAuthor() {
        $.ajax({
            type: 'GET',
            url: '/author/findall',
            success: (res) => {
                if (res.status === 'success' && res.data.length > 0) {
                    res.data.forEach(ele => {
                        $('#author-select').append(new Option(ele.name, ele.author_id))
                    })

                    layui.form.render('select')
                }
            },
            fail: (err) => {
                layer.msg(err, { icon: 2 })
            }

        })
    }
    selectAuthor();
    // 监听当前页面离开
    window.onbeforeunload = function (e) {
        window.localStorage.removeItem('edit_article_id');
    }
}())
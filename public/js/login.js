(function () {
    $('.close').on('click', function (c) {
        $('.login-form').fadeOut('slow', function (c) {
            $('.login-form').remove();
        });
    });

    layui.use(['layer'], function () {
        function signin() {
            let username = $('input.username').val();
            let password = $('input.password').val();

            if (!username || !password || username.trim().length === 0 || password.trim().length === 0) {
                return;
            }

            $.ajax({
                type: 'POST',
                url: '/sign/login',
                dataType: 'json',
                data: {
                    account: username,
                    password: password
                },
                success: (res) => {
                    if (res.status === 'success') {
                        sessionStorage.setItem('_PA_userInfo', JSON.stringify(res.data));
                        window.location.replace('/article-list');

                        return;
                    }

                    layui.layer.msg('账号或密码错误，请重试！')

                },
                fail: (err) => {
                    layui.layer.msg(err)
                }

            })
        }


        // 点击按钮执行
        $('.signin').on('click', signin)

        // 监听键盘按下enter键
        $(document).keydown(function (event) {

            if (event.keyCode === 13) {
                signin();
            }
        })
    })

}())
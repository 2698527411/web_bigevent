$(function () {
    // 调用
    getuserinfo()

    var layer = layui.layer
    $("#btnlogout").on('click', function () {
        // console.log('1');
        layer.confirm('是否确定退出？', {icon: 3, title:'提示'}, function(index){
            //do something
            // console.log('1');
            // 1.清空本地存储的  token
            localStorage.removeItem('token')
            // 2.跳转到登录页面
            location.href = '/login.html'
            // 关闭confirm询问框
            layer.close(index);
          });
    })
})
// 获取用户的基本信息
function getuserinfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers 就是请求头 配置对象
        // headers: {
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用renderAvatar 渲染用户头像
            renderAvatar(res.data)
        }
    })
}
// 渲染用户头像
function renderAvatar(user) {
    // 1.获取用户头像
    var name = user.nickname || user.username
    // 2.设置欢迎文本
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name)
    // 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1.渲染图片头像
        $(".layui-nav-img").attr('src', user.user_pic).show()
        $(".text-avatar").hide()
    } else {
        // 3.2渲染文本头像
        var first = name[0].toUpperCase()
        $(".text-avatar").html(first).show()
        $(".layui-nav-img").hide()
    }
}
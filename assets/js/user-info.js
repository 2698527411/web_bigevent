$(function () {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname: function(value){
            if (value.length > 6) {
                return '昵称必须在1-6个字符之间！'
            }
        }
    })
    // 初始化用户的基本信息
    inituserinfo()
    function inituserinfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("获取用户信息失败！")
                }
                console.log(res);
                // 调用 form.val()
                form.val('formuserinfo',res.data)
            }
        })
    }
    // 重置表单的数据
    $("#btnreset").on("click", function (e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        inituserinfo()
    })
    // 监听表单的提交
    $(".layui-form").on("click", function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("更新用户信息失败！")
                }
                layer.msg("更新用户信息成功！")
                // 调用父页面中的方法，重新渲染用户头像和信息
                window.parent.getuserinfo()
            }
        })
    })
})
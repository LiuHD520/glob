;(function(){
    $.global_AjaxUrl = "";
    // 查询用户信息
    $.ajax({
        type: "POST",
        async: false,
        url: $.global_AjaxUrl + "/admin/look_up_userinfo",
        data: {
            'username': $.cookie('username'),
        },
        success: function (dat) {
            console.log(dat);
            $.rootlevel = dat.result.data[0].rootlevel;
        },
        error: function (error) {
            console.log(error);
        }
    });
    console.log($.rootlevel);
})();
// 首页banners背景图片
$.ajax({
  type: "GET",
  url: $.global_AjaxUrl + "/get_banners_backgroundsrc",
  dataType: "json",
  success: function(dat) {
      
      var res = dat.result.data[0].background_src;
      console.log(res);
      $(".slider_bg").css({
          "background": `url(${res}) no-repeat`,
          "background-size": "100%"
      });
  },
  error: function(error) {
    console.log(error);
  }
});
// 首页banners
$.ajax({
    type: "GET",
    url: $.global_AjaxUrl + '/get_banners',
    dataType: "json",
    success:function(dat){
        console.log(dat);
        var res = dat.result.data;
        var str = '';
        res.forEach(function (obj) {
        str += `<div class="da-slide">
                        <h2>${obj.title}</h2>
                        <p>${obj.description}</span></p>
                        <h3 class="da-link"><a href="single-page.html?${obj.id}" class="fa-btn btn-1 btn-1e">文章详情</a></h3>
                    </div>`;
        }); 
        $('.container-append').html(str);

        $("#da-slider").cslider({
            autoplay: true,
            bgincrement: 450
        });
    },
    error:function(error){
        console.log(error);
    }
});

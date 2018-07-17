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

// 首页index_nav
$.ajax({
    type: "GET",
    url: $.global_AjaxUrl + '/index_nav',
    dataType: "json",
    success:function(dat){
        console.log(dat);
        var res = dat.result.data;
        var str = '';
        res.forEach(function (obj) {
        str += `<div class="col-md-3 images_1_of_4 text-center">
                    <span class="bg"><img src="${obj.src}" alt="" class="img-responsive"></span>
                    <h4><a href="javascript:;">${obj.title}</a></h4>
                    <p class="para">${obj.intro}</p>
                    <a href="single-page02.html?${obj.id}" class="fa-btn btn-1 btn-1e">查看详情</a>
                </div>`;
        }); 
        $('.index-nav-ajax').html(str);
    },
    error:function(error){
        console.log(error);
    }
});
// index_main_artcle
$.ajax({
    type: "GET",
    url: $.global_AjaxUrl + '/index_main_artcle',
    dataType: "json",
    success:function(dat){
        console.log(dat);
        var res = dat.result.data;
        var str = '';
        res.forEach(function (obj) {
        str += `<div class="col-md-6 content_left">
                    <img src="${obj.src}" alt="" class="img-responsive">
                </div>
                <div class="col-md-6 content_right">
                    <h4>${obj.geyan}</h4>
                    <p class="para">${obj.index_main}</p>
                    <a href="myself.html" class="fa-btn btn-1 btn-1e">关于-我</a>
                </div>`;
        }); 
        $('.index-main-mine').html(str);
    },
    error:function(error){
        console.log(error);
    }
});


//index_bottom
$.ajax({
    type: "GET",
    url: $.global_AjaxUrl + '/index_bottom',
    dataType: "json",
    success:function(dat){
        console.log(dat);
        var res = dat.result.data;
        var str = '';
        res.forEach(function (obj) {
        str += `<div class="item">
                    <div class="cau_left">
                        <img class="lazyOwl" data-src="${obj.src}" alt="Lazy Owl Image">
                    </div>
                    <div class="cau_left">
                        <h4><a href="${obj.href}" target="_blank">${obj.title}</a></h4>
                        <p>${obj.intro}</p>
                    </div>
                </div>`;
        }); 
        $('.index-bottom-ajax').html(str);
        $("#owl-demo").owlCarousel({
			items: 4,
			lazyLoad: true,
			autoPlay: true,
			navigation: true,
			navigationText: ["", ""],
			rewindNav: false,
			scrollPerPage: false,
			pagination: false,
			paginationNumbers: false,
		});
    },
    error:function(error){
        console.log(error);
    }
    
});



$(document).on('click', '.search-button', function(){
    var valu = $('.search-value').val();
    console.log(valu)
    window.location.href = "searchPage.html?" + valu + '?';
})
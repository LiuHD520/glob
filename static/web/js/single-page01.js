var typeId = window.location.href.split('?')[1];   // 获取url
typeId = decodeURI(typeId);   // 解码
// 文章详情
$.ajax({
  type: "GET",
  url: $.global_AjaxUrl + "/get_banners_content",
  data: {
    id: typeId
  },
  dataType: "json",
  success: function(dat) {
    console.log(dat);
    var res = dat.result.data[0];
    console.log(res);
    var str1 = `<h2>${res.description}</h2><img src="${res.src}" alt="" class="img-responsive"/>`;
    var str2 = res.article.replace(/^/gm, '<p class="para">').replace(/$/gm, '</p>');
    var str3 = `<a href="javascript:;" onclick="javascript:history.back(-1);" class="fa-btn btn-1 btn-1e">返回</a>`;
    $('.ajaxcontent').append(str1+str2+str3);
  },
  error: function(error) {
    console.log(error);
  }
});


$(document).on('click', '.search-button', function(){
  var valu = $('.search-value').val();
  console.log(valu)
  window.location.href = "searchPage.html?" + valu + '?';
})
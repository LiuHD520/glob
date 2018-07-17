var typeId = window.location.href.split('?')[1];   // 获取url
typeId = decodeURI(typeId);   // 解码
// 个人详情
$.ajax({
  type: "GET",
  url: $.global_AjaxUrl + "/index_main_artcle",
  data: {
    id: typeId
  },
  dataType: "json",
  success: function(dat) {
    console.log(dat);
    var res = dat.result.data[0];
    console.log(res);
    var str1 = `<h2>${res.geyan}</h2><img src="${res.child_src}" alt="" class="img-responsive"/>`;
    var str2 = res.content.replace(/^/gm, '<p class="para">').replace(/$/gm, '</p>');
    var str3 = `<a href="javascript:;" onclick="javascript:history.back(-1);" class="fa-btn btn-1 btn-1e">返回</a>`;
    $('.ajaxcontent').append(str1+str2+str3);
  },
  error: function(error) {
    console.log(error);
  }
});
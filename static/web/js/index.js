;(function(){
    $.ajax({
      type: "GET",
      url: "http://localhost:8080/get_banners",
      data: {},
      dataType: "json",
      success: function(data) {
          console.log(data)
      }
    });

    $.ajax({
      type: "GET",
      url: "http://localhost:8080/get_custom_evaluations",
      data: {},
      dataType: "json",
      success: function(data) {
        console.log(data);
      }
    });
})();
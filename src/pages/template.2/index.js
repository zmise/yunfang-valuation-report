// Package("com.qfang.dictionary.assess.user.assessUserCreate")
// var vm;
// function show(content, duration, isCenter, animateIn, animateOut) {
//     var animateIn = animateIn || 'fadeIn';
//     var animateOut = animateOut || 'fadeOut';
//     if (!content || !content.length) {
//         return;
//     }
//     var duration = duration || 1000;
//     var isCenter = isCenter || false;
//     $('body').toast({
//         position: 'absolute',
//         animateIn: animateIn,
//         animateOut: animateOut,
//         content: content,
//         duration: duration,
//         isCenter: isCenter,
//         padding: '0.2em 0.5em',
//         background: 'rgba(181, 185, 190, 0.8)',
//         borderRadius: '.31em',
//         fontSize: '.24em',
//         top: '0',
//     });
// }
// function dealObjectValue(obj) {
//     var param = {};
//     if (obj === null || obj === undefined || obj === "") return param;
//     for (var key in obj) {
//         if ($.type(obj[key]) === "Object") {
//             param[key] = dealObjectValue(obj[key]);
//         } else if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
//             param[key] = obj[key];
//         }
//     }
//     return param;
// };
// com.qfang.dictionary.assess.user.assessUserCreate = {
//     init: function () {
//         window._cqdauauc = com.qfang.dictionary.assess.user.assessUserCreate;
//     },
//     save: function () {
//         var data = vm.user;

//         if (data.company.id == '') {
//             show('请选择公司');
//             return;
//         }

//         data = JSON.stringify(dealObjectValue(data));
//         // console.log(data);
//         $.ajax({
//             url: '/qfang-dictionary/assess/user/save.json',
//             type: 'POST',
//             dataType: 'JSON',
//             data: data,
//             contentType: "application/json; charset=utf-8",
//             success: function (res) {
//                 if (res.status) {
//                     show(res.errDesc);
//                     return
//                 }
//                 show('保存成功');
//                 setTimeout(() => {
//                     art.dialog.close();
//                 }, 1000);
//             },
//             error: function (XMLHttpRequest, textStatus, errorThrown) {
//                 show('服务器出问题');
//             }
//         });
//     }
// }
$(function () {
  var data = {};

  var vm = new Vue({
    el: '#createForm',
    data: data,
    mounted() { this.init(); },
    methods: {
      init() {

      },
      ajax(url, data, callback) {
        var that = this;
        $.ajax({
          url: url,
          type: data == null ? 'GET' : 'POST',
          dataType: "json",
          data: data == null ? '' : JSON.parse(JSON.stringify(data)),
          async: true,
          // contentType: "application/json",
          success: function (resp) {
            if (resp && resp.status) {
              that.show(resp.errDesc);
            }
            callback(resp);
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            that.show('服务器出问题');
          }
        });
      },

      ajaxPromise(url, data, callback) {
        var that = this;
        var p = new Promise(function (resolve, reject) {
          $.ajax({
            url: url,
            type: data == null ? 'GET' : 'POST',
            dataType: "json",
            data: data == null ? '' : JSON.parse(JSON.stringify(data)),
            async: false,
            // contentType: "application/json",
            success: function (resp) {
              callback(resp);
              if (resp && resp.status) {
                that.show(resp.errDesc);
                resolve(false);
              } else {
                resolve(true);
              }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
              console.log(XMLHttpRequest);
              reject(false);
              that.show('服务器出问题');
            }
          });
        });
        return p;
      },


      show(content, duration, isCenter, animateIn, animateOut) {
        var animateIn = animateIn || 'fadeIn';
        var animateOut = animateOut || 'fadeOut';
        if (!content || !content.length) {
          return;
        }
        var duration = duration || 1000;
        var isCenter = isCenter || false;
        $('body').toast({
          position: 'absolute',
          animateIn: animateIn,
          animateOut: animateOut,
          content: content,
          duration: duration,
          isCenter: isCenter,
          padding: '0.2em 0.5em',
          background: 'rgba(181, 185, 190, 0.8)',
          borderRadius: '.31em',
          fontSize: '.24em',
          top: '0',
        });
      },
    }
  });

  function save() {
    var data = vm.user;
    if (data.company.id == '') {
      show('请选择公司');
      return;
    }
    $.ajax({
      url: '/qfang-dictionary/assess/user/save.json',
      type: 'POST',
      dataType: 'JSON',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function (res) {
        if (res.status) {
          show(res.errDesc);
          return
        }
        show('保存成功');
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        show('服务器出问题');
      }
    });
  }

  function show(content, duration, isCenter, animateIn, animateOut) {
    var animateIn = animateIn || 'fadeIn';
    var animateOut = animateOut || 'fadeOut';
    if (!content || !content.length) {
      return;
    }
    var duration = duration || 1000;
    var isCenter = isCenter || false;
    $('body').toast({
      position: 'absolute',
      animateIn: animateIn,
      animateOut: animateOut,
      content: content,
      duration: duration,
      isCenter: isCenter,
      padding: '0.2em 0.5em',
      background: 'rgba(181, 185, 190, 0.8)',
      borderRadius: '.31em',
      fontSize: '.24em',
      top: '0',
    });
  }


});

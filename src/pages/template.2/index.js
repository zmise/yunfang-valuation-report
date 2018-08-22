$(function () {
  var data = {};

  var vm = new Vue({
    el: '#vm',
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
              that.show(resp.errors[0].errorDesc);
            }
            callback(resp);
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            that.show('服务器出问题');
            that.isCount = true;
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
                that.show(resp.errors[0].errorDesc);
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

});

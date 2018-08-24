$(function () {
  var pageType = $('#pageType').val() || '';
  var id = '';

  var data = {
    disabled: false,
    // cityList: [ //城市
    //   {
    //     id: '城市id',
    //     name: '城市中文名称'
    //   }
    // ],
    cityList: [],
    // propertyTypeList: [ //面向用途
    //   {
    //     name: 'BUSINESS',
    //     desc: '商业'
    //   }
    // ],
    // "companyList": [

    //   {

    //     "id": "公司id",

    //     "name": "公司名称"

    //   }

    // ]
    companyList: [],
    propertyTypeList: [],
    loanConfig: {
      city: {
        id: '' //'城市id'
      },
      company: {
        id: '' // 'zmise'
      },
      name: '',// '名称',
      propertyType: '', // '面向用途',
      taxStatusIncrement: 0, //增值税状态1有效0无效，下同
      taxStatusCityBuild: 0, //城市维护建设税状态
      taxStatusEducation: 0, //教育附加税状态
      taxStatusPersonal: 0, //个人所得税状态
      taxStatusCompany: 0, //企业所得税状态
      taxStatusTrade: 0, //交易手续费状态
      taxStatusDeed: 0, //契税状态
      taxStatusStamp: 0, //印花税状态
      taxStatusLand: 0, //土地增值税状态
      taxStatusAuction: 0, //拍卖费状态
      taxStatusLitigation: 0, //诉讼税状态
      taxStatusTransferRegister: 0, //转移登记费状态
      taxStatusFair: 0, //公正税状态
      status: 1 //状态
    }
  };

  var vm = new Vue({
    el: '#createForm',
    data: data,
    mounted() { this.init(); },
    methods: {
      init() {
        var that = this;
        var data = null;
        if (id) {
          data.id = id;
        }
        this.ajax('/qfang-dictionary/assess/loanConfig/info.json', data, function (res) {
          if (res.data) {
            // console.log(res);
            that.cityList = res.data.cityList;
            that.propertyTypeList = res.data.propertyTypeList;

            if (data != null) {
              that.loanConfig = res.data.loanConfig;
            }
          }
        });
      },
      getCompany() {
        var that = this;
        var data = {
          cityId: that.loanConfig.city.id
        }

        this.ajax('/qfang-dictionary/assess/company/getCompanyListByCity.json', null, function (res) {
          if (res.data) {
            // console.log(res);
            that.companyList = res.data.companyList;
          }
        });
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
    if (data.phone == '') {
      show('电话号不能为空！');
      return;
    }
    if (data.name == '') {
      show('姓名和电话不匹配，请重新输入电话号！');
      return;
    }
    if (data.position.id == '') {
      show('请选择岗位');
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

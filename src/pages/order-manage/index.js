// Package("com.qfang.dictionary.assess.order.assessOrderCreate")
// var vm;
// function show(content, duration, isCenter, animateIn, animateOut) {
//   var animateIn = animateIn || 'fadeIn';
//   var animateOut = animateOut || 'fadeOut';
//   if (!content || !content.length) {
//       return;
//   }
//   var duration = duration || 1000;
//   var isCenter = isCenter || false;
//   $('body').toast({
//       position: 'absolute',
//       animateIn: animateIn,
//       animateOut: animateOut,
//       content: content,
//       duration: duration,
//       isCenter: isCenter,
//       padding: '0.2em 0.5em',
//       background: 'rgba(181, 185, 190, 0.8)',
//       borderRadius: '.31em',
//       fontSize: '.24em',
//       top: '0',
//   });
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
// com.qfang.dictionary.assess.order.assessOrderCreate = {
//     init: function () {
//         window._cqdauauc = com.qfang.dictionary.assess.order.assessOrderCreate;
//     },
//     save: function () {
//         var data = vm.order;

//         if (data.company.id == '') {
//             vm.show('请选择公司');
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
  // var id = $("#idInput").val() || '';
  //   var pageType = $("#pageType").val() || '';
  //   var cityId = $("#cityIdInput").val() || '';
  //   var city = $("#cityInput").val() || '';
  var id;
  var cityId;
  var city;
  var pageType;

  var data = {
    disabled: false,
    // "evaluationMethod": [ //评估方法
    //   {
    //     "name": "COMPARE",
    //     "desc": "比较法"
    //   }
    // ],
    evaluationMethod: [],

    // delegateCompanyList: [{  //委托渠道
    //   id: 123,
    //   name: '招商银行'
    // }],
    delegateCompanyList: [],

    // receiveOrderUserList: [{  //接单人
    //   id: 123,
    //   name: '张三'
    // }],
    receiveOrderUserList: [],

    // evaluationUserList: [{  //评估师
    //   id: 123,
    //   name: '张三'
    // }],
    evaluationUserList: [],

    // cityList: [{   //城市
    //   id: 123,
    //   name: '深圳'
    // }],
    cityList: [],

    // propertyTypeList: [{   //房屋用途
    //   name: 'ABCDE',
    //   desc: '住宅'
    // }],
    propertyTypeList: [],

    // directionList: [{  //朝向
    //   name: 'SOUTHWEST',
    //   desc: '西南'
    // }],
    directionList: [],

    // decorationList: [{  //装修状况
    //   name: 'LUXURY',
    //   desc: '豪华装修'
    // }],
    decorationList: [],

    // useStateList: [{  //使用状况
    //   name: 'RENT',
    //   desc: '出租'
    // }],
    useStateList: [],

    // maintainStateList: [{  //维护状况
    //   name: 'GOOD',
    //   desc: '良好'
    // }],
    maintainStateList: [],

    // propertyRightTypeList: [{  //产权类型
    //   name: 'PERSONAL_RIGHT',
    //   desc: '个人产权'
    // }],
    propertyRightTypeList: [],

    // taxCalMethodList: [{   //个税计算方式
    //   name: 'HE_DING',
    //   desc: '核定'
    // }],
    taxCalMethodList: [],

    // loanBankList: [{  //贷款银行
    //   id: 123,
    //   name: '招商银行'
    // }],
    loanBankList: [],

    // loanList: [{  //贷款产品
    //   id: 123,
    //   name: '招商银行'
    // }],
    loanList: [],

    // outerWallList: [{  //外墙
    //   name: 'DRY_WALL',
    //   desc: '清水墙'
    // }],
    outerWallList: [],

    // innerWallList: [{  //内墙
    //   name: 'DRY_WALL',
    //   desc: '清水墙'
    // }],
    innerWallList: [],

    // ceilingList: [{  //天花板
    //   name: 'DRY_WALL',
    //   desc: '清水墙'
    // }],
    ceilingList: [],

    // groundTypeList: [{ //地面
    //   name: 'DRY_WALL',
    //   desc: '清水墙'
    // }],
    groundTypeList: [],

    // doorTypeList: [  //门
    //   {
    //     name: 'DRY_WALL',
    //     desc: '清水墙'
    //   },
    //   {
    //     name: 'DRY_WALL',
    //     desc: '清水墙'
    //   },

    // ],
    doorTypeList: [],

    // windowTypeList: [  //窗
    //   {
    //     name: 'DRY_WALL',
    //     desc: '清水墙'
    //   }
    // ],
    windowTypeList: [],

    //具体订单信息
    order: {
      orderNum: '', //'单据编号',
      evaluationMethod: '', // '评估方法',
      delegateCompany: {  //委托渠道
        id: ''
      },
      delegatePersonName: '', // '委托人姓名',
      delegatePersonPhone: '', // '委托人电话',
      receiveOrderUser: {  //接单人
        id: ''
      },
      evaluationUser: {   //评估师
        id: ''
      },
      evaluationTime: '', // '估价时点',
      delegateRemark: '', //'备注',
      city: {
        id: ''
      },
      area: {
        id: ''
      },
      geographyArea: {
        id: ''
      },
      garden: {
        id: ''
      },
      building: {
        id: ''
      },
      floor: {
        id: ''
      },
      room: {
        id: ''
      },
      gardenName: '', //'楼盘名称',
      elevatorNum: '',   //几梯（梯户比）
      householdNum: '',  //几户（梯户比）
      gardenAddress: '', //'详细地址',
      propertyType: '', //'房屋用途',
      highestFloor: '',  //最高楼层
      propertyFloor: '',  //物业楼层
      direction: '', //'朝向',
      buildArea: '',  //建筑面积
      roomArea: '',   //套内面积
      factPropertyType: '', // '实际用途',
      completionTime: '', // '竣工日期',
      purchaseTime: '', //'购买日期',
      registerTime: '', //'登记日期',
      decoration: '', //'装修状况',
      useState: '', //'使用状况',
      maintainState: '', //'维护状况',
      propertyRightType: '', //'产权类型',
      isTwoYear: 1,   //是否满2年，1是0否
      taxCalMethod: '', //'个税计算方式',
      loanBank: {   //贷款银行
        id: ''
      },
      loan: {   //贷款产品
        id: ''
      },

      registerPrice: '', //'登记价',
      parcelNum: '', //'宗地号',
      parcelArea: '',   //宗地面积
      parcelPropertyType: '', // '宗地用途',
      parcelServiceLife: '', //'宗地使用年限',
      parcelStartUseTime: '', // '宗地开始使用日期',
      parcelEndUseTime: '', //'宗地终止使用日期',
      houseImageUrl: '', //'房产图片url',
      realExplorationTime: '', //'实勘日期',
      outerWall: '', //'外墙',
      innerWall: '', //'内墙',
      ceiling: '', //'天花板',
      livingRoomGround: '', //'客厅地面',
      bedRoomGround: '', //'房间地面',
      innerDoor: '', //'入户门(多选)',
      roomDoor: '', //'房门（多选）',
      window: '', //'窗',
      kitchenGround: '', //'厨房地面',
      kitchenInnerWall: '', // '厨房内墙',
      kitchenCeiling: '', //'厨房天花板',
      toiletGround: '', //'卫生间地面',
      toiletInnerWall: '', //'卫生间内墙',
      toiletCeiling: '', //'卫生间天花板',
      realExplorationImageUrl: '', //'实勘照片url',
      realExplorationRemark: '', //'实勘备注'
    },
    ownerInfoList: [   //用户信息数组
      {
        id: '',
        city: {
          id: '', //'城市id'
        },
        order: {
          id: '', //'订单id'
        },

        name: '', //'姓名',
        proportion: '', //'产权比例',
        idNum: '', //'身份证或护照号'
      }
    ],
    // ownerInfoList:[],

    // factPropertyTypeList: [{   //实际用途
    //   name: 'ABCDE',
    //   desc: '住宅'
    // }],
    // factPropertyTypeList:[],

    // areaList: [{   //区域
    //   id: 123,
    //   name: '南山'
    // }],
    areaList: [],  //区域
    geoList: [],  //片区

  };

  var vm = new Vue({
    el: '#createForm',
    data: data,
    mounted() { this.init(); },
    methods: {
      init() {
        var that = this;
        var data = null;
        // if (id) {
        //   data = {
        //     id,
        //     cityId,
        //     city,
        //   }
        // } else {
        //   data = {
        //     cityId,
        //     city,
        //   }
        // }
        this.ajax('/qfang-dictionary/assess/order/info.json', data, function (res) {
          if (res.data) {
            that.evaluationMethod = res.data.evaluationMethod;
            that.delegateCompanyList = res.data.delegateCompanyList;
            that.receiveOrderUserList = res.data.receiveOrderUserList;
            that.evaluationUserList = res.data.evaluationUserList;
            that.cityList = res.data.cityList;
            that.propertyTypeList = res.data.propertyTypeList;
            that.directionList = res.data.directionList;
            that.decorationList = res.data.decorationList;
            that.useStateList = res.data.useStateList;
            that.maintainStateList = res.data.maintainStateList;
            that.propertyRightTypeList = res.data.propertyRightTypeList;
            that.taxCalMethodList = res.data.taxCalMethodList;
            that.loanBankList = res.data.loanBankList;
            that.loanList = res.data.loanList;
            that.outerWallList = res.data.outerWallList;
            that.innerWallList = res.data.innerWallList;
            that.ceilingList = res.data.ceilingList;
            that.groundTypeList = res.data.groundTypeList;
            that.doorTypeList = res.data.doorTypeList;
            that.windowTypeList = res.data.windowTypeList;
            if (data != null) {
              that.user = res.data.user;
            }
          }
        });
      },

      // 初始化区域
      initArea() {
        var that = this;
        that.areaList = [];
        that.order.area.id = '';
        that.geoList = [];
        that.order.geographyArea.id = '';
        if (that.order.city.id === '') {
          that.show('请选择城市');
          return;
        }
        var data = {
          type: 2,
          parentId: that.order.city.id
        }
        this.ajax('/qfang-dictionary/area/areaList.json', data, function (res) {
          if (res.data) {
            that.areaList = res.data;
          }
        });
      },
      // 初始化片区
      initGeo() {
        var that = this;
        that.geoList = [];
        that.order.geographyArea.id = '';
        if (that.order.area.id === '') {
          that.show('请选择城市');
          return;
        }
        var data = {
          type: 3,
          parentId: that.order.area.id
        }
        this.ajax('/qfang-dictionary/area/areaList.json', data, function (res) {
          if (res.data) {
            that.geoList = res.data;
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
    },
    watch: {
      'order.innerDoor'(val) {
        console.log(val)
      }
    },
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

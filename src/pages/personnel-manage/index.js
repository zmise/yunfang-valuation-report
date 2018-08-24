$(function () {

  var id;
  var pageType;

  var data = {
    disabled: false,
    // "companyList": [ //公司
    //   {
    //     "id": "公司id",
    //     "name": "公司名称"
    //   }
    // ],
    companyList: [],

    // positionList: [{
    //   id: '', //岗位id,
    //   name: '', // 岗位名称
    // }],
    positionList: [],
    // degreeList: [
    //   {
    //     name: HIGH_SCHOOL,
    //     desc: '高中'
    //   }
    // ],
    degreeList: [],

    // statusList: [ //状态
    //   {
    //     name: ON_GUARD,
    //     desc: '在职'
    //   }
    // ],
    statusList: [],

    // sexList: [
    //   {
    //     name: MALE,
    //     desc: '男'
    //   }
    // ],
    sexList: [],

    // certTypeList: [ //证书类型
    //   {
    //     name: LAND_APPRAISER,
    //     desc: '土地估价师'
    //   }
    // ],
    certTypeList: [],
    user: {
      phone: '', // 电话,
      name: '', //姓名,
      idCardNum: '', //身份证,
      passportNum: '', //护照,
      company: {
        id: ''//公司id
      },
      position: {
        id: '', //岗位id
      },
      photoUrl: '', // 头像地址,
      degree: '', //学历，对应degreeList的name，如：HIGH_SCHOOL,
      status: '', // 状态，对应statusList的name，如：ON_GUARD,
      createTime: '', //入职日期，需要什么格式跟我说,
      sex: '', //性别，对应sexList的name，如：MALE,
      folk: '', //民族,
      domicile: '', //户口所在地,
      certType: '', //证书类型，对应certTypeList的name，如：LAND_APPRAISER,
      certRegisterNum: '', //注册号,
      certValidTime: '', //有效期，格式？,
      haveStamp: '', //1, //是否有章，1是0否
      certNum: '', //证书编号,
      certSecretNum: '', //密钥编码,
      certSecretPassword: '', // 密钥密码,
      punishmentNum: '', //2, //处分次数
      certAttachUrl: '', //证书附件地址,
      certRemark: '', //备注,
      sosPersonName: '', //紧急联系人,
      sosRelationship: '', //关系,
      sosPersonPhone: '', //联系电话,
      openAccountBank: '', //开户银行,
      openAccountBankNum: '', // 银行账号,
      socialSecurityNum: '', //社保电脑号,
      openAccountCity: '', //开户城市
    }

  }

  var vm = new Vue({
    el: '#vm',
    data: data,
    computed: {
      //身份证or护照
      passPortIdCardNum: function () {
        return this.idCardNum === '' ? this.passportNum : this.idCardNum
      },

    },
    mounted() {
      this.init();
      // pageType  "view" "create" "edit" 打开状态
      if (pageType === 'view') {
        this.disabled = true;
      }
    },
    methods: {
      init() {
        var that = this;
        var data = null;
        if (id) {
          data = {
            id: id,
          }
        }
        this.ajax('/qfang-dictionary/assess/user/info.json', data, function (res) {
          if (res.data) {
            // console.log(res);
            that.companyList = res.data.companyList;
            that.positionList = res.data.positionList;
            that.degreeList = res.data.degreeList;
            that.statusList = res.data.statusList;
            that.sexList = res.data.sexList;
            that.certTypeList = res.data.certTypeList;
            if (data != null) {
              that.user = res.data.user;
            }
          }
        });
      },
      // 获取姓名
      getName(event) {
        var that = this;
        // 正则匹配
        that.numRgx(event);
        if (that.user.phone.length === 11) {
          this.ajax('/qfang-dictionary/assess/user/getName.json', null, function (res) {
            if (res.data) {
              that.show('zmise');
              that.user.name = res.data.name;
            }
          });
        }

      },
      // 正则正整数
      numRgx(event) {
        if (event.target.value.length == 1) {
          event.target.value = event.target.value.replace(/[^0-9]/g, '')
        } else {
          event.target.value = event.target.value.replace(/\D/g, '')
        }
        this.user.phone = event.target.value;
      },
      // 上传图片
      uploadImg(e) {
        // console.log(e.target.files);
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
          return;
        }
        this.createImage(files[0]);

      },
      createImage(file) {
        console.log(file)
        var image = new Image();
        var reader = new FileReader();
        var that = this;

        reader.onload = (e) => {
          console.log(e.target.result);
          that.user.photoUrl = e.target.result;
        };
        // reader.readAsDataURL(file);
        console.log(that.user.photoUrl);

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
            that.isCount = true;
          }
        });
      },

      // ajaxPromise(url, data, callback) {
      //   var that = this;
      //   var p = new Promise(function (resolve, reject) {
      //     $.ajax({
      //       url: url,
      //       type: data == null ? 'GET' : 'POST',
      //       dataType: "json",
      //       data: data == null ? '' : JSON.parse(JSON.stringify(data)),
      //       async: false,
      //       // contentType: "application/json",
      //       success: function (resp) {
      //         callback(resp);
      //         if (resp && resp.status) {
      //           that.show(resp.errors[0].errorDesc);
      //           resolve(false);
      //         } else {
      //           resolve(true);
      //         }
      //       },
      //       error: function (XMLHttpRequest, textStatus, errorThrown) {
      //         console.log(XMLHttpRequest);
      //         reject(false);
      //         that.show('服务器出问题');
      //       }
      //     });
      //   });
      //   return p;
      // },


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

export default {
  /**
   * 邮编验证6位数字
   * @param {*} val
   */
   isPostcode(val) {
    return /^[0-9]{6}$/g.test(val);
  },
  /**
   * 判断是不是闰年
   * @param year
   */
   isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  },
  /**
   * [验证是否是正确身份证号码]
   * @param  {[type]}  num [description]
   * @return {Boolean}     [description]
   */
   isCardNum(code) {
    const arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // 加权因子
    const arrValid = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]; // 校验码
    if (/^\d{17}\d|x$/i.test(code)) {
      let sum = 0;
      // 对前17位数字与权值乘积求和
      for (let i = 0; i < code.length - 1; i++) {
        sum += parseInt(code.substr(i, 1), 10) * arrExp[i];
      }
      // 计算模（固定算法）
      const idx = sum % 11;
      // 检验第18为是否与校验码相等
      return arrValid[idx] == code.substr(17, 1).toUpperCase();
    }
    return false;
  },
  /**
   * [isPhone 验证手机号]
   * @param phone
   * @return {Boolean}
   */
   isPhone(phone) {
    const reg = /^1[3|6|4|5|7|8|9]\d{9}$/;
    return reg.test(phone);
  },
   /**
   * [isEmpty 检查是否为空]
   * @params {[number | string]} val
   * @return Booleans(true or false)
   **/
    isEmpty(val) {
      if (typeof val === 'string') {
        return !val.trim().length;
      } else if (!val) {
        return true;
      } else {
        return false;
      }
    },
      /**
   * [验证姓名：中英文，不允许同时存在中英文，姓名中可接受空格，逗号，点，中文名不少于一个汉字，英文名不少于4个英文字母]
   * @param  {[name]}  num [description]
   * @return {Boolean}     [description]
   */
  isName(name) {
    const reg = /^(([\u2E80-\u2FDF\u3040-\u318F\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FFF\uA960-\uA97F\uAC00-\uD7FF\·\．]){2,20}|[a-zA-Z\.\s\-]{4,40})$/; // 中日韩英可校验通过
    // const reg = /^(([\u4E00-\u9FFF]|[\u3400-\u4DB5]){2,20}|[a-zA-Z\.\s]{4,20})$/; // 只有中英文可以通过
    return reg.test(name);
  },
  isRealName(name) {
    let errorMessage = '';
    if (!/^(([\u2E80-\u2FDF\u3040-\u318F\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FFF\uA960-\uA97F\uAC00-\uD7FF\·\.\．]){1,}|[a-zA-Z\.\s\-]{1,})$/.test(name)) {
      errorMessage = '投保人姓名录入必须全部为英文或全部为中文，请您重新确认下';

    } else {
      if (/^([\u2E80-\u2FDF\u3040-\u318F\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FFF\uA960-\uA97F\uAC00-\uD7FF\·\.\．]{1,})$/.test(name)) {
        if (name.length < 2) {
          errorMessage = '中文姓名，需不少于两个汉字，如李明';
        } else if (name.length > 20) {
          errorMessage = '投保人姓名不可超过20个汉字';
        }
      } else {
        if (name.length < 4) {
          errorMessage = '英文姓名，需不少于四个英文字符，如Jane';
        } else if (name.length > 40) {
          errorMessage = '投保人姓名不可超过40个字符';
        }
      }
    }
    return errorMessage;
  },
  /**
   *通过身份证证判断是否成年
   * @param  18位身份证
   * @return  Boolean
   */
   isAdult(idCard) {
    if (idCard.length === 18) {
      let myDate = new Date();
      let birthYear = idCard.substring(6, 10) - 0;
      let birthMonth = idCard.substring(10, 12) - 0;
      let birthDay = idCard.substring(12, 14) - 0;
      if (myDate.getFullYear() - birthYear > 18) return true;
      if (myDate.getFullYear() - birthYear < 18) return false;
      if (myDate.getFullYear() - birthYear == 18) {
        if (myDate.getMonth() + 1 > birthMonth) return true;
        if (myDate.getMonth() + 1 < birthMonth) return false;
        if (myDate.getMonth() + 1 == birthMonth) {
          if (myDate.getDate() >= birthDay) return true;
          if (myDate.getDate() < birthDay) return false;
        }
      }
    } else if (/[0-9]{4}-[0-9]{2}-[0-9]{2}|[0-9]{4}\/[0-9]{2}\/[0-9]{2}/.test(idCard)) {
      let myDate = new Date();
      let birthYear = idCard.substring(0, 4) - 0;
      let birthMonth = idCard.substring(5, 7) - 0;
      let birthDay = idCard.substring(8, 10) - 0;
      if (myDate.getFullYear() - birthYear > 18) return true;
      if (myDate.getFullYear() - birthYear < 18) return false;
      if (myDate.getFullYear() - birthYear == 18) {
        if (myDate.getMonth() + 1 > birthMonth) return true;
        if (myDate.getMonth() + 1 < birthMonth) return false;
        if (myDate.getMonth() + 1 == birthMonth) {
          if (myDate.getDate() >= birthDay) return true;
          if (myDate.getDate() < birthDay) return false;
        }
      }
    } else {
      console.log('身份证号码不正确');
      return false;
    }
  },
  /**
   * [验证是否是正整数]
   * @param  {[type]}  num [description]
   * @return {Boolean}     [description]
   */
   isPositive: function(num) {
    var reg = new RegExp(/^[1-9]\d*$/);
    return reg.test(num);
  },
  /**
   * [isNum 是否是数字]
   * @param  {[number]}  val:验证的值
   * @return {Boolean}
   */
  isNum: function(val) {
    var reg = new RegExp(/^[0-9]*.$/);
    return reg.test(val);
  },
  /**
   * [isNum 是否是数字]
   * @param  {[string]}  val:验证的值,数字和字母，字符
   * @return {Boolean}
   */
  isPwd: function(pwd) {
    // var reg = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/); //字母和数字
    var reg = new RegExp(/(?=.*[a-zA-Z])(?=.*\d)^[\w\-~!@,#$%^&*/\.\'\;()+{}[\]:]{6,20}$/);
    return reg.test(pwd);
  },
  isNewPwd: function(pwd) {
    // var reg = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/); //字母和数字
    var reg = new RegExp(/(?=.*[a-zA-Z])(?=.*\d)^[\w\-~!@,#$%^&*/\.\'\;()+{}[\]:]{8,20}$/);
    return reg.test(pwd);
  },
  /**
   * [isEqual 两个值是否相等]
   * @param  {[number],[string]}  val1,val2:验证的值
   * @return {Boolean}
   */
  isEqual: function(val1, val2) {
    return val1 === val2;
  },
  /**
   * [isChinese 是中文返回true，不是中文返回false]
   * @param  {[string]}  val [description]
   * @return {Boolean}     [description]
   */
  isChinese: function(val) {
    var reg = new RegExp(/^[\u4e00-\u9fa5]+$/);
    return reg.test(val);
  },
  /**
   * [isChinesePast 如果含有中文返回true，没有中文返回false]
   * @param  {[string]}  val [description]
   * @return {Boolean}     [description]
   */
  isChinesePast: function(val) {
    var reg = new RegExp(/.*[\u4e00-\u9fa5]+.*$/);
    return reg.test(val);
  },
  /**
   * [isNumAndLetter 如果是字母或者数字返回true，如果不是字母或者数字返回false]
   * @param  {[string]}  val [description]
   * @return {Boolean}     [description]
   */
  isNumAndLetter: function(val) {
    var reg = new RegExp(/^[A-Za-z0-9]+$/);
    return reg.test(val);
  },
  /**
   * [isChineseAndOtherNum 返回长度，汉字占2个字符，非汉字占1个字符]
   * @param  {[string]}  val [description]
   * @return {Number}        [description]
   */
  isChineseAndOtherNum: function(val) {
    var sum = 0;
    for (var i = 0; i < val.length; i++) {
      var c = val.charCodeAt(i);
      if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
        sum++;
      } else {
        sum += 2;
      }
    }
    return sum;
  },
  isTel: function(tel) {
    var reg = new RegExp(/^0\d{2,3}-?\d{7,8}$/);
    if (reg.test(tel)) {
      return true;
    }
    return false;
  },
  /**
  [isEmail 检查邮箱是否正确]
  @params {[string]} email:邮箱地址
  @return Booleans
  **/
  isEmail: function(email) {
    var reg = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
    if (reg.test(email)) {
      return true;
    }
    return false;
  },
  /**
  [isEmail 检查银行卡号:不得少于16位且都是数字]
  @params {[string]} account:银行卡号
  @return Booleans
  **/
  isAccount: function(account) {
    var reg = new RegExp(/^\d{12,19}$/);
    if (reg.test(account)) {
      return true;
    }
    return false;
  },
  /**
   * 验证护照号码
   */
   isPassport(passport) {
    var reg = /^[0-9A-Za-z]{8,18}$/g;
    return reg.test(passport);
  },
  /**
   * 验证港澳居民来往大陆通行证
   */
  isReentryPermit(reentryPermit) {
    var reg = /^[H|M][0-9]{8}$/g;
    return reg.test(reentryPermit);
  },
  isReentryPermitNew(reentryPermit) {
    var reg = /^([H|M][0-9]{8}|[H|M][0-9]{10})$/g;
    return reg.test(reentryPermit);
  },
  /**
    验证台湾居民来往大陆通行证号码 规则=>台湾居民来往大陆通行证只能录入8位数字
    @cellSyndrome
   */
  isCellSyndrome(cellSyndrome) {
    var reg = /^[0-9]{8}$/g;
    return reg.test(cellSyndrome);
  },
  isCsz(name) {
    const reg = /^[A-Za-z]*[0-9]{9}$/;
    return reg.test(name);
  },
  // 出生证验证规则
  isBirthCode(number) {
    var reg = /^[A-Za-z][0-9]{9}$/g;
    return reg.test(number);
  },
  // 港澳居民居住证 (810000+8位出生日期+4位数字或字母 或  820000+8位出生日期+4位数字或字母)
  isHKMCLive(value) {
    var reg = /^(810000|820000)\d{8}[a-zA-Z0-9]{4}$/g;
    return reg.test(value);
  },
  // 台湾居民居住证 (830000+8位出生日期+4位数字或字母)
  isTWLive(value) {
    var reg = /^(830000)\d{8}[a-zA-Z0-9]{4}$/g;
    return reg.test(value);
  },
  // 外国人永久居留身份证 (15或18位的数字或字母)
  isForeignLongLive(value) {
    var reg = /^([a-zA-Z0-9]{15}|[a-zA-Z0-9]{18})$/g;
    return reg.test(value);
  },
  checkAddress(address) {
    let errorMessage = '';
    if (address.length < 7) {
      errorMessage = '详细地址长度不能低于7个字';
    } else if (!/^.+(村|街|路|道|弄|胡同|院|信箱|小区|号|房|室|栋|楼|幢).*$/.test(address)) {
      errorMessage = '详细地址需包含具体的村/街道/路/小区以及门牌号或房号，请您重写填写';
    }
    return errorMessage;
  }
}
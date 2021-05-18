export default {
  /**
   *[formatDate 格式化日期]
   @params {[string]} timestamp:时间戳, type: 返回格式 '/' or '-'
   @return 'YYYY-MM-DD' or 'YYYY/MM/DD'
   **/
   formatDate(timestamp, type) {
    let nowDate = timestamp ? new Date(timestamp) : new Date();
    const year = nowDate.getFullYear();
    let month = nowDate.getMonth() + 1;
    let day = nowDate.getDate();
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    if (type === '/') {
      return `${year}/${month}/${day}`;
    } else {
      return `${year}-${month}-${day}`;
    }
  },
  /*
   @param url参数
   @return
   */
   queryParam(param) {
    if (!window.location.search) return null;
    let params = window.location.search.split('?')[1].split('#')[0].split('&');
    let value;
    params.forEach(item => {
      if (item.indexOf('=') === -1) value = null;
      const temp = item.split('=');
      if (temp[0] === param) value = temp[1];
    });
    return value;
  },
  /*
   * @url location.href
   * @arr [] 要移除的参数
   * return location.href
   */
  spliceUrl(url, arr) {
    const params = url.split('?');
    let search = [];
    if (params.length > 1) {
      search = params[1].split('&');
      arr.forEach(item => {
        const index = search.findIndex(res => res.indexOf(item) !== -1);
        search.splice(index, 1);
      });
    }
    const urls = [params[0]];
    urls.push(search.join('&'));

    return urls.join('?');
  },
  /*
   图片压缩
   @param image type element
   @param quality type number [0-1]值越小，所绘制出的图像越模糊
   return base64 图片的base64编码  格式为 “data:image/png;base64,****”,
   */
   jpgCompress(image, quality) {
    let canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const _with = 1024;
    const r = image.naturalWidth / image.naturalHeight;

    canvas.width = _with;
    canvas.height = _with / r;
    ctx.drawImage(image, 0, 0, _with, _with / r);
    if (!quality || quality > 1 || quality < 0) {
      quality = 0.7;
    }
    /*
     1.canvas.toDataURL 返回的默认格式就是 image/png格式，如果第一个参数type是image/ jpeg的话，第二个参数encoderOptions就可以用来设置图片的压缩质量
     2.base64 的格式为 “data:image/png;base64,****”
     */
    return canvas.toDataURL('image/jpeg', quality || 0.7);
  },
  /*
   @param dataurl data:text/plain;base64,YWFhYWFhYQ==
   @return blob
   */
   dataURLtoBlob(dataurl) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
      type: mime
    });
  },
  // 格式化数量逗号间隔
  formatNum(str) {
    str += '';
    var newStr = '';
    var count = 0;

    if (str.indexOf('.') == -1) {
      for (var i = str.length - 1; i >= 0; i--) {
        if (count % 3 == 0 && count != 0) {
          newStr = str.charAt(i) + ',' + newStr;
        } else {
          newStr = str.charAt(i) + newStr;
        }
        count++;
      }
      return newStr;
    } else {
      for (var i = str.indexOf('.') - 1; i >= 0; i--) {
        if (count % 3 == 0 && count != 0) {
          newStr = str.charAt(i) + ',' + newStr;
        } else {
          newStr = str.charAt(i) + newStr;
        }
        count++;
      }
      return newStr + str.substr(str.indexOf('.'));
    }
  },
  /* 获取设备信息和平台信息
    @return {
      isWechat: true | false 是否是微信环境
      os:ios | android 当前操作系统
    }
  */
    getDeviceInfo() {
      var info = {};
      var ua = navigator.userAgent.toLowerCase();
      info.isWechat = navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1;
      // 判断是ios还是安卓
      if (/iphone|ipad|ipod/.test(ua)) {
        info.os = 'ios';
      } else if (/android/.test(ua)) {
        info.os = 'android';
      } else {
        info.os = 'other';
      }
      return info;
    },
    // 根据年龄计算相应出生日期
    setDate(age, limit) {
      let today = new Date();
      let date;
      let num;
      let lastStr;
      let _limit = limit || 'min';
      if (typeof age != 'string') {
        console.log(age);
        num = 0;
        lastStr = '';
      } else {
        lastStr = age.substr(age.length - 1, 1).toUpperCase();
        num = age.substr(0, age.length - 1) - 0;
      }
  
      switch (lastStr) {
        case 'D':
          if (num - 1 <= 0) {
            num = 0;
          } else {
            num = num - 1;
          }
          date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - num);
          break;
        case 'M':
          date = new Date(today.getFullYear(), today.getMonth() - num, today.getDate());
          break;
        case 'Y':
          let _day = today.getDate();
          if (_limit == 'max') {
            num = num + 1;
            _day = today.getDate() + 1;
          }
          date = new Date(today.getFullYear() - num, today.getMonth(), _day);
          break;
        default:
          date = new Date();
          break;
      }
      let month = date.getMonth() + 1,
        day = date.getDate();
      return date.getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
    },
    /**
     * [将数字保留2位小数点]
     * @param {value,num} [value传进来的数字，num保留的位数]
     * @return  [转换过后的值]
     */
    numberToFixed: function(value, num) {
      var powNum = Math.pow(10, num);
      var nString = Math.round(value * powNum) / powNum;
      var numString = nString.toString();
      var rs = numString.indexOf('.');
      if (rs < 0) {
        rs = numString.length;
        numString += '.';
      }
      while (numString.length <= rs + 2) {
        numString += '0';
      }
      return numString;
    },
    /**
     * @param  18位身份证
     * @return  [String]  => birthday:"生日"
     */
    getBirthday: function(idCard) {
      if (typeof idCard === 'string' && idCard.length === 18) {
        var birthdayStr = idCard.substring(6, 14);
        return (birthdayStr.substring(0, 4) + '-' + birthdayStr.substring(4, 6) + '-' + birthdayStr.substring(6, 8));
      } else {
        console.log('该方法只接受18位身份证号码');
      }
    },
    /**
     * @param  18位身份证
     * @return  [String]  => gender:"性别"
     */
    getGender: function(idCard) {
      if (typeof idCard === 'string' && idCard.length === 18) {
        return (idCard.substring(16, 17) % 2 === 1 ? '0' : '1');
      } else {
        console.log('该方法只接受18位身份证号码');
      }
    },
    /**
     * @param  yyyy-mm-dd
     * @return  string  age
     ps 周岁计算，生日当天加一岁
     */
    getAgeByBirthday(birthday) {
      let returnAge;
      const birthdayArr = birthday.split('-').map(item => +item);
      const [birthYear, birthMonth, birthDay] = birthdayArr;
  
      const nowDate = new Date();
      const nowYear = nowDate.getFullYear();
      const nowMonth = nowDate.getMonth() + 1;
      const nowDay = nowDate.getDate();
  
      if (nowYear === birthYear) {
        returnAge = '0'; // 同年 则为0岁
      } else {
        let ageDiff = nowYear - birthYear; // 年之差
        if (ageDiff > 0) {
          if (nowMonth === birthMonth) {
            let dayDiff = nowDay - birthDay; // 日之差
            if (dayDiff < 0) {
              if (birthMonth === 2 && birthDay === 29 && nowDay === 28 && !this.isLeapYear(nowYear)) {
                returnAge = ageDiff;
              } else {
                returnAge = ageDiff - 1;
              }
            } else {
              returnAge = ageDiff;
            }
          } else {
            let monthDiff = nowMonth - birthMonth; // 月之差
            returnAge = monthDiff < 0 ? ageDiff - 1 : ageDiff;
          }
        } else {
          returnAge = -1; // 返回-1 表示出生日期输入错误 晚于今天
        }
      }
      return returnAge; // 返回周岁年龄
    },
    getDays(userDate) {
      var nowDay = new Date();
      var userDay = new Date(userDate);
      var days = nowDay.getTime() - userDay.getTime();
      return Math.ceil(days / (1000 * 60 * 60 * 24));
    },
    /**
     * @param  18位身份证
     * @return  object  => {birthday:"生日",gender:"性别"}
     */
    getGBByID: function(idCard) {
      if (typeof idCard === 'string' && idCard.length === 18) {
        var birthdayStr = idCard.substring(6, 14);
        return {
          birthday: birthdayStr.substring(0, 4) + '-' + birthdayStr.substring(4, 6) + '-' + birthdayStr.substring(6, 8),
          gender: idCard.substring(16, 17) % 2 === 1 ? '0' : '1'
        };
      } else {
        console.log('该方法只接受18位身份证号码');
      }
    },
    // 拼接url
    joinUrl(location, params) {
      let url = location.hostname + location.pathname + '?';
      if (params) {
        Object.keys(params).forEach((item) => {
          url += `${item}=${params[item]}&`;
        });
      }
      url = url.slice(0, url.length - 1);
      return location.protocol + '//' + url;
    },
    // 拼接url2--location改造
    joinUrlIqiyi(location, params) {
      let url = location + '?';
      if (params) {
        Object.keys(params).forEach((item) => {
          url += `${item}=${params[item]}&`;
        });
      }
      url = url.slice(0, url.length - 1);
      return url;
    },
  
    digital(Num) { // 阿拉伯数字转换为简写汉字
      for (let i = Num.length - 1; i >= 0; i--) {
        Num = Num.replace(',', ''); // 替换Num中的“,”
        Num = Num.replace(' ', ''); // 替换Num中的空格
      }
      if (isNaN(Num)) { // 验证输入的字符是否为数字
        // alert("请检查小写金额是否正确");
        return;
      }
      // 字符处理完毕后开始转换，采用前后两部分分别转换
      var part = String(Num).split('.');
      var newchar = '';
      // 小数点前进行转化
      for (let i = part[0].length - 1; i >= 0; i--) {
        if (part[0].length > 10) {
          // alert("位数过大，无法计算");
          return '';
        } // 若数量超过拾亿单位，提示
        var tmpnewchar = '';
        var perchar = part[0].charAt(i);
        switch (perchar) {
          case '0':
            tmpnewchar = '零' + tmpnewchar;
            break;
          case '1':
            tmpnewchar = '一' + tmpnewchar;
            break;
          case '2':
            tmpnewchar = '二' + tmpnewchar;
            break;
          case '3':
            tmpnewchar = '三' + tmpnewchar;
            break;
          case '4':
            tmpnewchar = '四' + tmpnewchar;
            break;
          case '5':
            tmpnewchar = '五' + tmpnewchar;
            break;
          case '6':
            tmpnewchar = '六' + tmpnewchar;
            break;
          case '7':
            tmpnewchar = '七' + tmpnewchar;
            break;
          case '8':
            tmpnewchar = '八' + tmpnewchar;
            break;
          case '9':
            tmpnewchar = '九' + tmpnewchar;
            break;
        }
        switch (part[0].length - i - 1) {
          case 0:
            tmpnewchar = tmpnewchar;
            break;
          case 1:
            if (perchar != 0) tmpnewchar = tmpnewchar + '十';
            break;
          case 2:
            if (perchar != 0) tmpnewchar = tmpnewchar + '百';
            break;
          case 3:
            if (perchar != 0) tmpnewchar = tmpnewchar + '千';
            break;
          case 4:
            tmpnewchar = tmpnewchar + '万';
            break;
          case 5:
            if (perchar != 0) tmpnewchar = tmpnewchar + '十';
            break;
          case 6:
            if (perchar != 0) tmpnewchar = tmpnewchar + '百';
            break;
          case 7:
            if (perchar != 0) tmpnewchar = tmpnewchar + '千';
            break;
          case 8:
            tmpnewchar = tmpnewchar + '亿';
            break;
          case 9:
            tmpnewchar = tmpnewchar + '十';
            break;
        }
        newchar = tmpnewchar + newchar;
      }
      // 替换所有无用汉字，直到没有此类无用的数字为止
      while (newchar.search('零零') != -1 || newchar.search('零亿') != -1 || newchar.search('亿万') != -1 || newchar.search('零万') != -1) {
        newchar = newchar.replace('零亿', '亿');
        newchar = newchar.replace('亿万', '亿');
        newchar = newchar.replace('零万', '万');
        newchar = newchar.replace('零零', '零');
      }
      // 替换以“一十”开头的，为“十”
      if (newchar.indexOf('一十') == 0) {
        newchar = newchar.substr(1);
      }
      // 替换以“零”结尾的，为“”
      if (newchar.lastIndexOf('零') == newchar.length - 1) {
        newchar = newchar.substr(0, newchar.length - 1);
      }
      return newchar;
    },
    divis(arg1, arg2) { // js除法
      var t1 = 0;
      var t2 = 0;
      var r1, r2;
      try {
        t1 = arg1.toString().split('.')[1].length;
      } catch (e) {}
      try {
        t2 = arg2.toString().split('.')[1].length;
      } catch (e) {}
      r1 = Number(arg1.toString().replace('.', ''));
      r2 = Number(arg2.toString().replace('.', ''));
      return (r1 * Math.pow(10, t2 - t1) / r2);
    },
    add() { // 加法
      let list = [...arguments]
      let maxLength = 0; // 小数的最大位数
      let dealResult = 0
      list.forEach(item => {
        let mod = item.toString().split('.')[1]
        let num = mod ? mod.length : 0;
        if (num > maxLength) {
          maxLength = num
        }
      })
      let cm = Math.pow(10, maxLength)
      list.forEach(item => {
        let arg = Number(item)
        if (maxLength > 0) {
          arg = Number(item) * cm
        }
        console.log('arg', arg)
        dealResult += arg
      })
      console.log(list, 'maxLength', maxLength, 'dealResult', dealResult, dealResult / cm)
      return dealResult / cm;
    },
    mul(arg1, arg2) {
      var m = 0;
      var s1 = arg1.toString();
      var s2 = arg2.toString();
      try {
        m += s1.split('.')[1].length;
      } catch (e) {}
      try {
        m += s2.split('.')[1].length;
      } catch (e) {}
      return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
    },
    sub(arg1, arg2) { // js减法
      var r1, r2, m, n;
      try {
        r1 = arg1.toString().split('.')[1].length;
      } catch (e) {
        r1 = 0;
      }
      try {
        r2 = arg2.toString().split('.')[1].length;
      } catch (e) {
        r2 = 0;
      }
      m = Math.pow(10, Math.max(r1, r2)); // last modify by deeka //动态控制精度长度
      n = (r1 >= r2) ? r1 : r2;
      return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
    },
    // 将姓名中间部分替换成*号；
    formatName(name) {
      let newStr;
      if (name.length === 2) {
        newStr = name.substr(0, 1) + '*';
      } else if (name.length > 2) {
        let char = '';
        for (let i = 0, len = name.length - 2; i < len; i++) {
          char += '*';
        }
        newStr = name.substr(0, 1) + char + name.substr(-1, 1);
      } else {
        newStr = name;
      }
      return newStr;
    },
    // 手机号掩码显示
    formatPhone(str, frontLen, endLen) {
      var len = str.length - frontLen - endLen;
      var xing = '';
      for (var i = 0; i < len; i++) {
        xing += '*';
      }
      return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
    },
    // 过滤空字段
    // eg: { a: 232, b: 'rrr', c:''} => { a: 232, b: 'rrr'}
    filterEmptyFields(dist) {
      for (let i in dist) {
        if (!dist[i]) {
          delete dist[i];
        }
      }
      return dist;
    },
    /**
     * 判断是不是闰年
     * @param year
     */
    isLeapYear(year) {
      return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    },
    /*
     * 解决document.title 在 ios 下不生效bug方案
     */
    documentTitle() {
      const mobile = navigator.userAgent.toLowerCase();
      const length = document.querySelectorAll('iframe').length;
      if (/iphone|ipad|ipod/.test(mobile) && !length) {
        const iframe = document.createElement('iframe');
        iframe.style.cssText = 'display: none; width: 1px; height: 1px;';
        iframe.setAttribute('src', '../../assets/image/favicon.ico');
        iframe.addEventListener('load', () => {
          setTimeout(() => {
            iframe.removeEventListener('load', false);
            document.body.removeChild(iframe);
          }, 1000);
        });
        document.body.appendChild(iframe);
      }
    },
    deepClone(origin, target) {
      target = target || {};
      for (var prop in target) {
        if (target.hasOwnProperty(prop)) {
          if (target[prop] !== null && typeof target[prop] === 'object') {
    
            origin[prop] = Object.prototype.toString.call(target[prop]) === '[object Array]' ? [] : {};
    
            deepClone(origin[prop], target[prop]);
    
          } else {
            origin[prop] = target[prop];
          }
        }
      }
      return target;
    };
}
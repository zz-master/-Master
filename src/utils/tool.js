function checkPhone(tel) {
  var re = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;

  if (!tel) {
    return '手机号不能为空'
  }
  if (re.test(tel)) {
    return true
  }
  return '请输入正确的手机号'
}

function getCookie(name) {
  var strCookie = document.cookie
  var arrCookie = strCookie.split('; ')
  for (var i = 0; i < arrCookie.length; i++) {
    var arr = arrCookie[i].split('=')
    if (arr[0] === name) return arr[1]
  }
  return ''
}

export { checkPhone, getCookie }
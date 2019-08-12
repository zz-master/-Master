function checkPhone(tel) {
  var re = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;

  if (!tel) {
    return false
  }
  return re.test(tel)
}

export { checkPhone }
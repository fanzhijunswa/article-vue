;(function () {
  document.addEventListener('DOMContentLoaded', function () {
    document.getElementsByTagName('html')[0].style.fontSize = (document.documentElement.clientWidth / 375) * 37.5 + 'px'
  })

  window.onresize = function () {
    document.getElementsByTagName('html')[0].style.fontSize = (document.documentElement.clientWidth / 375) * 37.5 + 'px'
  }
})()

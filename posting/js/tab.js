$(function (e) {
  // tab点击事件
  $('.tabgroup .tab').click(function (e) {
    // e.preventDefault()
    let index = $(this).index()
    $(this).addClass('active').siblings().removeClass('active')
    $(this).closest('.tabgroup').find('.content').eq(index).addClass('active').siblings().removeClass('active')
  })
})

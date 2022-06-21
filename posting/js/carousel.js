const trueNumber = function (num, max) {
  return num < 0 ? num + max : num
}

const assignNumber = function (num, max) {
  return num > max * 0.5 ? (num % max) - max : num
}
const wrapNumber = function (num, max) {
  return trueNumber(assignNumber(num, max), max)
}

class Carousel {
  constructor(o) {
    console.log(o)
    // 轮播图容器与this合并
    Object.assign(this, o)
    // carousel 就是 carousel对象
    let carousel = this
    // 当前的轮播图下标
    this.currentSlide = 0
    // slides容器
    this.slides = this.element.find('.slide')
    // 小圆点
    this.dots = this.element.find('.control-dot')
    // 用户配置轮播图切换的时间
    if (this.timing) {
      this.starSlideShow()
    }

    // 绑定左侧点击事件
    this.element.find('.control-left').on('click', function () {
      console.log('control-left')
      carousel.changeSilde('left')
      carousel.restarSlideShow()
    })

    // 绑定右侧点击事件
    this.element.find('.control-right').on('click', function () {
      console.log('control-right')
      carousel.changeSilde('right')
      carousel.restarSlideShow()
    })

    // 绑定小圆点点击事件
    this.element.find('.control-dot').on('click', function () {
      let index = $(this).index()
      carousel.changeSilde(index)
      carousel.restarSlideShow()
    })
  }

  changeSilde(direction) {
    this.previousSlide = this.currentSlide
    console.log('true', direction == 'right')
    console.log('false', direction == 'left')
    // console.log(direction == true)
    if (direction == 'right') {
      this.currentSlide++
    } else if (direction == 'left') {
      this.currentSlide--
    } else {
      if (this.currentSlide == direction) {
        return
      }
      this.currentSlide = direction
      direction = this.currentSlide > this.previousSlide ? 'right' : 'left'
    }

    this.currentSlide = wrapNumber(this.currentSlide, this.slides.length)
    this.showSlide(direction)
  }

  // 显示当前的下标轮播图
  showSlide(direction) {
    console.log('direction==>', direction)
    console.log('currentSlide==>', this.currentSlide)
    let c = this
    this.slides.removeClass('moving left right center')
    this.slides.eq(this.previousSlide).addClass('center')
    if (direction == 'right') {
      this.slides.eq(this.currentSlide).addClass('right')
    } else {
      this.slides.eq(this.currentSlide).addClass('left')
    }

    setTimeout(function () {
      console.log('currentSlide', c.currentSlide)
      c.dots.eq(c.currentSlide).addClass('active').siblings().removeClass('active')
      c.slides.eq(c.currentSlide).removeClass('left right').addClass('center moving')
      if (direction == 'right') {
        c.slides.eq(c.previousSlide).removeClass('center').addClass('left moving')
      } else {
        c.slides.eq(c.previousSlide).removeClass('center').addClass('right moving')
      }
    }, 10)
  }

  // 开始轮播图
  starSlideShow() {
    let c = this
    console.log('this', this.timing)
    c.stopSlideShow()
    c.timer = setTimeout(function () {
      c.changeSilde('right')
      c.showSlide('right')
      c.starSlideShow()
    }, c.timing)
  }

  // 停止轮播图
  stopSlideShow() {
    // console.log('stopSlideShow')
    let c = this
    clearTimeout(c.timer)
    // c.stopSlideShow()
    // c.timer = setTimeout(function () {
    //   c.changeSilde(true)
    //   c.showSlide(true)
    //   c.starSlideShow()
    // }, c.timing)
  }

  restarSlideShow() {
    let c = this
    this.stopSlideShow()
    if (this.timing) {
      this.timer = setTimeout(function () {
        c.starSlideShow()
      }, 5000)
    }
  }
}

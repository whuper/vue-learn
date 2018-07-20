<template>
  <transition name="toast-fade">
    <div class="toast"
      :class="objClass" 
      v-show="isActive"
      @mouseenter="onMouseenter"
      @mouseleave="onMouseleave"
      >
      <button class="toast-close-button" @click="hide">×</button>
      <div class="toast-container">
        <div class="toast-title">{{title}}</div>
        <div class="toast-content">{{content}}</div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data: () => ({
    list: [],
    title: null,
    content: null,
    type: null,
    isActive: false,
    timer: null,
    onShow: () => {},
    onHide: () => {}
  }),
  computed: {
    objClass () {
      // 样式'success, error, warning, default'
      return this.type ? 'toast-' + this.type : null
    }
  },
  methods: {
    // 显示
    show (params) {
      let {content, title, onShow, onHide, type} = params
      this.type = type
      this.content = content
      this.title = title
      this.onShow = onShow
      this.onHide = onHide

      this.isActive = true
      this.setTimer()
    },

    // 隐藏
    hide () {
      this.isActive = false
    },

    // 计时器
    setTimer () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.isActive = false
      }, 2000)
    },

    // 鼠标移至组件时保持显示状态
    onMouseenter () {
      clearTimeout(this.timer)
    },

    // 鼠标移开组件时重新定时
    onMouseleave () {
      if (this.isActive) this.setTimer()
    }
  },
  watch: {
    isActive (val) {
      if (val && typeof this.onShow === 'function') {
        this.onShow()
      } else if (!val && typeof this.onHide === 'function') {
        this.onHide()
      }
    }
  }
}
</script>

<style>
.toast {
  position: fixed;
  top: 10px;
  right: 10px ;
  display: block;
  width: 300px;
  overflow: hidden;
  box-shadow: 0 0 6px #999;
  opacity: .8;
  border-radius: 3px 3px;
  padding: 15px 15px 15px 15px;
  background-position: 15px center;
  background-repeat: no-repeat;
  color: #333;
  background-color: #f0f3f4;
}
.toast-default {

}
.toast-success {
  color: #fff;
  background-color: #51a351;
  padding: 15px 15px 15px 50px;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADsSURBVEhLY2AYBfQMgf///3P8+/evAIgvA/FsIF+BavYDDWMBGroaSMMBiE8VC7AZDrIFaMFnii3AZTjUgsUUWUDA8OdAH6iQbQEhw4HyGsPEcKBXBIC4ARhex4G4BsjmweU1soIFaGg/WtoFZRIZdEvIMhxkCCjXIVsATV6gFGACs4Rsw0EGgIIH3QJYJgHSARQZDrWAB+jawzgs+Q2UO49D7jnRSRGoEFRILcdmEMWGI0cm0JJ2QpYA1RDvcmzJEWhABhD/pqrL0S0CWuABKgnRki9lLseS7g2AlqwHWQSKH4oKLrILpRGhEQCw2LiRUIa4lwAAAABJRU5ErkJggg==") !important;
}
.toast-error {
  color: #fff;
  background-color: #bd362f;
  padding: 15px 15px 15px 50px;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHOSURBVEhLrZa/SgNBEMZzh0WKCClSCKaIYOED+AAKeQQLG8HWztLCImBrYadgIdY+gIKNYkBFSwu7CAoqCgkkoGBI/E28PdbLZmeDLgzZzcx83/zZ2SSXC1j9fr+I1Hq93g2yxH4iwM1vkoBWAdxCmpzTxfkN2RcyZNaHFIkSo10+8kgxkXIURV5HGxTmFuc75B2RfQkpxHG8aAgaAFa0tAHqYFfQ7Iwe2yhODk8+J4C7yAoRTWI3w/4klGRgR4lO7Rpn9+gvMyWp+uxFh8+H+ARlgN1nJuJuQAYvNkEnwGFck18Er4q3egEc/oO+mhLdKgRyhdNFiacC0rlOCbhNVz4H9FnAYgDBvU3QIioZlJFLJtsoHYRDfiZoUyIxqCtRpVlANq0EU4dApjrtgezPFad5S19Wgjkc0hNVnuF4HjVA6C7QrSIbylB+oZe3aHgBsqlNqKYH48jXyJKMuAbiyVJ8KzaB3eRc0pg9VwQ4niFryI68qiOi3AbjwdsfnAtk0bCjTLJKr6mrD9g8iq/S/B81hguOMlQTnVyG40wAcjnmgsCNESDrjme7wfftP4P7SP4N3CJZdvzoNyGq2c/HWOXJGsvVg+RA/k2MC/wN6I2YA2Pt8GkAAAAASUVORK5CYII=") !important;
}
.toast-warning {
  color: #fff;
  background-color: #f89406;
  padding: 15px 15px 15px 50px;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGYSURBVEhL5ZSvTsNQFMbXZGICMYGYmJhAQIJAICYQPAACiSDB8AiICQQJT4CqQEwgJvYASAQCiZiYmJhAIBATCARJy+9rTsldd8sKu1M0+dLb057v6/lbq/2rK0mS/TRNj9cWNAKPYIJII7gIxCcQ51cvqID+GIEX8ASG4B1bK5gIZFeQfoJdEXOfgX4QAQg7kH2A65yQ87lyxb27sggkAzAuFhbbg1K2kgCkB1bVwyIR9m2L7PRPIhDUIXgGtyKw575yz3lTNs6X4JXnjV+LKM/m3MydnTbtOKIjtz6VhCBq4vSm3ncdrD2lk0VgUXSVKjVDJXJzijW1RQdsU7F77He8u68koNZTz8Oz5yGa6J3H3lZ0xYgXBK2QymlWWA+RWnYhskLBv2vmE+hBMCtbA7KX5drWyRT/2JsqZ2IvfB9Y4bWDNMFbJRFmC9E74SoS0CqulwjkC0+5bpcV1CZ8NMej4pjy0U+doDQsGyo1hzVJttIjhQ7GnBtRFN1UarUlH8F3xict+HY07rEzoUGPlWcjRFRr4/gChZgc3ZL2d8oAAAAASUVORK5CYII=") !important;
}
.toast:hover {
  opacity: 1;
  box-shadow: 0 0 18px #888;
  transition: all 200ms ease;
}
.toast-container {
  vertical-align: middle;
}

.toast-fade-enter, .toast-fade-leave-active {
  opacity: 0;
  transform: translateX(100%);
}
.toast-fade-leave-active,
.toast-fade-enter-active {
  transition: all 400ms cubic-bezier(.36,.66,.04,1);
}
.toast-title {
  font-size: 14px;
  font-weight: bold;
}
.toast-close-button {
    padding: 2px 2px;
    border: none;
    background: transparent;
    position: relative;
    right: -10px;
    top: -15px;
    float: right;
    font-size: 20px;
    font-weight: bold;
    color: #ffffff;
    -webkit-text-shadow: 0 1px 0 #ffffff;
    text-shadow: 0 1px 0 #ffffff;
    -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=80);
    filter: alpha(opacity=80);
}

</style>

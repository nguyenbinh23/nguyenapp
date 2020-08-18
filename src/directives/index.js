const randomColor = {
  bind: function (el, binding, vnode) {
     // Here's the click/touchstart handler
     //Trước khi thêm vào thì tác động
     //vnodel là phần tử cha đang chứa el
     //binding là các dữ của el như v-rand-color="binding" 
     //el là phần tử hiện tại
     el.style.color = `#${Math.random().toString().slice(3,6)}`
  },
  inserted: function () {
    //Hook chạy khi đã được thêm vào
  },
  update: function () {
    //Sau khi cập nhật
  },
  componentUpdated: function () {
    //Sau khi component đã được cập nhật
  },
  unbind: function () {
    //Khi ngưng bind
  }
}
const flash = {
  bind: function (el, binding, vnode) {
     el.style.animation = 'flash 0.5s ease 2s'
  },
}


export const directives = [
    { name: 'rand-color' , handle: randomColor },
    { name: 'flash' , handle: flash },
]

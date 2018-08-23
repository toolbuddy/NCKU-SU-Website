<template>
  <div class="croppable">
    <img v-bind:src="src" class="image" />
    <div class="resizeable" contenteditable="false" v-on:mousedown="startMoving">
        <span class="resize-handle-nw" v-on:mousedown="startResize"/>
        <span class="resize-handle-sw" v-on:mousedown="startResize"/>
        <span class="resize-handle-ne" v-on:mousedown="startResize"/>
        <span class="resize-handle-se" v-on:mousedown="startResize"/>
    </div>
    <button v-on:click="crop"> 裁切 </button>
  </div>
</template>

<script>
export default {
  name: 'croppable-img',
  props: {
    src: String,
    file: null
  },
  data () {
    return {
      originImg: new Image(),
      targetImg: null,
      eventState: {},
      constrain: false,
      minWidth: 200,
      minHeight: 200,
      maxWidth: 400,
      maxHeight: 400,
      resizeCanvas: document.createElement('canvas'),
      resizeDom: null
    }
  },
  mounted () {
    this.targetImg = this.$el.querySelector('img')
    this.originImg.src = this.targetImg.src
    this.targetImg.file = this.file
    this.resizeDom = this.$el.querySelector('.resizeable')
    this.resizeCanvas.width = 200
    this.resizeCanvas.height = 200
  },
  methods: {
    startMoving: function (e) {
      // disable the default event action and do not delegate any event.
      e.preventDefault()
      e.stopPropagation()
      // save the current event state
      this.saveEventState(e)
      // add the event.
      document.addEventListener('mousemove', this.moving)
      document.addEventListener('mouseup', this.endMoving)
    },
    startResize: function (e) {
      // disable the default event action and do not delegate any event.
      e.preventDefault()
      e.stopPropagation()
      // save the current event state
      this.saveEventState(e)
      // add the event.
      document.addEventListener('mousemove', this.resizing)
      document.addEventListener('mouseup', this.endResize)
    },
    saveEventState: function (e) {
      // Save the initial event details and container state
      this.eventState.containerWidth = this.resizeDom.clientWidth
      this.eventState.containerHeight = this.resizeDom.clientHeight
      this.eventState.containerLeft = this.resizeDom.offsetLeft
      this.eventState.containerTop = this.resizeDom.offsetTop
      this.eventState.mouse_x = (e.clientX || e.pageX || e.touches[0].clientX) + document.body.scrollLeft
      this.eventState.mouse_y = (e.clientY || e.pageY || e.touches[0].clientY) + document.body.scrollTop
      // This is a fix for mobile safari
      // For some reason it does not allow a direct copy of the touches property
      if (typeof e.touches !== 'undefined') {
        this.eventState.touches = []
        for (let [i, element] of e.touches.entries()) {
          this.eventState.touches[i] = {}
          this.eventState.touches[i].clientX = 0 + element.clientX
          this.eventState.touches[i].clientY = 0 + element.clientY
        }
      }
      this.eventState.event = e
    },
    moving: function (e) {
      let mouse = {}
      // disable the default event action and do not delegate any event.
      e.preventDefault()
      e.stopPropagation()
      // get the mouse x, y location.
      mouse.x = (e.clientX || e.pageX || e.touches[0].clientX) + document.body.scrollLeft
      mouse.y = (e.clientY || e.pageY || e.touches[0].clientY) + document.body.scrollTop
      console.log('mouse.x : ' + mouse.x)
      console.log('mouse.y : ' + mouse.y)
      this.resizeDom.setAttribute('style',
        `left: ${mouse.x - this.resizeCanvas.width / 2}px; 
         top: ${mouse.y - this.resizeCanvas.height / 2}px;
         width: ${this.resizeCanvas.width}px;
         height: ${this.resizeCanvas.height}px;`)
    },
    resizing: function (e) {
      let mouse = {}
      let width = 0
      let height = 0
      // get the mouse x, y location.
      mouse.x = (e.clientX || e.pageX || e.touches[0].clientX) + document.body.scrollLeft
      mouse.y = (e.clientY || e.pageY || e.touches[0].clientY) + document.body.scrollTop
      // according to the handler, compute the relative width and height change.
      if (this.eventState.event.target.classList.contains('resize-handle-se')) {
        width = mouse.x - this.eventState.containerLeft
      } else if (this.eventState.event.target.classList.contains('resize-handle-sw')) {
        width = this.eventState.containerWidth - (mouse.x - this.eventState.containerLeft)
      } else if (this.eventState.event.target.classList.contains('resize-handle-nw')) {
        width = this.eventState.containerWidth - (mouse.x - this.eventState.containerLeft)
      } else if (this.eventState.event.target.classList.contains('resize-handle-ne')) {
        width = mouse.x - this.eventState.containerLeft
      }
      height = width
      // if the image is in limit range.
      if (width > this.minWidth && height > this.minHeight &&
        width < this.maxWidth && height < this.maxHeight) {
        this.resizeImage(width, height)
      }
    },
    endMoving: function (e) {
      // disable the default event action and do not delegate any event.
      e.preventDefault()
      // remove the event.
      document.removeEventListener('mousemove', this.moving)
      document.removeEventListener('mouseup', this.endMoving)
    },
    endResize: function (e) {
      // disable the default event action and do not delegate any event.
      e.preventDefault()
      // remove the event.
      document.removeEventListener('mousemove', this.resizing)
      document.removeEventListener('mouseup', this.endResize)
      // get the resized information.
      // this.getResizedImageFile()
    },
    resizeImage: function (width, height) {
      // use canvas to draw the image.
      this.resizeCanvas.width = width
      this.resizeCanvas.height = height
      this.resizeDom.style.width = `${this.resizeCanvas.width}px`
      this.resizeDom.style.height = `${this.resizeCanvas.height}px`
    },
    crop: function () {
      let targetLeft = this.resizeDom.offsetLeft - this.$el.offsetLeft
      let targetTop = this.resizeDom.offsetTop - this.$el.offsetTop

      this.resizeCanvas.getContext('2d').drawImage(this.originImg, targetLeft, targetTop,
        this.resizeCanvas.width, this.resizeCanvas.height, 0, 0, this.resizeCanvas.width, this.resizeCanvas.height)
      window.open(this.resizeCanvas.toDataURL('image/*'))
    },
    getCroppedImageFile: function () {
      this.resizeCanvas.getContext('2d').drawImage(this.originImg, 0, 0,
        this.resizeCanvas.width, this.resizeCanvas.height)
      this.targetImg.setAttribute('src', this.resizeCanvas.toDataURL('image/*'))
      // get the Blob file of the canvas image.
      const dataURL = this.resizeCanvas.toDataURL('image/*')
      const blobBin = atob(dataURL.split(',')[1])
      const array = []
      for (let i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i))
      }
      const file = new Blob([new Uint8Array(array)], { type: 'image/*' })
      this.targetImg.file = file
      this.targetImg.file.name = this.file.name
    }
  }
}
</script>

<style scoped>
  .resizeable {
    position: fixed;
    z-index: 999;
    width: 200px;
    height: 200px;
    border: solid 2px rgba(222,60,80,.9);
    box-sizing: content-box;
    resize: both;
    cursor: all-scroll;
  }

  .resizeable:hover, .resizeable:active {
    outline: 1px dashed #333;
  }
  .resizeable:hover .resize-handle-ne, 
  .resizeable:active .resize-handle-ne, 
  .resizeable:hover .resize-handle-se, 
  .resizeable:active .resize-handle-se, 
  .resizeable:hover .resize-handle-nw, 
  .resizeable:active .resize-handle-nw, 
  .resizeable:hover .resize-handle-sw,
  .resizeable:active .resize-handle-sw  { 
    position: absolute;
    display: block;
    width: 6px;
    height: 6px;
    background-color: #333;
    z-index: 999;
  }
  .resize-handle-nw {
    top: -3px;
    left: -3px;
    cursor: nw-resize;
  }
  .resize-handle-sw {
    bottom: -3px;
    left: -3px;
    cursor: sw-resize;
  }
  
  .resize-handle-ne {
    top: -3px;
    right: -3px;
    cursor: ne-resize;
  }
  .resize-handle-se {
    bottom: -3px;
    right: -3px;
    cursor: se-resize;
  }
</style>

<template>
  <div class="resizeable" contenteditable="false">
    <span class="resize-handle-nw" v-on:mousedown="startResize"/>
    <span class="resize-handle-sw" v-on:mousedown="startResize"/>
    <img :src="src" class="image" />
    <span class="resize-handle-ne" v-on:mousedown="startResize"/>
    <span class="resize-handle-se" v-on:mousedown="startResize"/>
  </div>
</template>

<script>
export default {
  name: 'resizeable-img',
  props: {
    src: String,
    file: null
  },
  data () {
    return {
      container: null,
      originImg: new Image(),
      targetImg: null,
      eventState: {},
      constrain: false,
      minWidth: 60,
      minHeight: 60,
      resizeCanvas: document.createElement('canvas')
    }
  },
  mounted () {
    this.container = document.getElementsByClassName('resizeable')[0]
    this.targetImg = document.querySelector('img')
    this.originImg.src = this.targetImg.src
  },
  methods: {
    startResize: function (e) {
      e.preventDefault()
      e.stopPropagation()
      this.saveEventState(e)
      document.addEventListener('mousemove', this.resizing)
      document.addEventListener('mouseup', this.endResize)
    },
    saveEventState: function (e) {
      // Save the initial event details and container state
      this.eventState.containerWidth = this.container.clientWidth
      this.eventState.containerHeight = this.container.clientHeight
      this.eventState.containerLeft = this.container.offsetLeft
      this.eventState.containerTop = this.container.offsetTop
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
    resizing: function (e) {
      let mouse = {}
      let width = 0
      let height = 0
      mouse.x = (e.clientX || e.pageX || e.touches[0].clientX) + document.body.scrollLeft
      mouse.y = (e.clientY || e.pageY || e.touches[0].clientY) + document.body.scrollTop
      if (this.eventState.event.target.classList.contains('resize-handle-se')) {
        width = mouse.x - this.eventState.containerLeft
        height = mouse.y - this.eventState.containerTop
      } else if (this.eventState.event.target.classList.contains('resize-handle-sw')) {
        width = this.eventState.containerWidth - (mouse.x - this.eventState.containerLeft)
        height = mouse.y - this.eventState.containerTop
      } else if (this.eventState.event.target.classList.contains('resize-handle-nw')) {
        width = this.eventState.containerWidth - (mouse.x - this.eventState.containerLeft)
        height = this.eventState.containerHeight - (mouse.y - this.eventState.containerTop)
      } else if (this.eventState.event.target.classList.contains('resize-handle-ne')) {
        width = mouse.x - this.eventState.containerLeft
        height = this.eventState.containerHeight - (mouse.y - this.eventState.containerTop)
      }
      if (this.constrain || e.shiftKey) {
        height = width / this.originImg.width * this.originImg.height
      }
      if (width > this.minWidth && height > this.minHeight) {
        this.resizeImage(width, height)
      }
    },
    endResize: function (e) {
      e.preventDefault()
      document.removeEventListener('mousemove', this.resizing)
      document.removeEventListener('mouseup', this.endResize)
      this.getResizedImageFile()
    },
    resizeImage: function (width, height) {
      this.resizeCanvas.width = width
      this.resizeCanvas.height = height
      this.resizeCanvas.getContext('2d').drawImage(this.originImg, 0, 0, width, height)
      this.targetImg.setAttribute('src', this.resizeCanvas.toDataURL('image/*'))
    },
    getResizedImageFile: function () {
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
    position: relative;
    display: inline-block;
    margin: 0 auto;
    resize: both;
  }

  .resizeable img {
    display: block;

  }
  .resizeable:hover img, .resizeable:active img {
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


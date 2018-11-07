<template>
  <div class="resizeable-img" contenteditable="false">
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
    this.targetImg = this.$el.querySelector('img')
    this.originImg.src = this.targetImg.src
    this.targetImg.file = this.file
    console.log(this.targetImg.file)
  },
  methods: {
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
      this.eventState.containerWidth = this.$el.clientWidth
      this.eventState.containerHeight = this.$el.clientHeight
      this.eventState.containerLeft = this.$el.offsetLeft
      this.eventState.containerTop = this.$el.offsetTop
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
      // get the mouse x, y location.
      mouse.x = (e.clientX || e.pageX || e.touches[0].clientX) + document.body.scrollLeft
      mouse.y = (e.clientY || e.pageY || e.touches[0].clientY) + document.body.scrollTop
      // according to the handler, compute the relative width and height change.
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
      // if the image is in limit range.
      if (width > this.minWidth && height > this.minHeight) {
        this.resizeImage(width, height)
      }
    },
    endResize: function (e) {
      // disable the default event action and do not delegate any event.
      e.preventDefault()
      // remove the event.
      document.removeEventListener('mousemove', this.resizing)
      document.removeEventListener('mouseup', this.endResize)
      // get the resized image information.
      this.getResizedImageFile()
    },
    resizeImage: function (width, height) {
      // use canvas to draw the image.
      this.resizeCanvas.width = width
      this.resizeCanvas.height = height
      this.resizeCanvas.getContext('2d').drawImage(this.originImg, 0, 0, width, height)
      this.targetImg.setAttribute('src', this.resizeCanvas.toDataURL('image/*'))
    },
    getResizedImageFile: function () {
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
  .resizeable-img {
    position: relative;
    display: inline-block;
    margin: 0 auto;
    resize: both;
  }

  .resizeable-img img {
    display: block;

  }
  .resizeable-img:hover img, .resizeable-img:active img {
    outline: 1px dashed #333;
  }

  .resizeable-img:hover .resize-handle-ne, 
  .resizeable-img:active .resize-handle-ne, 
  .resizeable-img:hover .resize-handle-se, 
  .resizeable-img:active .resize-handle-se, 
  .resizeable-img:hover .resize-handle-nw, 
  .resizeable-img:active .resize-handle-nw, 
  .resizeable-img:hover .resize-handle-sw,
  .resizeable-img:active .resize-handle-sw  { 
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


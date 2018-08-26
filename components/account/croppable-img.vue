<template>
  <div>
    <div class="croppable" v-bind:style="viewStyle">
      <img v-bind:src="src" class="image" v-on:mousedown="startMoving "/>
      <div class="overlay" v-bind:style="[viewStyle, limitStyle, overlayStyle]">
        <span class="circle"></span>
      </div>
    </div> <br/>
    <div v-bind:style="{width: `${this.viewSize}px`}" >
      <input type="range" min=0 max="100" value="50" class="slider" v-on:input="resizing" v-on:mousedown="startResize">
    </div> <br/>
    <button v-on:click="crop"> 裁切 </button>
  </div>
</template>

<script>
export default {
  name: 'croppable-img',
  props: {
    src: String,
    viewSize: Number,
    cutSize: Number,
    file: null
  },
  data () {
    return {
      originImg: new Image(),
      targetImg: null,
      eventState: {},
      constrain: false,
      originWidth: 0,
      originHeight: 0,
      resizedWidth: 0,
      resizedHeight: 0,
      resizeCanvas: document.createElement('canvas'),
      resizeSlider: null,
      viewStyle: {
        width: `${this.viewSize}px`,
        height: `${this.viewSize}px`
      },
      limitStyle: {
        maxWidth: `${this.viewSize}px`,
        maxHeight: `${this.viewSize}px`
      },
      cutStyle: {
        width: `${this.cutSize}px`,
        height: `${this.cutSize}px`
      },
      overlayStyle: {
        background: `radial-gradient(circle at center, transparent ${this.cutSize / 2 - 2}px,  antiquewhite ${this.cutSize / 2 + 2}px, rgba(0, 0, 0, 0.5) ${this.cutSize / 2}px)`
      }
    }
  },
  mounted () {
    this.targetImg = this.$el.querySelector('img')
    this.originImg.src = this.targetImg.src
    this.targetImg.file = this.file
    this.resizeCanvas.width = this.cutSize
    this.resizeCanvas.height = this.cutSize
    this.resizeSlider = this.$el.querySelector('input')
    // read the natural/client width and height by using promise
    new Promise((resolve, reject) => {
      const target = this.targetImg
      const callback = function () {
        const nw = this.naturalWidth
        const nh = this.naturalHeight
        const rw = this.clientWidth
        const rh = this.clientHeight
        target.removeEventListener('load', this)
        resolve({
          naturalWidth: nw,
          naturalHeight: nh,
          resizedWidth: rw,
          resizedHeight: rh
        })
      }
      this.targetImg.addEventListener('load', callback)
    }).then(result => {
      this.originWidth = result.naturalWidth
      this.originHeight = result.naturalHeight
      this.resizedWidth = result.resizedWidth
      this.resizedHeight = result.resizedHeight
    })
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
      // save the current event state
      this.saveEventState(e)
      // add the event.
      document.removeEventListener('mousedown', this.startResize)
    },
    saveEventState: function (e) {
      // Save the initial event details and container state
      this.eventState.containerWidth = this.targetImg.clientWidth
      this.eventState.containerHeight = this.targetImg.clientHeight
      this.eventState.containerLeft = this.targetImg.offsetLeft
      this.eventState.containerTop = this.targetImg.offsetTop
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

      const newMarginLeft = this.eventState.containerLeft + mouse.x - this.eventState.mouse_x
      const newMarginTop = this.eventState.containerTop + mouse.y - this.eventState.mouse_y
      // moving on x direction if the current image width  is larger than cut size
      if (this.targetImg.clientWidth > this.cutSize) {
        if (newMarginLeft < (this.viewSize - this.cutSize) / 2 &&
          newMarginLeft + this.targetImg.clientWidth > (this.viewSize + this.cutSize) / 2) {
          this.targetImg.style.marginLeft = `${newMarginLeft}px`
        }
      }
      // moving on y direction if the current image height is larger than cut size
      if (this.targetImg.clientHeight > this.cutSize) {
        if (newMarginTop < (this.viewSize - this.cutSize) / 2 &&
          newMarginTop + this.targetImg.clientHeight > (this.viewSize + this.cutSize) / 2) {
          this.targetImg.style.marginTop = `${newMarginTop}px`
        }
      }
    },
    resizing: function (e) {
      // compute the new width and height
      const ratio = 0.01 * Math.pow(this.resizeSlider.value, 2) + 0.5 * this.resizeSlider.value + 50
      const newWidth = Math.max(this.resizedWidth * ratio / 100, this.cutSize)
      const newHeight = Math.max(this.resizedHeight * ratio / 100, this.cutSize)
      // resize the image if newHeight larger than cut size
      if (newHeight > this.cutSize) {
        this.targetImg.style.width = `${newWidth}px`
        this.targetImg.style.height = `${newHeight}px`
      }
      // correct the margin
      let newMarginLeft = (this.cutSize - this.eventState.containerLeft) / this.eventState.containerWidth * this.targetImg.clientWidth * -1 + this.cutSize
      let newMarginTop = (this.cutSize - this.eventState.containerTop) / this.eventState.containerHeight * this.targetImg.clientHeight * -1 + this.cutSize
      newMarginLeft = Math.min(newMarginLeft, (this.viewSize - this.cutSize) / 2)
      newMarginTop = Math.min(newMarginTop, (this.viewSize - this.cutSize) / 2)
      this.targetImg.style.marginLeft = `${newMarginLeft}px`
      this.targetImg.style.marginTop = `${newMarginTop}px`
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
    },
    crop: function () {
      let targetLeft = ((this.viewSize - this.cutSize) / 2 - this.targetImg.offsetLeft) * this.originWidth / this.targetImg.clientWidth
      let targetTop = ((this.viewSize - this.cutSize) / 2 - this.targetImg.offsetTop) * this.originHeight / this.targetImg.clientHeight
      const width = this.cutSize * this.originWidth / this.targetImg.clientWidth
      const height = this.cutSize * this.originHeight / this.targetImg.clientHeight
      console.log(targetLeft)
      console.log(targetTop)
      console.log(width)
      console.log(height)
      this.resizeCanvas.getContext('2d').drawImage(this.targetImg, targetLeft, targetTop,
        width, height, 0, 0, this.resizeCanvas.width, this.resizeCanvas.height)
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
  .croppable {
    position:relative;
    background-color: lightsteelblue;
    overflow: hidden;
  }
  .overlay {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    z-index: 999;
    pointer-events: none;
  }
  

  .image {
    height: 100%;
    cursor: all-scroll;
    transform-origin: center;
  }

  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 15px;
    border-radius: 5px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
  }

  .slider:hover {
    opacity: 1;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #4CAF50;
    cursor: pointer;
  }

  .slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #4CAF50;
    cursor: pointer;
  }
</style>

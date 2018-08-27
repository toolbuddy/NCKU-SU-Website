<template>
  <div>
    <form id="box">
      <span class="dropFiles">
        <input  type="file" id="fileUpload" class="inputfile" v-on:change="handleFile" multiple />
        <label for="fileUpload">Choose a file</label>
        or Drop the files here!
      </span>
    </form>
    <section>
      <label v-if="files.length === 0">目前尚無任何附加檔案</label>
      <div v-for="(file, index) in files" v-bind:key="index" class="fileColumn">
        <img v-bind:class="[`preview_${index}`]"/>
        <div class="overlay">
          <label>{{ file.name }}</label>
          <i class="fas fa-times remove" v-on:click="removeFile(index)"></i>
        </div>
      </div>
    </section>
    <button class="submit" v-on:click="submitFiles()" v-if="files.length > 0 && submitable">Submit</button>
    <progress max="100" v-bind:value.prop="uploadPercentage"></progress>
  </div>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  props: {
    submitable: Boolean
  },
  data () {
    return {
      form: null,
      files: [],
      uploadPercentage: 0,
      preview: 0
    }
  },
  computed: {
    dragAndDropCapable: function () {
      const div = document.createElement('div')
      return (('draggable' in div) ||
        ('ondragstart' in div && 'ondrop' in div)) &&
        'FormData' in window &&
        'FileReader' in window
    }
  },
  mounted () {
    this.form = this.$el.querySelector('#box')
    if (this.dragAndDropCapable) {
      const event = ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop']
      event.forEach((evt) => {
        this.form.addEventListener(evt, (e) => {
          e.preventDefault()
          e.stopPropagation()
        })
      })
      // add drag hover effect
      'dragover dragenter'.split(' ').forEach((evt) => {
        this.form.addEventListener(evt, (e) => {
          this.form.classList.add('isDragover')
        })
      })
      'dragleave dragend drop'.split(' ').forEach((evt) => {
        this.form.addEventListener(evt, (e) => {
          this.form.classList.remove('isDragover')
        })
      })

      this.form.addEventListener('drop', (e) => {
        for (let ele of e.dataTransfer.files) {
          this.files.push(ele)
        }
        this.getImagePreview()
      })
    }
  },
  methods: {
    handleFile: function (e) {
      // get the files.
      const files = document.getElementById('fileUpload').files
      const number = files.length
      if (number !== 0) {
        for (let ele of files) {
          this.files.push(ele)
        }
        this.getImagePreview()
        // remove all file in the FileList of input.
        document.getElementById('fileUpload').value = ''
      }
    },
    getImagePreview: function () {
      // prevent from the absence of DOM element.
      this.$nextTick(() => {
        for (let [index, ele] of this.files.entries()) {
          const target = this.$el.querySelector(`.preview_${index}`)
          const reader = new FileReader()
          if ((/\.(jpe?g|png|gif)$/i).test(ele.name)) {
            reader.onload = (e) => {
              // create the object url
              const url = window.URL.createObjectURL(ele)
              target.src = url
            }
            reader.readAsDataURL(ele)
          } else {
            target.src = '~/assets/img/file.png'
          }
        }
      })
    },
    removeFile: function (key) {
      this.files.splice(key, 1)
    },
    submitFile: async function (path) {
      const data = new FormData()
      data.append('path', path)
      for (let [index, ele] of this.files.entries()) {
        data.append(`files[${index}]`, ele, ele.name)
      }
      try {
        await axios.post('/api/uploadFile', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      } catch (e) {

      }
    },
    onUploadProgress: function (e) {
      this.uploadPercentage = parseInt(Math.round(e.loaded * 100 / e.total))
    }
  }
}
</script>

<style scoped>
  form {
    display: block;
    width: 600px;
    height: 200px;
    background: #ccc;
    text-align: center;
    line-height: 200px;
    border-radius: 4px;
    outline: 2px dashed grey;
    outline-offset: -10px;
  }

  section {
    overflow: auto;
    width: 600px;
    max-height: 120px;
  }

  .inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
  .inputfile + label {
    font-size: 1.25em;
    font-weight: 700;
    color: grey;
    line-height: 24px;
    display: inline-block;
    cursor: pointer;
  }

  .inputfile:focus + label,
  .inputfile + label:hover {
    color: red;
  }

  .inputfile:focus + label {
    outline: 1px dotted #000;
    outline: -webkit-focus-ring-color auto 5px;
  }

  .isDragover {
    background-color: antiquewhite;
  }

  .dropFiles {
    color: grey;
  }
  .fileColumn {
    display: inline-block;
    position: relative;
    width: 100px;
    height: 100px;
    margin: 10px;
    padding: 10px;
    overflow: hidden;
    border: 1px solid #ddd;
    font-size: 12px;
  }

  .fileColumn img {
    display: block;
    height: 100px;
    width: 100px;
    object-fit: cover; /* Do not scale the image */
    object-position: center; /* Center the image within the element */
    margin: auto;
    border-radius: 15px;
  }

  .fileColumn .overlay {
    position: absolute;
    display: block;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    height: 100px;
    width: 100px;
    transition: .3s ease;
    margin: auto;
    border-radius: 15px;
  }

  .fileColumn:hover .overlay {
    background-color: rgba(0, 0, 0, 0.67);
  }

  .overlay label {
    position: absolute;
    top: 80px;
    width: 100px;
    height: 16px;
    overflow: hidden;
    text-align: center;
    color: white;
    opacity: 0;
    transition: .3s ease;
  }

  .fileColumn:hover .overlay label {
    opacity: 1;
  }

  .overlay i {
    position: absolute;
    font-size: 24px;
    top: 4px;
    left: 74px;
    color: antiquewhite;
    cursor: pointer;
    opacity: 0;
    transition: .3s ease;
  }

  .fileColumn:hover .overlay i {
    opacity: 1;
  }

  .submit {
    display: block;
    margin: auto;
    text-align: center;
    width: 200px;
    padding: 10px;
    text-transform: uppercase;
    background-color: #CCC;
    color: white;
    font-weight: bold;
    margin-top: 20px;
  }

  progress{
    width: 600px;
    display: block;
    margin-top: 20px;
    margin-bottom: 20px;
 }
</style>

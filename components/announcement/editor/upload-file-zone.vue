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
      <file-column v-for="(iter, index) in files" v-bind:key="iter.name" 
        v-bind:file="iter" v-bind:index="index" v-on:removeFile="removeFile(index)">
      </file-column>
    </section>
    <button class="submit" v-on:click="submitFiles()" v-if="files.length > 0 && submitable">Submit</button>
    <progress max="100" v-bind:value.prop="uploadPercentage"></progress>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import FileColumn from '~/components/announcement/editor/upload-file-column.vue'

export default {
  props: {
    submitable: Boolean
  },
  components: {
    FileColumn
  },
  data () {
    return {
      form: null,
      files: [],
      uploadPercentage: 0,
      previewDOMs: []
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
        // remove all file in the FileList of input.
        document.getElementById('fileUpload').value = ''
      }
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
  div {
    display: grid;
    justify-items: center;
  }
  form {
    display: block;
    width: 100%;
    height: 200px;
    background: #EEE;
    text-align: center;
    line-height: 200px;
    border-radius: 4px;
    outline: 2px dashed grey;
    outline-offset: -10px;
    margin: 1em;
    box-sizing: border-box;
  }

  section {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(auto-fit, 1fr);
    justify-items: center;
    overflow: auto;
    width: 100%;
    min-height: 200px;
    max-height: 200px;
    border: 1px solid #CCC;
    border-radius: 4px;
    margin: 1em;
    padding: 1em;
    box-sizing: border-box;
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
    width: 100%;
    display: block;
    margin-top: 20px;
    margin-bottom: 20px;
 }
</style>

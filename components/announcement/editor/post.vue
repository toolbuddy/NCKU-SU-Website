<template>
  <div>  
    <div class="toolbar float-left">
      <a href="#" data-command="undo" v-on:click="operation"><i class="fa fa-undo">  </i></a>
      <a href="#" data-command="redo" v-on:click="operation"><i class="fa fa-redo">  </i></a>
      <div class="fore-wrapper">
        <i class="fa fa-font" style="color: #C96;"></i>
        <div class="fore-palette">
          <a v-for="color in colorPalette" v-bind:key="color" v-bind:class="'palette-item'"
            v-bind:href="'#'" v-bind:data-value="color" v-bind:data-command="'forecolor'"
            v-bind:style="{backgroundColor: color}" v-on:click="operation"></a>
        </div>
      </div>
      <div class="back-wrapper">
        <i class="fa fa-font" style="background: #C96;"></i>
        <div class="back-palette">
            <a v-for="color in colorPalette" v-bind:key="color" v-bind:class="'palette-item'"
            v-bind:href="'#'" v-bind:data-value="color" v-bind:data-command="'backcolor'"
            v-bind:style="{backgroundColor: color}" v-on:click="operation"></a>
        </div>
      </div>
      <a href="#" data-command="bold" v-on:click="operation"><i class="fa fa-bold">  </i></a>
      <a href="#" data-command="italic" v-on:click="operation"><i class="fa fa-italic">  </i></a>
      <a href="#" data-command="underline" v-on:click="operation"><i class="fa fa-underline">  </i></a>
      <a href="#" data-command="strikeThrough" v-on:click="operation"><i class="fa fa-strikethrough">  </i></a>
      <a href="#" data-command="justifyLeft" v-on:click="operation"><i class="fa fa-align-left">  </i></a>
      <a href="#" data-command="justifyCenter" v-on:click="operation"><i class="fa fa-align-center">  </i></a>
      <a href="#" data-command="justifyRight" v-on:click="operation"><i class="fa fa-align-right">  </i></a>
      <a href="#" data-command="justifyFull" v-on:click="operation"><i class="fa fa-align-justify">  </i></a>
      <a href="#" data-command="indent" v-on:click="operation"><i class="fa fa-indent">  </i></a>
      <a href="#" data-command="outdent" v-on:click="operation"><i class="fa fa-outdent">  </i></a>
      <a href="#" data-command="insertUnorderedList" v-on:click="operation"><i class="fa fa-list-ul">  </i></a>
      <a href="#" data-command="insertOrderedList" v-on:click="operation"><i class="fa fa-list-ol">  </i></a>

      <a href="#" data-command="h1" v-on:click="operation"> H1 </a>
      <a href="#" data-command="h2" v-on:click="operation"> H2 </a>
      <a href="#" data-command="p" v-on:click="operation"> P </a>
      <a href="#" data-command="createlink" v-on:click="operation"><i class="fa fa-link"> </i></a>
      <a href="#" data-command="unlink" v-on:click="operation"><i class="fa fa-unlink"> </i></a>
      <a href="#" id="imageButton" data-command="insertimage" v-on:click="operation">
        <i class="fa fa-image"> </i>
        <input id="imageUploader" v-on:change="handleFile" name="uploadingFile" type="file" style="display: none" multiple accept="image/*"/>
      </a>
      <a href="#" data-command="subscript" v-on:click="operation"><i class="fa fa-subscript"> </i></a>
      <a href="#" data-command="superscript" v-on:click="operation"><i class="fa fa-superscript"> </i></a>
    </div>
    <br/>
    <h1 class="editor" id="title" contenteditable="true"> Title Here </h1>
    <div ref="content" class="editor" id="content" contenteditable>
      <p>A Custom Editor.</p>
      <p>Try making some changes here. Add your own text or maybe an image.</p>
    </div>
    <label name="poster"> 發布者： {{author}} </label> <br/>
    <time name="post_time"> 發布時間：{{currentTime}} </time> <br/>
    <select name="type" v-on:change="handleType">
    　 <option value="topnews">重要公告</option>
    　 <option value="message">文字快訊</option>
    </select><br/>
    <upload-file-zone ref="child"></upload-file-zone> <br/>
    <button type="button" v-on:click="post"> 發布 Post </button>
    <button type="button"> 取消 Cancel </button>
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from '~/plugins/axios'
  import qs from 'qs'
  import ResizeableImg from '~/components/announcement/editor/resizeable-img.vue'
  import UploadFileZone from '~/components/announcement/editor/upload-file-zone.vue'
  const ResizeableImgCtor = Vue.extend(ResizeableImg)

  export default {
    name: 'custom-post',
    props: {
      author: String
    },
    data () {
      return {
        currentTime: null,
        colorPalette: ['#000000', '#FF9966', '#6699FF', '#99FF66', '#CC0000', '#00CC00', '#0000CC', '#333333', '#0066FF', '#FFFFFF']
      }
    },
    created () {

    },
    destroyed () {
      clearInterval(this.time())
    },
    mounted () {
      // set the time.
      this.time()
      setInterval(this.time, 1000)
    },
    components: {
      ResizeableImg,
      UploadFileZone
    },
    methods: {
      time: function () {
        const date = new Date()
        var str = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' '
        var hours = date.getHours()
        var minutes = date.getMinutes()
        var seconds = date.getSeconds()
        if (hours < 10) {
          hours = '0' + hours
        }
        if (minutes < 10) {
          minutes = '0' + minutes
        }
        if (seconds < 10) {
          seconds = '0' + seconds
        }
        str += hours + ':' + minutes + ':' + seconds + ' '
        if (hours > 11) {
          str += 'PM'
        } else {
          str += 'AM'
        }
        this.currentTime = str
      },
      operation: function (event) {
        if (Object.values(event.currentTarget.classList).findIndex((target) => {
          return target === 'disabled'
        }) !== -1) {
          return
        }
        const command = event.currentTarget.getAttribute('data-command')
        // accroding to the command to do the corresponding operation.
        switch (command) {
          case 'h1':
          case 'h2':
          case 'p':
            document.execCommand('formatBlock', false, command)
            break
          case 'forecolor':
          case 'backcolor':
            const value = event.currentTarget.getAttribute('data-value')
            document.execCommand(command, false, value)
            break
          case 'createlink':
            let url = prompt('Enter the link here', 'http://')
            document.execCommand(command, false, url)
            break
          case 'insertimage':
            const parent = event.currentTarget
            const child = parent.querySelector('input')
            child.click()
            break
          default:
            document.execCommand(command, false, null)
            break
        }
      },
      handleFile: function () {
        // get the files.
        const files = document.getElementById('imageUploader').files
        const number = files.length
        if (number !== 0) {
          for (let i = 0; i < files.length; ++i) {
            const target = files[i]
            // check the file type is image.
            if (target.type.match('image.*')) {
              // use FileReader read the image.
              const fileReader = new FileReader()
              fileReader.onload = (fileLoadedEvent) => {
                // create the object url
                const url = window.URL.createObjectURL(target)
                // insert the image to editor.
                document.execCommand('insertHTML', false, '<span id="imageMount"></span>')
                const imageMount = document.getElementById('imageMount')
                const insertImg = new ResizeableImgCtor({
                  propsData: {
                    src: url,
                    file: target
                  }
                })
                insertImg.$mount(imageMount)
                // revoke the object url
                window.URL.revokeObjectURL(target)
              }
              fileReader.readAsDataURL(target)
            }
          }
          // remove all file in the FileList of input.
          document.getElementById('imageUploader').value = ''
        }
      },
      handleType: function (event) {
        const type = event.currentTarget.options[event.currentTarget.selectedIndex].value
        const insertimageButton = document.getElementById('imageButton')
        switch (type) {
          case 'topnews':
            // enable the feature of insert image
            insertimageButton.classList.remove('disabled')
            break
          case 'message':
            // disable the feature of insert image
            insertimageButton.classList.add('disabled')
            // remove all images.
            let images = document.querySelectorAll('.resizeable-img')
            for (let target of images) {
              target.remove()
            }
            break
        }
      },
      post: function () {
        console.log('post button click!!')
        // get all inserted images.
        let images = document.querySelectorAll('.image')
        const data = new FormData()
        console.log(images)
        data.append('title', document.getElementById('title').textContent)
        for (let [index, element] of images.entries()) {
          data.append('files[' + index + ']', element.file, element.file.name)
        }

        axios.post('/api/upload', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((location) => {
          console.log('upload images success!!')
          // modify all img DOM element to uploaded image.
          for (let i = 1; i < location.data.length; ++i) {
            images[i - 1].src = location.data[i]
            console.log(location.data[i].src)
          }
          console.log(location.data)
          // upload the attachment
          new Promise((resolve, reject) => {
            this.$refs.child.submitFile(location.data[0])
            resolve(true)
          }).then((res) => {
            // post announcement code here...
            let Type
            if (document.getElementsByName('type')[0].value === 'topnews') {
              Type = '1'
            } else {
              Type = '0'
            }
            const param = {
              title: document.getElementById('title').textContent,
              announcer: 'will get from login status',
              time: this.currentTime,
              type: Type,
              content: document.getElementsByClassName('editor')[1].outerHTML
            }
            axios.post('/api/saveArticle', qs.stringify(param)
            ).then((value) => {
              console.log('article post is done')
            }).catch((err) => {
              console.log(err)
            })
          })
        })
      }
    }
  }
</script>

<style scoped>
  #title {
    padding: 0.3em;
  }
  #content {
    min-height: 150px;
    overflow: auto;
    padding: 1em;
    resize: vertical;
  }
  .edtior {
    box-shadow: 0 0 2px #CCC;
    overflow: auto;
    outline: none;
  }
  .float-left {
    float: left;
  }
  .toolbar {
    text-align: center;
  }
  h1 {
    margin-top: 40px;
  }
  .toolbar a,
  .fore-wrapper,
  .back-wrapper {
    border: 1px solid #AAA;
    background: #FFF;
    border-radius: 1px;
    color: black;
    padding: 5px;
    width: 1.5em;
    margin: -2px;
    margin-top: 10px;
    display: inline-block;
    text-decoration: none;
    box-shadow: 0px 1px 0px #CCC;
  }

  .toolbar a:hover,
  .fore-wrapper:hover,
  .back-wrapper:hover {
    background: #f2f2f2;
    border-color: #8c8c8c;
  }

  .toolbar a.disabled {
    background: #8c8c8c;
  }

  a[data-command='redo'],
  a[data-command='strikeThrough'],
  a[data-command='justifyFull'],
  a[data-command='insertOrderedList'],
  a[data-command='outdent'],
  a[data-command='p'],
  a[data-command='superscript'] {
    margin-right: 5px;
    border-radius: 0 3px 3px 0;
  }

  a[data-command='undo'],
  .fore-wrapper,
  a[data-command='justifyLeft'],
  a[data-command='insertUnorderedList'],
  a[data-command='indent'],
  a[data-command='h1'],
  a[data-command='subscript'] {
    border-radius: 3px 0 0 3px;
  }

  .fore-palette,
  .back-palette {
    display: none;
  }

  .fore-wrapper,
  .back-wrapper {
    display: inline-block;
    cursor: pointer;
  }

  .fore-wrapper:hover .fore-palette,
  .back-wrapper:hover .back-palette {
    display: block;
    float: left;
    position: absolute;
    padding: 3px;
    width: 160px;
    background: #FFF;
    border: 1px solid #DDD;
    box-shadow: 0 0 5px #CCC;
    height: 70px;
  }

  .fore-palette a,
  .back-palette a {
    background: #FFF;
    margin-bottom: 2px;
  }
  a.palette-item {
    height: 1em;
    border-radius: 3px;
    margin: 2px;
    width: 1em;
    border: 1px solid #CCC;
  }

  a.palette-item:hover {
    border: 1px solid #CCC;
    box-shadow: 0 0 3px #333;
  }


</style>

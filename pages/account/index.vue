<template>
  <div>
    <h1> Account 我的帳號 </h1>
    <input id="imageUploader" v-on:change="handleFile" type="file" accept="image/*"/>
  </div>
      
</template>

<script>
  import Vue from 'vue'
  import CroppableImg from '~/components/account/croppable-img.vue'

  const CroppableImgCtor = Vue.extend(CroppableImg)

  export default {
    components: {
      CroppableImg
    },
    methods: {
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
                // insert the image
                document.getElementById('imageUploader').insertAdjacentHTML('afterend', '<span id="imageMount"></span>')
                const imageMount = document.getElementById('imageMount')
                const insertImg = new CroppableImgCtor({
                  propsData: {
                    src: url,
                    viewSize: 400,
                    cutSize: 200,
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
      }
    }
  }
</script>

<style scoped>

</style>

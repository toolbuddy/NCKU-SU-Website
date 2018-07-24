<template>
  <div>
    <form class="toolbar">
      <a href="#" data-command="undo"><i class="fa fa-undo">  </i></a>
      <a href="#" data-command="redo"><i class="fa fa-redo">  </i></a>
      <div class="fore-wrapper">
        <i class="fa fa-font" style="color: #C96;"></i>
        <div class="fore-palette">

        </div>
      </div>
      <div class="back-wrapper">
        <i class="fa fa-font" style="background: #C96;"></i>
        <div class="back-palette">
          
        </div>
      </div>
     
      <a href="#" data-command="bold"><i class="fa fa-bold">  </i></a>
      <a href="#" data-command="italic"><i class="fa fa-italic">  </i></a>
      <a href="#" data-command="underline"><i class="fa fa-underline">  </i></a>
      <a href="#" data-command="strikeThrough"><i class="fa fa-strikethrough">  </i></a>
      <a href="#" data-command="justifyLeft"><i class="fa fa-align-left">  </i></a>
      <a href="#" data-command="justifyCenter"><i class="fa fa-align-center">  </i></a>
      <a href="#" data-command="justifyRight"><i class="fa fa-align-right">  </i></a>
      <a href="#" data-command="justifyFull"><i class="fa fa-align-full">  </i></a>
      <a href="#" data-command="indent"><i class="fa fa-indent">  </i></a>
      <a href="#" data-command="outdent"><i class="fa fa-outdent">  </i></a>
      <a href="#" data-command="insertUnorderedList"><i class="fa fa-list-ul">  </i></a>
      <a href="#" data-command="insertOrderedList"><i class="fa fa-list-ol">  </i></a>

      <a href="#" data-command="h1"> H1 </a>
      <a href="#" data-command="h2"> H2 </a>
      <a href="#" data-command="createlink"><i class="fa fa-link"> </i></a>
      <a href="#" data-command="unlink"><i class="fa fa-unlink"> </i></a>
      <a href="#" data-command="insertimage"><i class="fa fa-image"> </i></a>
      <a href="#" data-command="p"> P </a>
      <a href="#" data-command="subscript"><i class="fa fa-subscript"> </i></a>
      <a href="#" data-command="superscript"><i class="fa fa-superscript"> </i></a>
      <div class="editor">
        <h1>A Custom Editor.</h1>
        <p>Try making some changes here. Add your own text or maybe an image.</p>
      </div>
      <label> 發布者： {{author}} </label> <br/>
      <time> 發布時間：{{currentTime}} </time> <br/>
      <select name="type">
  　    <option value="topnews">重要公告</option>
  　    <option value="message">文字快訊</option>
      </select><br/>
      <button type="button" v-on:click="post"> 發布 Post </button>
      <button type="button"> 取消 Cancel </button>
    </form>
    
  </div>
</template>

<script>
  export default {
    name: 'custom-post',
    props: {
      author: String
    },
    data () {
      return {
        currentTime: null
      }
    },
    created () {
      this.time()
      setInterval(this.time, 1000)
    },
    destroyed () {
      clearInterval(this.time())
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
      post: function () {
        console.log('post button click!!')
        // post announcement code here...
      }
    }
  }
</script>

<style scoped>

</style>

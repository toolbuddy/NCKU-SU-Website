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
      <a href="#" data-command="insertimage" v-on:click="operation">
        <i class="fa fa-image"> </i>
        <input type="file" style="display: none">
      </a>
      <a href="#" data-command="subscript" v-on:click="operation"><i class="fa fa-subscript"> </i></a>
      <a href="#" data-command="superscript" v-on:click="operation"><i class="fa fa-superscript"> </i></a>
    </div>
    <br/>
    <div class="editor" contenteditable>
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
      operation: function (e) {
        const command = e.currentTarget.getAttribute('data-command')
        console.log(command)
        if (command === 'h1' || command === 'h2' || command === 'p') {
          document.execCommand('formatBlock', false, command)
        }
        if (command === 'forecolor' || command === 'backcolor') {
          const value = e.currentTarget.getAttribute('data-value')
          document.execCommand(command, false, value)
        }
        if (command === 'createlink') {
          let url = prompt('Enter the link here', 'http://')
          document.execCommand(command, false, url)
        }
        if (command === 'insertimage') {
          const parent = e.currentTarget
          const child = parent.querySelector('input')
          child.click()
        } else {
          document.execCommand(command, false, null)
        }
      },
      post: function () {
        console.log('post button click!!')
        // post announcement code here...
      }
    }
  }
</script>

<style scoped>
  .editor {
    box-shadow: 0 0 2px #CCC;
    min-height: 150px;
    overflow: auto;
    padding: 1em;
    margin-top: 40px;
    resize: vertical;
    outline: none;
  }
  .float-left {
    float: left;
  }
  .toolbar {
    text-align: center;
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

<template>
  <div>
    <form>
      <label> 標題 Title </label> <br/> <input type="text"/> <br/>
      <label> 發布者： {{author}} </label> <br/>
      <time> 發布時間：{{currentTime}} </time> <br/>
      <select name="type">
  　    <option value="topnews">重要公告</option>
  　    <option value="message">文字快訊</option>
      </select><br/>
      <label> 內容 Content </label> <br/> <textarea rows="8" cols="50"> </textarea> <br/>
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

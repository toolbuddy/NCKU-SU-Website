<template>
  <div>
    <p>{{message}}</p>
    <span v-text="message"></span>
    <span v-if="active">if</span>
    <span v-show="active">if</span>
    <p v-bind:class="{activeClass: active}">123</p>
    <p v-bind:style="{color: col}">77</p>
  </div>
</template>

<script>
  export default {
    name: 'haha',
    data: function () {
      return {
        message: 'fuck',
        active: true,
        col: 'blue'
      }
    }
  }
</script>
<style>
  .activeClass {
    background-color: red ;
  }
</style>
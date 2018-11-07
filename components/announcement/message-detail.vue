<template>
  <div> 
    <article> 
      <h1> {{title}} </h1> <br/>
      <label> 作者：{{author}} </label> <label> 發布時間：{{time}} </label> <label> 瀏覽人數：{{visitors}} </label> <br/>
      <p> </p>
    </article>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      author: String,
      time: String,
      visitors: Number,
      content: String
    },
    mounted () {
      // get old node.
      const oldNode = this.$el.querySelector('p')
      // clone a new node from old node.
      const newNode = oldNode.cloneNode(false)
      newNode.innerHTML = this.content
      // replace the old node with new node.
      oldNode.parentNode.replaceChild(newNode, oldNode)
    }
  }
</script>

<style scoped>
</style>
<template>
  <div> 
    <article> 
      <router-link v-bind:to="{path: './detail/' + id}"> <h1> {{title}} </h1> </router-link> <br/>
      <label> 作者：{{author}} </label> <label> 發布時間：{{time}} </label> <label> 瀏覽人數：{{visitors}} </label> <br/>
      <p> </p>
    </article>
  </div>
</template>

<script>
  export default {
    props: {
      id: Number,
      title: String,
      author: String,
      time: String,
      visitors: Number,
      content: String
    },
    data () {
      return {
        contentLength: 100
      }
    },
    mounted () {
      // get old node.
      const oldNode = this.$el.querySelector('p')
      // clone a new node from old node.
      const newNode = oldNode.cloneNode(false)
      newNode.innerHTML = this.content
      if (newNode.textContent.length > this.contentLength) {
        newNode.textContent = newNode.textContent.substr('', this.contentLength)
      }
      newNode.textContent = newNode.textContent + '...'
      const link = document.createElement('a')
      link.textContent = '(查看全文)'
      link.href = document.URL.slice(0, document.URL.lastIndexOf('/')) + '/detail/' + this.id
      newNode.appendChild(link)
      // replace the old node with new node.
      oldNode.parentNode.replaceChild(newNode, oldNode)
    }
  }
</script>

<style scoped>
</style>
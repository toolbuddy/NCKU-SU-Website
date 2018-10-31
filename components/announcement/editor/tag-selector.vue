<template>
 <div>
    <label class="badge">已標記</label>
    <section class="tagged-section">
      <small v-if="tagged.length === 0"> 尚未標記任何標籤 </small>
      <label v-for="(tag, index) in tagged" v-bind:key="index" v-on:click="removeTag(index)" > 
        {{tag}} 
      </label>
    </section>
    <label class="badge">可標記標籤</label>
    <section class="untagged-section">
      <label v-for="(tag, index) in tags" v-bind:key="index" v-bind:class="{ untagged: isUntagged(tag) }" v-on:click="addTag(index)"> 
        {{tag}} 
      </label>
    </section>
 </div>
</template>

<script>
export default {
  data () {
    return {
      tags: ['test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'test8', 'test9', 'test10'],
      tagged: []
    }
  },
  methods: {
    addTag: function (index) {
      if (!this.tagged.includes(this.tags[index])) {
        this.tagged.push(this.tags[index])
      }
    },
    removeTag: function (index) {
      this.tagged.splice(index, 1)
      console.log(this.tagged)
    },
    isUntagged: function (tag) {
      return this.tagged.includes(tag)
    }
  }
}
</script>

<style scoped>
div {
  margin: 1em;
  box-sizing: border-box;
}
.tagged-section label {
  background: #EEE;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  margin: 5px;
}

.tagged-section {
  border: 1px solid #DDD;
  border-radius: 10px;
  padding: 1em;
  margin: 1em 0;
  box-sizing: border-box;
}

.untagged-section label {
  background: #EEE;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  margin: 5px;
}

.untagged-section {
  border: 1px solid #DDD;
  border-radius: 10px;
  padding: 1em;
  margin: 1em 0;
  box-sizing: border-box;
}

.untagged {
  opacity: 0.3;
}

.badge {
  border-radius: 4px;
  background-color: #3F51B5;
  color: #FFF;
  padding: 6px;
  box-sizing: border-box;
}

</style>

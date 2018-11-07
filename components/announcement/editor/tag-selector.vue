<template>
 <div>
    <label>已標記</label>
    <section class="tagged-section">
      <label v-for="(tag, index) in tagged" v-bind:key="index" v-on:click="removeTag(index)" > 
        {{tag}} 
      </label>
    </section>
    <label>可標記標籤</label>
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
      this.tagged.push(this.tags[index])
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

<style>

.tagged-section label {
  background: #dddddd;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  margin: 5px;
}

.tagged-section {
  border: 2px solid gray;
  padding: 20px;
  margin-bottom: 20px;
}

.untagged-section label {
  background: #dddddd;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  margin: 5px;
}

.untagged-section {
  border: 2px solid gray;
  padding: 20px;
}

.untagged {
  opacity: 0.3;
}

</style>

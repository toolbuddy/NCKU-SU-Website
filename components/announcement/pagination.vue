<template>
  <ul class="pagination">
    <router-link tag="a" v-bind:to="{path: '/'}"> prev </router-link>
    <router-link tag="a" v-bind:to="{path: '/'}" v-for="(element, index) in this.forNumber" 
      v-bind:key="element" v-bind:class="{active: getPageNumber(index) === currentPage}">
        {{getPageNumber(index)}}
    </router-link>
    <router-link tag="a" v-bind:to="{path: '/'}"> next </router-link>
  </ul>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    total: Number,
    displayPage: Number,
    currentPage: Number
  },
  computed: {
    totalPage: function () {
      return Math.ceil(this.total / this.displayPage)
    },
    forNumber: function () {
      if (this.displayPage > this.totalPage) {
        return this.totalPage
      }
      return this.displayPage
    }
  },
  methods: {
    getPageNumber: function (index) {
      if (this.currentPage >= this.totalPage - this.displayPage / 2) {
        return index + 1 + this.totalPage - this.displayPage
      }
      if (this.currentPage > this.displayPage / 2) {
        return index + 1 + this.currentPage - this.displayPage / 2
      }
      return index + 1
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
.pagination {
    display: inline-block;
}

.pagination a {
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
}

.pagination a.active {
    background-color: #4CAF50;
    color: white;
}

.pagination a:hover:not(.active) {
  background-color: #ddd;
}
</style>

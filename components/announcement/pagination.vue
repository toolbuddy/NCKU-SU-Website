<template>
  <ul class="pagination">
    <router-link tag="a" v-bind:to="{path: './' + (currentPage - 1)}" v-bind:class="{ disabled: disabledLeft === true}"> prev </router-link>
    <router-link tag="a" v-bind:to="{path: './' + getPageNumber(index)}" v-for="(element, index) in this.forNumber" 
      v-bind:key="element" v-bind:class="{active: getPageNumber(index) === currentPage}">
        {{getPageNumber(index)}}
    </router-link>
    <router-link tag="a" v-bind:to="{path: './' + (currentPage + 1)}" v-bind:class="{ disabled: disabledRight === true}"> next </router-link>
  </ul>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    total: Number,
    displayPage: Number,
    postPerPage: Number,
    currentPage: Number
  },
  computed: {
    totalPage: function () {
      return Math.ceil(this.total / this.postPerPage)
    },
    forNumber: function () {
      if (this.displayPage > this.totalPage) {
        return this.totalPage
      }
      return this.displayPage
    },
    disabledLeft: function () {
      return this.currentPage === 1
    },
    disabledRight: function () {
      return this.currentPage === this.totalPage
    }
  },
  methods: {
    getPageNumber: function (index) {
      if (this.forNumber === this.totalPage) {
        return index + 1
      }
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
    console.log(this.currentPage)
  }
}
</script>

<style scoped>

.disabled {
  pointer-events: none; 
  opacity: 0.6;        
}

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

<template>
  <div>
    <transition-group v-bind:name="scroll ? 'slide-left' : 'slide-right'">
      <section v-bind:key="index" class="img-slider">
        <router-link v-bind:to="{path: `/announcement/detail/${topnews[index].id}`}" >
          <img v-bind:src="topnews[index].image" alt="學生會重要公告圖片"/>
        </router-link>
        <router-link v-bind:to="{path: `/announcement/detail/${topnews[index].id}`}" >
          <section class="title">
            <h1> {{topnews[index].title}} </h1>
            <h2> {{topnews[index].subtitle}} </h2>
          </section>
        </router-link>
      </section>
    </transition-group>
    <i class="fas fa-caret-left left" v-on:click="shift(0)"></i>
    <i class="fas fa-caret-right right" v-on:click="shift(1)"></i>
    <section class="status">
      <svg v-bind:width="topnews.length * 20 + 5" height="20">
        <circle v-for="iter of topnews.length" v-bind:key="iter" v-bind:cx="(iter - 1) * 20 + 10" cy="10" r="3.5" v-bind:stroke-width="index === iter - 1 ? 0 : 1" stroke="#6f6f70" v-bind:fill="index === iter - 1 ? '#6f6f70' : 'transparent'" />
      </svg>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    topnews: Array,
    max: Number
  },
  mounted () {
    console.log(this.topnews)
  },
  data () {
    return {
      index: 0,
      scroll: false
    }
  },
  methods: {
    touch: function (event) {
      const touch = event.targetTouches[0]
      this.touchEventData = {
        x: touch.pageX,
        y: touch.pageY,
        time: new Date()
      }
      this.$el.querySelector('div').addEventListener('touchmove', this.move, false)
    },
    move: function (event) {
    },
    shift: function (direction) {
      if (direction) {
        this.scroll = true
        this.index = (this.index + 1) % this.topnews.length
      } else {
        this.scroll = false
        this.index = (this.index + this.topnews.length - 1) % this.topnews.length
      }
    }
  }
}
</script>

<style scoped>

div {
  overflow-x: hidden;
  width: 100vw;
  height: 175vw;
}

h1 {
  font-size: 6.4vw;
  color: white;
  margin-top: 5vw;
}
h2 {
  font-size: 4.8vw;
  color: white;
}


.img-slider {
  position: relative;
  width: 100vw;
  height: auto;
  margin: 24vw auto 0 auto;
}

img {
  position: absolute;
  width: 99vw;
  height: 99vw;
  object-fit: fill;
  object-position: top; 
}

.title {
  position: absolute;
  top: 90.8vw;
  width: 100vw;
  height: 43vw;
  margin: auto;
  background-color:rgba(81,81,81,0.48);
  border: 0px;
  padding-left: 11vw;
  padding-right: 11vw;
  box-sizing: border-box;
}

ul {
  padding: 0;
}

li {
  float: left;
}

.left {
  position: absolute;
  top: 87vw;
  left: 5vw;
  color: #FFFFFF;
  font-size: 15vw;
  text-shadow: 0px 0px 1px #b4b4b5;
}
.right {
  position: absolute;
  top: 87vw;
  left: 90vw;
  color: #FFFFFF;
  font-size: 15vw;
  text-shadow: 0px 0px 1px #b4b4b5;
}

.status {
  position: absolute;
  top: 166vw;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 99;
}


.slide-left-leave-active,
.slide-left-enter-active {
  transition: .3s ease-out;
}
.slide-left-enter {
  transform: translate(100%, 0);
}
.slide-left-leave-to {
  transform: translate(-100%, 0);
}

.slide-right-leave-active,
.slide-right-enter-active {
  transition: .3s ease-out;
}
.slide-right-enter {
  transform: translate(-100%, 0);
}
.slide-right-leave-to {
  transform: translate(100%, 0);
}
</style>

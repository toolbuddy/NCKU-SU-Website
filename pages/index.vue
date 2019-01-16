<template>
  <div>
    <topnews v-bind:topnews="topnews" v-bind:max="topnews.length"></topnews>
    <div>
      <section class="grid grid-gap-6">
        <span class="grid">
          <svg width="22vh" height="22vh" viewbox="0 0 500 500">
            <image xlink:href="~/assets/img/system/fig01.svg" width="100%" height="100%"></image>
          </svg>
          <span>
            <h3>文章總覽</h3>
            <h5>喚起年輕世代對政治的想望，<br>以及政治對世代青年的重視。</h5>
          </span>
        </span>
        <router-link v-for="(iter, index) of announcements" v-bind:key="index" v-bind:to="`/announcement/detail/${iter.id}`"><announcement-column v-bind:url="iter.image" v-bind:title="iter.title" v-bind:subtitle="iter.subtitle"> </announcement-column></router-link>
        <router-link v-if="topnews.length > 3" to="/announcement/" > <label class="green-color">顯示更多</label> </router-link>
      </section>
    </div>
    <div class="gray-background">
      <section class="grid grid-gap-6">
        <span class="grid">
          <svg width="22vh" height="22vh" viewbox="0 0 500 500">
            <image xlink:href="~/assets/img/system/fig02.svg" width="100%" height="100%"></image>
          </svg>
          <span>
            <h3>公民提問投票</h3>
            <h5>五大面向、十五題提問，<br>交由公民投出最終四題，送進辯論會！</h5>
          </span>
        </span>
        <router-link to="/vote/1" tag="section"><h4>學生提問</h4><h5>📢 學生進入市府</h5><h5>📢 打工違法低薪</h5><h5>📢 得過且過的火車站</h5></router-link>
        <router-link to="/vote/2" tag="section"><h4>文化提問</h4><h5>📢 文創產業過度商業化</h5><h5>📢 文資保存實務困境</h5><h5>📢 歷史城區特別條例</h5></router-link>
        <router-link to="/vote/3" tag="section"><h4>環境提問</h4><h5>📢 事業廢棄物處理</h5><h5>📢 淹水の臺南</h5><h5>📢 農地違章工廠</h5></router-link>
        <router-link to="/vote/4" tag="section"><h4>交通提問</h4><h5>📢 城鄉發展不均</h5><h5>📢 公共運輸網路規劃</h5><h5>📢 交通亂象</h5></router-link>
        <router-link to="/vote/5" tag="section"><h4>教育提問</h4><h5>📢 性平教育</h5><h5>📢 親職支持系統</h5><h5>📢 校內不當管教</h5></router-link>
      </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import announcementColumn from '~/components/index/announcementColumn.vue'
import Topnews from '~/components/index/topnews.vue'

export default {
  components: {
    announcementColumn,
    Topnews
  },
  data () {
    return {
      announcements: [],
      send: false,
      sender: '',
      subject: '',
      content: '',
      show: false,
      topnews: []
    }
  },
  async asyncData () {
    try {
      const result = await axios.get('/api/getAnnouncementsCurrent')
      return {
        topnews: result.data
      }
    } catch (error) {
      console.log('Get announcement current failed')
      console.log(error)
    }
  },
  mounted () {
    this.announcements = this.topnews.slice(0, 3)
  }
}
</script>

<style scoped>
@media only screen and (max-width: 400px) {
  h1 {
    font-size: 6.93vw;
    color: white;
  }
  h2 {
    font-size: 4.8vw;
    color: white;
  }
  h3 {
    font-size: 6.93vw;
    color:#707070;
    text-align: center;
    margin-bottom: 3vw;
  }
  h4 {
    color:#707070;
    font-size: 5.33vw;
    width: 100%;
    text-align: left;
    margin: 1vw 0;
  }
  h5 {
    font-size: 4.26vw;
    color: #707070;
    text-align: center; 
  }
  a {
    text-decoration: none;
  }
  section {
    width: 100vw;
    padding: 6vw;
    box-sizing: border-box;
  }
  section section {
    width: 88vw;
    background-color: #FFFFFF;
    box-shadow: 0px 3px 6px #CDCDCD;
    border-radius: 8px;
    padding: 5vw;
    margin: 0;
    box-sizing: border-box;
  }
  section section h5 {
    font-size: 4.26vw;
    color: #707070;
    text-align: left;
  }
  .green-color {
    color: #09A6AA;
  }
  .gray-background {
    background-color: #F6F6F6;
  }
  .grid {
    display: grid;
    justify-items: center;
    justify-content: center;
  }
  .grid-gap-6 {
    grid-gap: 6vw;
  }
}

@media only screen and (min-width: 800px) {
  div {
    width: 100vw;
  }
  h1 {
    font-size: 2em;
    color: white;
  }
  h2 {
    font-size: 1em;
    color: white;
  }
  h3 {
    font-size: 3em;
    color:#707070;
    text-align: center;
    margin-bottom: 1em;
  }
  h4 {
    color:#707070;
    font-size: 2em;
    width: 100%;
    text-align: left;
    margin: 1vh 0;
  }
  h5 {
    font-size: 1.5em;
    color: #707070;
    text-align: center; 
  }
  a {
    text-decoration: none;
  }
  section {
    width: 66vw;
    padding: 6vh;
    box-sizing: border-box;
    margin: 0 auto;
  }
  section section {
    width: 550px;
    height: 250px;
    background-color: #FFFFFF;
    box-shadow: 0px 3px 6px #CDCDCD;
    border: 1px solid #CDCDCD;
    border-radius: 8px;
    padding: 20px 50px;
    margin: 0;
    box-sizing: border-box;
    cursor: pointer;
  }
  section span {
    grid-area: svg;
  }
  section span span {
    grid-area: title;
  }
  section span svg {
    grid-area: svg;
  }

  section section h5 {
    font-size: 1.4em;
    color: #707070;
    text-align: left;
  }
  .green-color {
    color: #09A6AA;
  }
  .gray-background {
    background-color: #F6F6F6;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: 
      "svg svg"
      "title title"
      "column column";
    justify-items: center;
    justify-content: center;
  }
  .grid-gap-6 {
    grid-gap: 3em;
  }
}
</style>
<template>
  <header>
    <div class="bg">
    <h2>成大學生會</h2>

    <section class="float_right">
    <ul class="custom-ul-style">
      <li><a href="#"> 文章總覽 </a></li>
      <li><a href="#"> 公共政策參與平台 </a></li>
      <li><a href="#"> 關於學生會 </a></li>
      <li><a href="#"> 聯絡我們   </a></li>
    </ul>
    </section>
    <!-- <ul class="custom-ul-style float-right">
      <li><router-link :to="{path: '/account/login'}"> 登入 </router-link></li>
      <li><a href="#"> 臉書 </a></li>
      <li><a href="#"> IG </a></li>
    </ul> -->
    </div>
  </header>
</template>

<script>
  export default {
    name: 'custom-header'
  }
</script>

<style scoped>
  .bg {
    height:53px;
    width:100%;
    position: fixed;
    background-color: #FFFFFF;
    opacity: 0.5;
    z-index: 69;
  }
  .float_right {
    padding-right: 20px;
    float:right;
  }
  h2 {
    padding-left: 20px;
    color: #09A6AA;
    font-size: 23px;
    display: inline;
    text-decoration:none;
  }
  ul {
    display: inline;
  }
  ul.custom-ul-style {
    font-size: 23px;
    list-style-type: none;
  }
  ul.custom-ul-style li {
    display: inline;
  }
  ul.custom-ul-style li+li:before {
    padding: 20px;
    color: #09A6AA;
    content: " ";
  }
  ul.custom-ul-style li a {
    color: #09A6AA;
    text-decoration: none;
  }
  ul.custom-ul-style li a:hover {
    color: #09A6AA;
    text-decoration:none;
  }
  </style>

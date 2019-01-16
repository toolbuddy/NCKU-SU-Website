<template>
  <div>
    <img v-bind:src="url" alt="學生會網站首頁的文章圖片"/>
    <section>
      <h1> {{title}} </h1>
      <h3> {{subtitle}} </h3>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    url: String,
    title: String,
    subtitle: String
  }
}
</script>

<style scoped>
div {
  width: 80vw;
  height: 38.94vw;
  position: relative;
  border-left: 2.14vw solid #eaeaea;
  margin: 0 auto 2.14vw auto;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Do not scale the image */
  object-position: center; /* Center the image within the element */
  margin: auto;
  -webkit-filter: brightness(50%);
}
h1 {
  color: #ffffff;
  font-size: 4.8vw;
}
h3 {
  color: #ffffff;
  font-size: 4vw;
}
section {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  padding: 12.8vw 7.8vw;
}
</style>

<template>
  <div class="fileColumn">
    <figure>
      <img/>
    </figure>
    <div class="overlay">
      <label>{{ file.name }}</label>
      <i class="fas fa-times remove" v-on:click="removeFile"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ['index', 'file'],
  mounted () {
    const reader = new FileReader()
    if ((/\.(jpe?g|png|gif)$/i).test(this.file.name)) {
      reader.onload = (e) => {
        // create the object url
        const url = window.URL.createObjectURL(this.file)
        this.$el.querySelector('img').src = url
      }
      reader.readAsDataURL(this.file)
    } else {
      // TODO: change to use font awesome icon.
      this.$el.classList.add('fas')
      this.$el.classList.add('fa-file')
      this.$el.classList.add('fa-5x')
    }
  },
  methods: {
    removeFile: function () {
      this.$emit('removeFile')
    }
  }
}
</script>

<style>
.fileColumn {
    display: inline-block;
    position: relative;
    width: 100px;
    height: 100px;
    margin: 10px;
    padding: 10px;
    overflow: hidden;
    border: 1px solid #ddd;
  }

  .fileColumn figure {
    display: block;
    height: 100px;
    width: 100px;
    line-height: 100px;
    text-align: center;
    color: gray;
    object-fit: cover; /* Do not scale the image */
    object-position: center; /* Center the image within the element */
    margin: auto;
    border-radius: 15px;
  }
  .fileColumn figure img {
    display: block;
    height: 100px;
    width: 100px;
    object-fit: cover; /* Do not scale the image */
    object-position: center; /* Center the image within the element */
    margin: auto;
    border-radius: 15px;
  }

  .fileColumn .overlay {
    position: absolute;
    display: block;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    height: 100px;
    width: 100px;
    transition: .3s ease;
    margin: auto;
    border-radius: 15px;
  }

  .fileColumn:hover .overlay {
    background-color: rgba(0, 0, 0, 0.67);
  }

  .overlay label {
    position: absolute;
    top: 70px;
    width: 100px;
    height: 20px;
    overflow: hidden;
    font-size: 16px;
    text-align: center;
    color: black;
    transition: .3s ease;
  }

  .fileColumn:hover .overlay label {
    color: white;
  }

  .overlay i {
    position: absolute;
    font-size: 24px;
    top: 4px;
    left: 74px;
    color: antiquewhite;
    cursor: pointer;
    opacity: 0;
    transition: .3s ease;
  }

  .fileColumn:hover .overlay i {
    opacity: 1;
  }

</style>

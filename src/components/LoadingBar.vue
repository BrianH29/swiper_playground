<template>
  <div v-if="isLoading" class="loading_container">
    <div class="bg_loading">
      <img :src="getImage" alt="loadingImg" class="loading_img">
    </div>
  </div>
</template>

<script>
import bus from '../utils/bus';

export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      iconIdx: 1,
      min: 1,
      max: 4,
      loadingInterval: null,
    }
  },
  computed: {
    getImage() {
      // return require(`@/assets/img/imgloading0${ this.iconIdx }.png`)
      return require('@/assets/img/img_loading0'+ this.iconIdx +'.png')
    }
  },
  created() {
    bus.$emit('start:loading');
    this.loadingInterval = setInterval( () => {
      this.iconIdx = this.getRandomNo();
    }, 100);
  },
  methods: {
    getRandomNo() {
      return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    }
  },
  mounted() {
    setTimeout( () => {
      bus.$emit('end:loading');
    }, 5000)
  },
}
</script>

<style scoped>
.loading_container{
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color: rgba(0,0,0,0);
}
.bg_loading{
  position: fixed;
  top:50%;
  left:50%;
  width: 100px;
  height: 100px;
  border-radius: 70px;
  background-color: #eeeeee;
  margin-top:-50px;
  margin-left:-50px;
}
.loading_img{
  align-items: center;
  width: 100%;
  height: 100%;
  object-fit: none;
}
</style>

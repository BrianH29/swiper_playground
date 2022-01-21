<template>
  <div id="app">
    <LoadingBar :isLoading="loadingStatus"></LoadingBar>
<!--    <swiper>-->
<!--      <swiper-slide>1</swiper-slide>-->
<!--      <swiper-slide>2</swiper-slide>-->
<!--      <swiper-slide>3</swiper-slide>-->
<!--    </swiper>-->

    <swipe-list
      ref="list"
      class="card"
      :disabled="!enabled"
      :items="mockSwipeList"
      item-key="id"
      @swipeout:click="itemClick"
    >
      <template v-slot="{ item, index, revealLeft, revealRight, close }">
        <!-- item is the corresponding object from the array -->
        <!-- index is clearly the index -->
        <!-- revealLeft is method which toggles the left side -->
        <!-- revealRight is method which toggles the right side -->
        <!-- close is method which closes an opened side -->
        <div class="card-content">
          <!-- style content how ever you like -->
          <h2>{{ item.title }}</h2>
          <p>{{ item.description }}</p>
          <span>{{ index }}</span>
        </div>
      </template>
      <!-- left swipe side template and v-slot:left="{ item }" is the item clearly -->
      <!-- remove if you dont wanna have left swipe side  -->
      <template v-slot:left="{ item, close }">
        <div class="swipeout-action red" title="remove" @click="remove(item)">
          <!-- place icon here or what ever you want -->
          <i class="fa fa-trash"></i>
        </div>
        <div class="swipeout-action purple" @click="close">
          <!-- place icon here or what ever you want -->
          <i class="fa fa-close"></i>
        </div>
      </template>
      <!-- right swipe side template and v-slot:right"{ item }" is the item clearly -->
      <!-- remove if you dont wanna have right swipe side  -->
      <template v-slot:right="{ item }">
        <div class="swipeout-action blue">
          <!-- place icon here or what ever you want -->
          <i class="fa fa-heart"></i>
        </div>
        <div class="swipeout-action green">
          <!-- place icon here or what ever you want -->
          <i class="fa fa-heart"></i>
        </div>
      </template>
      <template v-slot:empty>
        <div>
          <!-- change mockSwipeList to an empty array to see this slot in action  -->
          list is empty ( filtered or just empty )
        </div>
      </template>
    </swipe-list>
  </div>
</template>

<script>
import LoadingBar from "@/components/LoadingBar";
import bus from './utils/bus';
import { SwipeList, SwipeOut } from 'vue-swipe-actions';
import 'vue-swipe-actions/dist/vue-swipe-actions.css';

export default {
  name: 'App',
  components: {
    LoadingBar,
    SwipeList,
    SwipeOut
  },
  data() {
    return {
      loadingStatus: false,
      enabled: true,
      mockSwipeList: [
        {
          id: 0,
          title: "Some title",
          description: "some description"
        },
        {
          id: 1,
          title: "Some title",
          description: "some description"
        },
        {
          id: 2,
          title: "Some title",
          description: "some description"
        }
      ]
    }
  },
  created(){
    bus.$on('start:loading', this.loadingStart);
    bus.$on('end:loading', this.loadingEnd);
  },
  methods: {
    loadingStart() {
      this.loadingStatus = true
    },
    loadingEnd(){
      this.loadingStatus = false
    },
    revealFirstRight() {
      this.$refs.list.revealRight(0);
    },
    revealFirstLeft() {
      this.$refs.list.revealLeft(0);
    },
    closeFirst() {
      this.$refs.list.closeActions(0);
    },
    closeAll() {
      this.$refs.list.closeActions();
    },
    remove(item) {
      this.mockSwipeList = this.mockSwipeList.filter(i => i !== item);
      // console.log(e, 'remove');
    },
    itemClick(e) {
      console.log(e, "item click");
    },
    fbClick(e) {
      console.log(e, "First Button Click");
    },
    sbClick(e) {
      console.log(e, "Second Button Click");
    },
  },
  beforeDestroy() {
    bus.$off('start:loading');
    bus.$off('end:loading');
  },

}
</script>

<style lang="scss" scoped>
html,
body {
  position: relative;
  height: 100%;
}

body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/*swiper-list out*/
.swipeout-action {
  display: flex;
  align-items: center;
  padding: 0 3rem;
  cursor: pointer;
  left: 0;
}

.swipeout-action.blue {
  color: white;
  background-color: rgb(0, 122, 255);
}
.swipeout-action.blue:hover {
  background-color: darken(rgb(0, 122, 255), 5%);
}
.swipeout-action.purple {
  color: white;
  background-color: rgb(88, 86, 214);
}
.swipeout-action.purple:hover {
  background-color: darken(rgb(88, 86, 214), 5%);
}

.swipeout-action.red {
  color: white;
  background-color: rgb(255, 59, 48);
}
.swipeout-action.red:hover {
  background-color: darken(rgb(255, 59, 48), 5%);
}
.swipeout-action.green {
  color: white;
  background-color: rgb(76, 217, 100);
}
.swipeout-action.green:hover {
  background-color: darken(rgb(76, 217, 100), 5%);
}
</style>

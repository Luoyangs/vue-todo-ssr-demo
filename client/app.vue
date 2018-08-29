<template>
  <div id="app">
    <common-header></common-header>
    <router-view />
    <common-footer></common-footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: 'this is text'
    }
  },
  components: {
    CommonHeader: () => import('./components/common-header.vue'),
    CommonFooter: () => import('./components/common-footer.vue')
  }
}
</script>

 <style lang="scss">
 #app{
   position: absolute;
   left: 0;
   top: 0;
   width: 100%;
   height: 100%;
   background: rgba(0, 0, 0, .35);
 }
 </style>

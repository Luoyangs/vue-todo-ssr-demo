<template>
  <ul class="list-filter-tabs">
    <li :class="['filter-tab', {'right': tab.align === 'right'}, {'active': tab.index === active}]" v-for="(tab, index) in tabs" :key="index" @click="tabItemClick(tab)">{{tab.label}}</li>
  </ul>
</template>
<script>
export default {
  props: ['tabs'],
  data () {
    return {
      active: 'todo'
    }
  },
  methods: {
    tabItemClick(tab) {
      this.active = tab.index;
      this.$emit('filter-active', tab.index)
    }
  }
}
</script>
<style lang="scss">
.list-filter-tabs{
  display: block;
  overflow: hidden;
  margin-left: -20px;
  .filter-tab{
    display: inline-block;
    float: left;
    padding: 12px;
    &.active{
      border-bottom: 1px solid #ff3355;
    }
    &.right{
      float: right;
      &.active{
        border-bottom: none;
      }
    }
  }
}
</style>

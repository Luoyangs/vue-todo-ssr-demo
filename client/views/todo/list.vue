<template>
  <div :class="$style.todoList">
    <div class="input__wrapper">
      <input type="text" v-model="title" ref="title" autofocus="autofocus" class="input-class" placeholder="Input Todo Item With Enter Press..." @keyup.enter="keyupEnter('foucs')">
      <input type="text" v-model="content" ref="content" class="input-subclass" placeholder="here is desc..." @keyup.enter="keyupEnter('sub')">
    </div>
    <div class="list-wrapper">
      <list-item v-for="(item, index) in filterList" :key="index" :item="item" @item-check="itemCheck" @item-del="itemDelete"/>
    </div>
    <filter-tabs :tabs="filterTabs" @filter-active="filterChange"/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: [],
      subFocus: false,
      title: '',
      content: '',
      active: '',
      filterTabs: [
        {
          index: 'todo',
          label: '待办'
        },
        {
          index: 'done',
          label: '已完成'
        },
        {
          index: 'all',
          label: '全部'
        },
        {
          index: 'clear',
          label: '清空已完成',
          align: 'right'
        }
      ]
    }
  },
  components: {
    ListItem: () => import('../../components/list-item.vue'),
    FilterTabs: () => import('../../components/fliter-tab.vue')
  },
  computed: {
    filterList () {
      let active = this.active
      if (['done'].includes(active)) {
        return this.list.filter(item => item.checked)
      } else if (['clear', 'todo'].includes(active)) {
        let arrs = this.list.filter(item => !item.checked)
        if (['clear'].includes(active)) {
          this.list = arrs
        }
        return arrs
      }
      return this.list
    }
  },
  methods: {
    keyupEnter (type) {
      if (type === 'foucs') {
        this.$refs.content.focus()
        return
      }
      let id = this.list.length ? this.list[0].id + 1 : 0
      this.list.unshift({
        id: id,
        title: this.title.replace(/\s/, ''),
        content: this.content.replace(/\s/, ''),
        checked: false
      })
      this.title = ''
      this.content = ''
      this.$refs.title.focus()
    },
    itemCheck (id) {
      let item = this.list.find(item => item.id === id)
      item.checked = !item.checked
    },
    itemDelete (id) {
      let arrs = this.list.filter(item => item.id !== id)
      this.list = arrs
    },
    filterChange (index) {
      this.active = index
    }
  }
}
</script>
<style lang="scss" module>
.todo-list{
  position: relative;
  top: 120px;
  width: 80%;
  margin: 0 auto;
  max-width: 1000px;
  max-height: 680px;
  background: #ffffff;
  padding: 20px;
  border-radius: 5px;
  overflow: hidden;
  z-index: 99;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.4);
  .input__wrapper{
    border-bottom: 1px solid #f2f2f2;
  }
  .list-wrapper{
    max-height: 500px;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .input-class, .input-subclass{
    width: 100%;
    overflow: hidden;
    display: block;
    line-height: 40px;
    font-size: 20px;
    border: none;
    outline: medium;
    text-indent: 4em;
    
  }
  .input-subclass{
    font-size: 14px;
    line-height: 28px;
    text-indent: 5.8em;
  }
}
</style>


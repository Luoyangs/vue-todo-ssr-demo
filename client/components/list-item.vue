<template>
  <div class="todo-list__item">
    <div class="todo-list__item--wrapper" @click="$emit('item-check', item.id)">
      <img v-if="item.checked" src="../assets/images/done.svg" alt="">
      <img v-if="!item.checked" src="../assets/images/round.svg" alt="">
      <div class="text" :class="{'checked': item.checked}">
        <p class="title">{{item.title}}</p>
        <p class="content">{{item.content}}</p>
      </div>
    </div>
    <span class="close" @click="$emit('item-del', item.id)">x</span>
  </div>
</template>
<script>
export default {
  props: ['item']
}
</script>
<style lang="scss">
.todo-list__item{
  display: flex;
  padding: 12px;
  border-bottom: 1px solid #f2f2f2;
  &:last-child{
    border-bottom: none;
  }
  &:hover{
    cursor: pointer;
    .close{
      display: inline-block;
    }
  }
  &--wrapper{
    flex: 1;
    display: flex;
    img{
      width: 50px;
      height: 50px;
    }
    .text{
      padding-left: 18px;
      flex: 1;
      .title{
        padding: 0;
        font-size: 20px;
        line-height: 34px;
        height: 34px;
        color: #555;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .content{
        font-size: 14px;
        color: #aaa;
        line-height: 16px;
        max-height: 32px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &.checked{
        opacity: .6;
        text-decoration: line-through;
        text-decoration-color: #999;
      }
    }
  }
  .close{
    display: none;
    margin-top: 20px;
    font-size: 16px;
    width: 20px;
    height: 20px;
    line-height: 22px;
    text-align: center;
    color: #888;
  }
}
</style>

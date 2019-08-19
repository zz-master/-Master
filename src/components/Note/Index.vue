<template>
  <div class="note-wapper">
    <NoteList></NoteList>
    <div class="message">
      <span class="sloved"></span> 已解决
    </div>
    <div class="message">
      <span class="sloving"></span>进行中
    </div>
  </div>
</template>
<script>
import NoteList from './NoteList.vue'
export default {
  data() {
    return {}
  },
  components: {
    NoteList
  }
}
</script>
<style lang="scss">
.note-wapper {
  height: calc(100% - 240px);
  padding: 10px 0;
  border-top: 1px solid #d5d5d5;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  .title {
    font-weight: 400;
  }
  span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 5px;
  }
  .sloved {
    background: #5ec7b7;
  }
  .sloving {
    background: #007cff;
  }
}
</style>
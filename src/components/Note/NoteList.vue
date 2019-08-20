<template>
  <div class="note-list-wapper">
    <template v-if="noteList.length > 0">
      <div
        v-for="(note,index) in noteList"
        :key="index"
        class="message"
        @click="handleNoteChose(note)"
      >
        <span :class="{sloved:note.status === 3,sloving:note.status === 2}"></span>
        {{note.title}}
      </div>
    </template>
    <template v-else>
      <div class="message">暂无问题</div>
    </template>
  </div>
</template>
<script>
import masterService from '../../service/base.js'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      noteList: []
    }
  },
  computed: {
    ...mapState({
      creatNote: state => state.global.creatNote,
      solovedNote: state => state.global.solovedNote
    })
  },
  watch: {
    creatNote() {
      this.apiGetNoteList()
    },
    solovedNote() {
      this.apiGetNoteList()
    }
  },
  methods: {
    async apiGetNoteList() {
      try {
        let { data: { code, msg, notes } } = await masterService.apiSelfNoteList()
        console.warn('[api][获取个人问题列表]', code, notes, msg)
        this.noteList = notes
      } catch (err) {
        console.warn('[api][获取个人问题列表]', err)
      }
    },
    handleNoteChose(note) {
      this.$router.replace({ name: 'list', query: { noteId: note.id, time: new Date().getTime() } })
    }
  },
  mounted() {
    this.apiGetNoteList()
  }
}
</script>
<style lang="scss">
.note-list-wapper {
  flex: 1;
  overflow: auto;
  .message {
    margin-top: 5px;
    cursor: pointer;
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
<template>
  <div class="detail-list">
    <div class="detail-list-parent">
      <div class="title">{{detailParent.title}}</div>
      <div class="text mt10">@{{detailParent.master_nickname}}</div>
      <div v-if="detailParent.status ===3">已解决</div>
      <div
        class="button mt10"
        v-if="detailParent.status ===2"
        @click="handleSolveNote(detailParent)"
      >解决</div>
      <div class="button" @click="handleUpdateNote">继续提问</div>
    </div>
    <div class="text parent-text">
      <div>作者:{{detailParent.author_nickname}} 时间:{{detailParent.created}}</div>
      <div class="message mt10">{{detailParent.content}}</div>
    </div>
    <div class="detail-list-childs" v-show="detailChild.length >0">
      <div class="detail-item-childs" v-for="(child,index) in detailChild" :key="index">
        <div>作者:{{child.author_nickname}} 时间:{{child.created}}</div>
        <div class="message mt10">{{child.content}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import masterService from '../../service/base.js'
export default {
  data() {
    return {
      detailParent: {},
      detailChild: []
    }
  },
  computed: {
    noteId() {
      return this.$route.query.noteId
    }
  },
  watch: {
    noteId() {
      this.apiGetDetailList()
    }
  },
  methods: {
    async apiGetDetailList() {
      try {
        let { data: { code, note, childs } } = await masterService.apiNoteDetail(this.noteId)
        console.warn('[api][获取问题详情]', code, note, childs)
        if (code !== 10000000) {
          return
        }
        this.detailChild = childs
        this.detailParent = note
      } catch (err) {
        console.warn('[api][获取问题详情]', err)
      }
    },
    async handleSolveNote(detail) {
      try {
        let result = await masterService.apiSolveNote(detail.id)
        this.$store.dispatch('updateSolovedNoteStatus')
        console.warn('[api][解决问题]', result)
      } catch (err) {
        console.warn('[api][解决问题]', err)
      }
    },
    async handleUpdateNote() {
      this.$router.replace({ name: 'add', query: { noteId: this.noteId, time: new Date().getTime() } })
    }
  },
  mounted() {
    this.apiGetDetailList()
  }
}
</script>
<style lang="scss">
.detail-list {
  .detail-list-parent {
    .title {
      height: 40px;
      line-height: 40px;
    }
    .button {
    }
  }
  .parent-text {
    border: 1px solid #cccccc;
    margin-top: 20px;
    padding: 15px;
    border-radius: 4px;
    box-shadow: 5px 0px 16px 0px rgba(0, 0, 0, 0.07);
    padding-right: 80px;
    position: relative;
    .message {
      text-align: left;
    }
  }
  .detail-list-childs {
    .detail-item-childs {
      border: 1px solid #cccccc;
      margin-top: 20px;
      padding: 10px;
      border-radius: 4px;
      box-shadow: 5px 0px 16px 0px rgba(0, 0, 0, 0.07);
    }
    .message {
      text-align: left;
    }
  }
}
</style>
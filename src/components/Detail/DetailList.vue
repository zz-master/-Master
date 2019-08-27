<template>
  <div class="detail-list">
    <div class="detail-list-parent">
      <div class="let-title">{{detailParent.title}}</div>
      <div>
        <span class="let-info">@{{detailParent.master_nickname}}</span>
        <button
          class="let-button"
          v-if="detailParent.status ===2"
          @click="handleSolveNote(detailParent)"
        >解决</button>
      </div>
      <div class="let-sub" v-if="detailParent.status ===3">已解决</div>
      <div class="let-sub" v-if="detailParent.status ===2">未解决</div>
    </div>
    <div class="text parent-text">
      <div>
        <span class="let-info">作者:{{detailParent.author_nickname}} 时间:{{detailParent.created}}</span>
        <button class="let-button" @click="handleUpdateNote">继续提问</button>
      </div>
      <div class="let-content" v-html="detailParent.content"></div>
    </div>
    <div class="detail-list-childs" v-show="detailChild.length >0">
      <div class="detail-item-childs" v-for="(child,index) in detailChild" :key="index">
        <div class="let-info">作者:{{child.author_nickname}} 时间:{{child.created}}</div>
        <div class="let-content" v-html="child.content"></div>
      </div>
    </div>
  </div>
</template>
<script>
import masterService from '../../service/base.js'
import { mapState } from 'vuex'
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
    },
    ...mapState({
      solovedNote: state => state.global.solovedNote
    })
  },
  watch: {
    noteId() {
      this.apiGetDetailList()
    },
    solovedNote() {
      this.apiGetDetailList()
    }
  },
  methods: {
    async apiGetDetailList() {
      try {
        let { data: { code, note, childs } } = await masterService.apiNoteDetail(this.noteId)
        console.warn('[api][获取问题详情]', code, note, childs)
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
  height: 100%;
  overflow: auto;
  .parent-text {
    border: 1px solid #cccccc;
    margin-top: 20px;
    padding: 15px;
    border-radius: 4px;
    box-shadow: 5px 0px 16px 0px rgba(0, 0, 0, 0.07);
    position: relative;
    .message {
      text-align: left;
    }
  }
  .detail-list-childs {
    max-height: calc(100% - 180px);
    overflow: auto;
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
  .let-button {
    height: 24px;
    padding: 2px 20px;
    float: right;
  }
  .let-content {
    margin-top: 5px;
  }
}
</style>
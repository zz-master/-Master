<template>
  <div class="detail-list">
    <div class="detail-list-parent">
      <div class="title">{{detailParent.title}}</div>
      <div class="text mt10">@{{detailParent.author_nickname}}</div>
      <div v-if="detailParent.status ===3">已解决</div>
      <div
        class="button mt10"
        v-if="detailParent.status ===2"
        @click="handleSolveNote(detailParent)"
      >解决</div>
    </div>
    <div class="text parent-text">
      <div>{{detailParent.author_nickname}}</div>
      <div class="message mt10">{{detailParent.content}}</div>
      <div class="button">补充</div>
    </div>
    <div class="detail-list-childs" v-show="detailChild.length >0">
      <div class="detail-item-childs" v-for="(child,index) in detailChild" :key="index">
        <div>继续补充</div>
        <div>{{child.content}}</div>
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
        // this.detailChild = childs
        this.detailParent = note
      } catch (err) {
        console.warn('[api][获取问题详情]', err)
      }
    },
    async handleSolveNote(detail) {
      console.warn('handleSolveNote', detail)
      try {
        let result = await masterService.apiSolveNote(detail.id)
        console.warn('apiSolveNote', result)
      } catch (err) {
        console.warn('apiSolveNote', err)
      }
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
    .button {
      position: absolute;
      top: 10px;
      right: 5px;
      padding: 10px;
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
  }
}
</style>
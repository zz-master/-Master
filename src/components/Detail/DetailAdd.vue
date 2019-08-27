<template>
  <div class="detail-add">
    <div class="let-title">{{detailParent.title}}</div>
    <button class="let-button" @click="handleUpdate">提交</button>
    <Simditor @change="change"></Simditor>
    <div class="detail-add-parent">
      <div class="message">
        <div class="let-info">作者:{{detailParent.author_nickname}} 时间:{{detailParent.created}}</div>
        <div class="let-content" v-html="detailParent.content"></div>
      </div>
    </div>
  </div>
</template>
<script>
import masterService from '../../service/base.js'
import Simditor from '../Simditor/Index.vue'
export default {
  data() {
    return {
      content: '',
      detailParent: {}
    }
  },
  components: {
    Simditor
  },
  mounted() {
    this.apiGetDetailList()
  },
  computed: {
    noteId() {
      return this.$route.query.noteId
    }
  },
  methods: {
    change(val) {
      console.warn(val)
      this.content = val
    },
    async apiGetDetailList() {
      try {
        let { data: { code, note, childs } } = await masterService.apiNoteDetail(this.noteId)
        console.warn('[api][获取问题详情]', code, note, childs)
        this.detailParent = note
      } catch (err) {
        console.warn('[api][获取问题详情]', err)
      }
    },
    async handleUpdate() {
      if (!this.content) {
        return
      }
      try {
        let params = {
          title: '',
          content: this.content,
          parent_id: this.detailParent.id,
          master_id: this.detailParent.master
        }
        let result = await masterService.apiCreatNote(params)
        console.warn('[api][更新帖子]', result)
        this.$router.replace({ name: 'list', query: { noteId: this.noteId, time: new Date().getTime() } })
      } catch (err) {
        console.warn('[api][更新帖子]', err)
      }
    }
  }
}
</script>
<style lang="scss">
.detail-add {
  position: relative;
  .let-title {
    margin-bottom: 10px;
  }
  .let-button {
    position: absolute;
    height: 24px;
    padding: 2px 20px;
    top: 2px;
    right: 10px;
  }
  .let-content {
    margin-top: 5px;
  }
  textarea {
    margin-top: 10px;
  }
  .detail-add-parent {
    border: 1px solid #cccccc;
    margin-top: 20px;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 5px 0px 16px 0px rgba(0, 0, 0, 0.07);
    .message {
      text-align: left;
    }
  }
}
</style>
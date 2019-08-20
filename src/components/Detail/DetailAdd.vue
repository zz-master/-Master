<template>
  <div class="detail-add">
    <div class="button" @click="handleUpdate">提交</div>
    <textarea name id cols="30" rows="10" v-model="content"></textarea>
    <div class="detail-add-parent">
      <div class="message">{{detailParent.content}}</div>
    </div>
  </div>
</template>
<script>
import masterService from '../../service/base.js'
export default {
  data() {
    return {
      content: '',
      detailParent: {}
    }
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
    async apiGetDetailList() {
      try {
        let { data: { code, note, childs } } = await masterService.apiNoteDetail(this.noteId)
        console.warn('[api][获取问题详情]', code, note, childs)
        if (code !== 10000000) {
          return
        }
        this.detailParent = note
      } catch (err) {
        console.warn('[api][获取问题详情]', err)
      }
    },
    async handleUpdate() {
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
  .button {
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
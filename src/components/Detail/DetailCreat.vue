<template>
  <div class="detail-creat-wapper">
    <div class="detail-title">
      <input class="special" type="text" v-model="title" placeholder="请输入你的问题题目" ref="noteTitle" />
    </div>
    <div class="detail-master">
      <span>@{{nickName}}</span>
      <button class="let-button" @click="handleCreatNote">提交</button>
    </div>
    <div class="detail-text">
      <Simditor @change="change"></Simditor>
    </div>
  </div>
</template>
<script>
import masterService from '../../service/base.js'
import Simditor from '../Simditor/Index.vue'
export default {

  data() {
    return {
      title: '',
      content: ''
    }
  },
  components: {
    Simditor
  },
  computed: {
    masterId() {
      return this.$route.query.masterId
    },
    nickName() {
      return this.$route.query.nick_name
    }
  },
  mounted() {
    this.$refs.noteTitle.focus()
  },
  methods: {
    async handleCreatNote() {
      if (!this.title || !this.content) {
        return
      }
      let params = {
        title: this.title,
        content: this.content,
        parent_id: -1,
        master_id: this.masterId
      }
      try {
        let { data: { code, note, msg } } = await masterService.apiCreatNote(params)
        console.warn('[api][创建帖子]', code, note, msg)
        this.$store.dispatch('updateNoteStatus')
        this.$store.dispatch('updateMasterStatus')
        this.$router.replace({ name: 'list', query: { noteId: note.id, time: new Date().getTime() } })
      } catch (err) {
        console.warn('apiCreatNote', err)
      }
    },
    change(val) {
      console.warn(val)
      this.content = val
    }
  }
}
</script>
<style lang="scss">
.detail-creat-wapper {
  .detail-title {
    .special {
      display: block;
      height: 60px;
      line-height: 60px;
      padding: 2px 20px;
      border: none;
      border-radius: 0;
      width: 100%;
      box-sizing: border-box;
      font-size: 24px;
      font-weight: 500;
      &::placeholder {
        color: rgba(0, 0, 0, 0.4);
        font-size: 24px;
      }
      &:focus {
        border: none;
        border-radius: 0;
        outline: none;
      }
    }
  }
  .detail-master {
    margin-left: 20px;
    margin-top: 20px;
    height: 30px;
    line-height: 30px;
  }
  .detail-text {
    margin-left: 20px;
    margin-top: 20px;
  }
  .let-button {
    height: 30px;
    padding: 2px 20px;
    float: right;
  }
}
</style>
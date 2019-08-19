<template>
  <div class="detail-list">
    <div class="detail-list-parent">
      <div>{{detailParent.title}}</div>
      <div>@{{detailParent.author_nickname}}</div>
      <div v-if="detailParent.status ===3">已解决</div>
      <div v-if="detailParent.status ===2" @click="handleSolveNote(detailParent)">解决</div>
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
      detailChild: [{
        "id": 42,
        "title": "",
        "content": "老师，关于昨天的问题我还是有些不明白……",
        "parent_id": 13,
        "author": 2,
        "author_nickname": "大德",
        "author_role": 1,
        "master": 1,
        "status": 2,
        "created": "2019-07-17T08:36:06.174174"
      },
      {
        "id": 17,
        "title": null,
        "content": "<p>好的，谢老师！</p>",
        "parent_id": 13,
        "author": 2,
        "author_nickname": "大德",
        "author_role": 1,
        "master": 1,
        "status": 3,
        "created": "2019-06-27T15:55:41.869808"
      },
      {
        "id": 16,
        "title": null,
        "content": "<p>放心，差别不是很大，都是Python代码，就算就差异，百度足以解决。</p>",
        "parent_id": 13,
        "author": 2,
        "author_nickname": "大德",
        "author_role": 1,
        "master": 1,
        "status": 2,
        "created": "2019-06-27T15:55:10.022222"
      },
      {
        "id": 15,
        "title": null,
        "content": "<p>那遇到 Python2的项目怎么办？差别大吗？</p>",
        "parent_id": 13,
        "author": 2,
        "author_nickname": "大德",
        "author_role": 1,
        "master": 1,
        "status": 2,
        "created": "2019-06-27T15:53:39.128013"
      },
      {
        "id": 14,
        "title": null,
        "content": "<p>Python3一定是趋势，Python2慢慢就会淡出市场的</p>",
        "parent_id": 13,
        "author": 2,
        "author_nickname": "大德",
        "author_role": 1,
        "master": 1,
        "status": 2,
        "created": "2019-06-27T15:52:37.868091"
      }
      ]
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
<template>
  <div class="self-master-wapper">
    <div
      class="item"
      v-for="(item,index) in list"
      :key="index"
      @click="handleOpenList(item)"
      :class="{mt20:index>1}"
    >
      <div class="item-normal" v-if="item.master_id !== -1">{{item.language}}:{{item.nick_name}}</div>
      <div v-else class="item-special">
        <div class="row"></div>
        <div class="column"></div>
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
      list: [],
      listDeault: [
        {
          nick_name: '12',
          master_id: -1
        }
      ]
    }
  },
  computed: {
    ...mapState({
      apprenticeMaster: state => state.global.apprenticeMaster
    }
    )
  },
  watch: {
    apprenticeMaster(newVal) {
      this.apiGetSelfMasterList()
    }
  },
  mounted() {
    console.warn('apprenticeMaster', this.apprenticeMaster)
    this.apiGetSelfMasterList()
  },
  methods: {
    handleOpenList(item) {
      if (item.master_id && item.master_id !== -1) {
        this.$router.replace({ name: 'creat', query: { masterId: item.master_id, nick_name: item.nick_name, time: new Date().getTime() } })
      } else {
        this.$emit('change-list')
      }
    },
    async apiGetSelfMasterList() {
      try {
        let { data: { code, masters } } = await masterService.apiGetSelfMasterList()
        console.warn('[api][获取自己师傅列表]', code, masters)
        this.list = masters.concat(this.listDeault)
      } catch (err) {
        console.warn('[api][获取自己师傅列表]', err)
      }
    }
  }
}
</script>
<style lang="scss">
.self-master-wapper {
  overflow: auto;
  height: 200px;
  .item {
    width: 100px;
    height: 60px;
    border: 1px solid #cccccc;
    box-sizing: border-box;
    cursor: pointer;
    text-align: center;
    float: left;
    .item-normal {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .item-special {
      width: 100%;
      height: 100%;
      position: relative;
      .row {
        width: 30px;
        height: 3px;
        background: #cccccc;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .column {
        width: 3px;
        height: 30px;
        background: #cccccc;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    &:nth-child(2n) {
      margin-left: 20px;
    }
  }
}
</style>
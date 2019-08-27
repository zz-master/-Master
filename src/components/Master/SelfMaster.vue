<template>
  <div class="self-master-wapper">
    <div
      v-for="(item,index) in relMasterList"
      :key="index"
      class="item"
      :class="{'item-active':defaultMasterId === item.master_id}"
      @click="handleOpenList(item)"
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
      defaultMasterId: null,
      defaultMasterName: null,
      defalutList: []
    }
  },
  props: {
    myMasterList: {
      type: Array,
      default: []
    }
  },
  watch: {
    removeMasterChosed() {
      this.defaultMasterId = this.$route.query.masterId
    }
  },
  computed: {
    ...mapState({
      removeMasterChosed: state => state.global.removeMasterChosed
    }),
    relMasterList() {
      this.initData()
      for (let i = 0; i < this.myMasterList.length; i++) {
        this.defalutList.splice(0, 0, this.myMasterList[i])
        this.defalutList.pop()
      }
      return this.defalutList
    }
  },
  methods: {
    handleOpenList(item) {
      if (item.master_id && item.master_id !== -1) {
        this.defaultMasterId = item.master_id
        this.$router.replace({ name: 'creat', query: { masterId: item.master_id, nick_name: item.nick_name, time: new Date().getTime() } })
      } else {
        this.$emit('change-list')
      }
    },
    initData() {
      this.defalutList = [
        {
          nick_name: '',
          master_id: -1,
        },
        {
          nick_name: '',
          master_id: -1,
        },
        {
          nick_name: '',
          master_id: -1,
        }, {
          nick_name: '',
          master_id: -1,
        }
      ]
    }
  }
}
</script>
<style lang="scss">
.self-master-wapper {
  .item {
    width: 100px;
    height: 60px;
    border: 1px solid #cccccc;
    box-sizing: border-box;
    cursor: pointer;
    text-align: center;
    float: left;
    margin: 10px 20px;
    font-size: 12px;
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
  .item-active {
    border: 1px solid #f85415;
    color: #f85415;
  }
  .let-button {
    margin-left: 20px;
  }
}
</style>
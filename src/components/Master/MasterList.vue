<template>
  <div class="master-list-wapper let-mask">
    <div class="let-dialog">
      <div class="let-dialog-close" @click="closeDialog">X</div>
      <div class="let-title">@Master</div>
      <div class="master-main">
        <div class="master-list" v-for="(item,index) in masterList" :key="index">
          <div class="title">{{item.language}}</div>
          <div class="name-list">
            <div
              v-for="(master,key) in item.masters"
              :key="key"
              class="name-item"
              :class="{'master-active':defaultId === master.id}"
              @click="handleChoseMaster(master)"
            >{{master.nick_name}}</div>
          </div>
          <div class="info-list" v-for="(master,key1) in item.masters" :key="key1">
            <div v-show="defaultId === master.id" class="master-info">
              <div class="text master-speciality" v-html="master.speciality ||defaultText"></div>
              <button
                class="let-button"
                v-show="!isApprenticed(master.id)"
                @click="handleApprenticeMaster"
              >拜师</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import masterService from '../../service/base.js'
export default {
  data() {
    return {
      masterList: [],
      defaultId: null,
      defaultText: '该老师无简介'
    }
  },
  props: {
    myMastersIdList: {
      type: Array,
      default: []
    }
  },
  mounted() {
    this.apiGetAllMasterList()
  },
  methods: {
    closeDialog() {
      this.$emit('change-list', false)
    },
    isApprenticed(masterId) {
      return this.myMastersIdList.includes(masterId)
    },
    // 选择老师
    handleChoseMaster(master) {
      if (this.defaultId === master.id) {
        return
      }
      this.defaultId = master.id
    },
    // 拜师
    async handleApprenticeMaster() {
      try {
        let { data: { code, msg, user_master: { master, master_nickname } } } = await masterService.apiApprenticeMaster(this.defaultId)
        console.warn('[api][拜师]', master)
        this.handleCloseDialog(false)
        this.$store.dispatch('updateMasterStatus')
        this.$store.dispatch('updateMasterChosed')
        this.$router.replace({ name: 'creat', query: { masterId: master, nick_name: master_nickname, time: new Date().getTime() } })
      } catch (err) {
        console.warn('[api][拜师]', err)
      }
    },
    // 关闭弹窗
    handleCloseDialog(type = false) {
      this.$emit('change-list')
    },
    // 获取数据
    async apiGetAllMasterList() {
      try {
        let { data: { code, result, msg } } = await masterService.apiGetAllMasterList()
        this.masterList = result
        console.warn('[api][获取全部老师列表]', code, result, msg)
      } catch (err) {
        console.warn('[api][获取全部老师列表]', err)
      }
    }
  }
}
</script>
<style lang="scss">
.master-list-wapper {
  .let-dialog {
    width: 800px;
    height: 500px;
    padding: 0;
    justify-content: flex-start;
    .let-dialog-close {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }
    .let-title {
      color: #df402a;
      text-align: center;
      height: 50px;
      line-height: 50px;
    }
  }
  .master-main {
    height: 450px;
    overflow: auto;
    padding: 10px 20px;
    box-sizing: border-box;
    .master-list {
      .title {
        height: 40px;
        line-height: 40px;
      }
      .name-list {
        margin-bottom: 10px;
        .name-item {
          border: 1px solid #e4e7ed;
          background: #ffffff;
          border-radius: 4px;
          padding: 5px 25px;
          display: inline-block;
          cursor: pointer;
          color: #606266;
        }
        .name-item + .name-item {
          margin-left: 15px;
        }
        .master-active {
          border: 1px solid#f85415;
          color: #f85415;
        }
      }
      .info-list {
        .master-info {
          height: 150px;
          overflow: auto;
          border: 1px dashed #606266;
          padding: 10px;
          .master-speciality {
            padding: 5px;
          }
          .let-button {
            height: 30px;
            padding: 2px 20px;
          }
        }
      }
    }
    .master-list + .master-list {
      margin-top: 30px;
    }
  }
}
</style>
<template>
  <div class="master-list-wapper">
    <div class="mask"></div>
    <div class="dialog master-dialog">
      <div class="title master-title">
        @Master
        <span class="dialog-close" @click="handleCloseDialog()">X</span>
      </div>
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
              <div class="text master-speciality" v-html="master.speciality"></div>
              <div class="button master-button" @click="handleApprenticeMaster">拜师</div>
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
      defaultId: null
    }
  },
  mounted() {
    this.apiGetAllMasterList()
  },
  methods: {
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
        let { data: { code, msg } } = await masterService.apiApprenticeMaster(this.defaultId)
        console.warn('[api][拜师]', code, msg)
        if (code !== 10000000) {
          return
        }
        this.handleCloseDialog()
      } catch (err) {
        console.warn('[api][拜师]', err)
      }
    },
    // 关闭弹窗
    handleCloseDialog() {
      this.$emit('change-list')
    },
    // 获取数据
    async apiGetAllMasterList() {
      try {
        let { data: { code, result, msg } } = await masterService.apiGetAllMasterList()
        if (code !== 10000000) {
          return
        }
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
  .master-dialog {
    width: 800px;
    height: 500px;
    padding: 0;
    justify-content: flex-start;
  }
  .master-title {
    height: 50px;
    line-height: 50px;
    color: #df402a;
    text-align: center;
    border-bottom: 1px solid #e3e3e3;
    position: relative;
    box-sizing: border-box;
    .dialog-close {
      position: absolute;
      right: 10px;
      cursor: pointer;
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
          border: 1px solid#DCDFE6;
          background: #dcdfe6;
        }
      }
      .info-list {
        .master-info {
          height: 150px;
          overflow: auto;
          border: 1px dashed #606266;
          .master-speciality {
            padding: 5px;
          }
          .master-button {
            margin-top: 20px;
            margin-left: 20px;
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
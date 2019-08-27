<template>
  <div class="master-wapper">
    <div class="title">我的师傅</div>
    <SelfMaster
      @change-list="masterDialog"
      :myMasterList="myMasterList"
      :isApprenticeMaster="isApprenticeMaster"
    ></SelfMaster>
    <MasterList
      v-show="masterListVisable"
      @change-list="masterDialog"
      :myMastersIdList="myMastersIdList"
    ></MasterList>
  </div>
</template>
<script>
import SelfMaster from './SelfMaster.vue'
import MasterList from './MasterList.vue'
import masterService from '../../service/base.js'
import { mapState } from 'vuex'
export default {
  name: 'master-index',
  data() {
    return {
      masterListVisable: false,
      myMasterList: [],
      myMastersIdList: []
    }
  },
  components: {
    SelfMaster,
    MasterList
  },
  computed: {
    ...mapState({
      isApprenticeMaster: state => state.global.isApprenticeMaster
    })
  },
  watch: {
    isApprenticeMaster() {
      this.myMasterList = []
      this.myMastersIdList = []
      this.apiGetSelfMasterList()
    }
  },
  mounted() {
    this.apiGetSelfMasterList()
  },
  methods: {
    masterDialog(type) {
      this.masterListVisable = !this.masterListVisable
    },
    async apiGetSelfMasterList() {
      try {
        let { data: { masters } } = await masterService.apiGetSelfMasterList()
        console.warn('[api][获取自己师傅列表]', masters)
        this.myMasterList = masters
        masters.forEach(item => {
          this.myMastersIdList.push(item.master_id)
        })
        console.warn('[api][获取自己师傅列表]', this.myMasterList)
        console.warn('[api][获取自己师傅列表]', this.myMastersIdList)
      } catch (err) {
        console.warn('[api][获取自己师傅列表]', err)
      }
    }
  }
}
</script>
<style lang="scss">
.master-wapper {
  height: 220px;
  box-sizing: border-box;
  .title {
    font-weight: 400;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
  }
}
</style>
<template>
  <div class="master-wapper">
    <div class="title">我的师傅</div>
    <SelfMaster @change-list="masterDialog" :apprenticeMaster="apprenticeMaster"></SelfMaster>
    <MasterList v-if="masterListVisable" @change-list="masterDialog"></MasterList>
  </div>
</template>
<script>
import SelfMaster from './SelfMaster.vue'
import MasterList from './MasterList.vue'
export default {
  name: 'master-index',
  data() {
    return {
      masterListVisable: false,
      apprenticeMaster: false
    }
  },
  components: {
    SelfMaster,
    MasterList
  },
  methods: {
    masterDialog(type) {
      if (type === 'success') {
        this.apprenticeMaster = true
      }
      this.masterListVisable = !this.masterListVisable
    }
  }
}
</script>
<style lang="scss">
.master-wapper {
  height: 240px;
  box-sizing: border-box;
  .title {
    font-weight: 400;
    height: 40px;
    line-height: 40px;
  }
}
</style>
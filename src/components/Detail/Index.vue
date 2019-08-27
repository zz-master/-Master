<template>
  <div class="detail-wapper">
    <DetailCreat v-if="routName === 'creat'"></DetailCreat>
    <DetailAdd v-else-if="routName === 'add'"></DetailAdd>
    <DetailList v-else-if="routName === 'list'"></DetailList>
    <!-- <div v-else class="message">{{defaultMsg}}</div> -->
  </div>
</template>
<script>
import DetailCreat from './DetailCreat.vue'
import DetailAdd from './DetailAdd.vue'
import DetailList from './DetailList.vue'
export default {
  data() {
    return {
      defaultMsg: `
      欢迎使用@Master
      `
    }
  },
  components: {
    DetailCreat,
    DetailAdd,
    DetailList
  },
  computed: {
    routName() {
      return this.$route.name
    }
  },
  mounted() {
  }
}
</script>
<style lang="scss">
.detail-wapper {
  padding: 10px;
  height: 100%;
  .message {
    text-align: center;
  }
}
</style>
<template >
  <textarea :ref="editor" placeholder="请在这里描述你的问题......"></textarea>
</template>

<script>
import Simditor from 'simditor'
import 'simditor/styles/simditor.css'

export default {
  name: 'simditor',
  data() {
    return {
      editor: new Date().getTime(),
      options: {
        placeHolder: '121',
        toolbar: ['title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'color', '|', 'ol', 'ul', 'blockquote', 'code', '|', 'link', 'hr', '|', 'indent', 'outdent', 'alignment',
        ]
      }
    }
  },
  mounted() {
    let _this = this
    this.editor = new Simditor(Object.assign({}, {
      textarea: _this.$refs[this.editor]
    }, this.options))

    this.editor.on('valuechanged', (e, src) => {
      this.valueChange(e, src)
    })
  },
  methods: {
    valueChange(e, val) {
      this.$emit('change', this.editor.getValue())
    }
  }
}
</script>
<style lang="scss">
.simditor .simditor-wrapper {
  background: none;
}
.simditor .simditor-toolbar {
  background: none;
}
.simditor .simditor-body {
  overflow-y: scroll !important;
  min-height: 350px !important;
  max-height: 350px !important;
}
</style>

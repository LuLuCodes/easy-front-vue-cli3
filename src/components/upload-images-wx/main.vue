<template>
  <!-- 上传图片组件 -->
  <div class="upload-list clearfix pt15">
    <div class="upload-item" v-for="(file, index) in fileList" :key="file">
      <b
        class="txt-c chacha"
        v-if="deletable"
        @click.prevent.stop="onDelete(file, index)"
      >
        <span class="icon icon-chacha f10 c-white"></span>
      </b>
      <img v-lazy="file" @click.prevent.stop="onPreview(file)" />
    </div>
    <div
      class="upload-add txt-c fl"
      v-show="fileList.length < maxCount"
      @click.prevent.stop="onUpload"
    >
      <span class="icon icon-add c-gray f-b f20"></span>
    </div>
  </div>
</template>
<script>
import { chooseImage, getLocalImgData, previewImage } from '@/utils/wx-jsdk';
export default {
  name: 'upload-images-wx',
  components: {},
  data() {
    return {};
  },
  model: {
    prop: 'fileList',
    event: 'input'
  },
  props: {
    fileList: {
      type: Array,
      default: () => []
    },
    capture: {
      type: Array,
      default() {
        return ['album', 'camera'];
      }
    },
    deletable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    previewImage: {
      type: Boolean,
      default: true
    },
    maxCount: {
      type: [Number, String],
      default: 9
    },
    uploadPath: {
      type: String,
      default: ''
    }
  },
  computed: {},
  created() {
    // api请求尽量放在这里
    console.log('this is created');
  },
  mounted() {
    // 对数据的操作尽量放在这里
    console.log('this is mounted');
  },
  updated() {
    console.log('this is updated');
  },
  beforeDestroy() {
    console.log('this is beforeDestroy');
  },
  watch: {},
  methods: {
    onDelete(file, index) {
      const fileList = this.fileList.slice(0);
      fileList.splice(index, 1);

      this.$emit('input', fileList);
      this.$emit('delete', index, file);
    },
    async onUpload() {
      const { maxCount, fileList, capture, uploadOss, warnMsg, errorMsg } = this;
      try {
        const { localIds } = await chooseImage({ count: maxCount - fileList.length, sourceType: capture });
        const len = maxCount - (localIds.length + fileList.length);
        if (len < 0) {
          warnMsg(`最多上传${maxCount}张图片`);
        } else {
          await uploadOss(localIds);
        }
      } catch (error) {
        errorMsg(error.message);
      }
    },
    async uploadOss(localIds) {
      const { uploadPath, fileList, load, unload, errorMsg } = this;
      try {
        load({ message: '上传中' });
        let promises = [];
        for (const localId of localIds) {
          promises.push(getLocalImgData(localId));
        }
        let results = await Promise.all(promises);
        promises = [];
        for (const res of results) {
          let { localData } = res;
          if (localData.indexOf('data:image') === -1) {
            localData = 'data:image/jpeg;base64,' + localData;
          }
          localData = localData.replace(/[\r\n]/g, '').replace('data:image/jgp', 'data:image/jpeg');
          promises.push(this.$api.post({
            url: '/upload/upload-base64-oss',
            data: { fileData: localData, filePath: uploadPath }
          }));
        }
        results = await Promise.all(promises);
        this.$emit('input', [...fileList, ...results]);
        unload();
      } catch (error) {
        errorMsg(error.message);
      }
    },
    async onPreview(file) {
      if (this.previewImage) {
        previewImage({ current: file, urls: this.fileList });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.upload-list .upload-item {
  position: relative;
  width: 90px;
  height: 90px;
  float: left;
  margin-right: 15px;
  text-align: center;
}
.upload-list .upload-item img {
  width: 100%;
  height: 100%;
}
.upload-list .upload-item .chacha {
  position: absolute;
  top: -7px;
  right: -7px;
  background: #d81e06;
  border-radius: 100%;
  width: 16px;
  height: 16px;
  line-height: 15px;
}
.upload-add {
  width: 90px;
  height: 90px;
  line-height: 90px;
  border: 1px dashed #e5e5e5;
}
</style>

<template>
  <!-- 省市区选择组件 -->
  <van-popup :value="show" position="bottom" :lazy-render="false">
    <van-picker
      ref="picker"
      show-toolbar
      value-key="name"
      :title="title"
      :loading="loading"
      :columns="displayColumns"
      :item-height="itemHeight"
      :swipe-duration="swipeDuration"
      :visible-item-count="visibleItemCount"
      :cancel-button-text="cancelButtonText"
      :confirm-button-text="confirmButtonText"
      @cancel="onCancel"
      @confirm="onConfirm"
      @change="onChange"
    />
  </van-popup>
</template>
<script>
import storage from '@/utils/storage';
import { parseArea } from '@/utils';
export default {
  name: 'area-picker',
  components: {},
  data() {
    return {
      code: this.value,
      areaList: {},
      columns: [{ values: [] }, { values: [] }, { values: [] }]
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    columnsNum: {
      type: Number,
      default: 3
    },
    itemHeight: {
      type: [Number, String],
      default: 44
    },
    swipeDuration: {
      type: [Number, String],
      default: 1000
    },
    visibleItemCount: {
      type: [Number, String],
      default: 5
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    confirmButtonText: {
      type: String,
      default: '确定'
    },
    value: String,
    columnsPlaceholder: {
      type: Array,
      default: () => []
    },
    upAreaId: {
      type: Number,
      default: 0
    }
  },
  computed: {
    province() {
      return this.areaList.provinceList || {};
    },
    city() {
      return this.areaList.cityList || {};
    },
    county() {
      return this.areaList.countyList || {};
    },
    displayColumns() {
      return this.columns.slice(0, +this.columnsNum);
    }
  },
  created() {
    // api请求尽量放在这里
    console.log('this is created');
  },
  mounted() {
    // 对数据的操作尽量放在这里
    this.getAreaList();
  },
  updated() {
    console.log('this is updated');
  },
  beforeDestroy() {
    console.log('this is beforeDestroy');
  },
  watch: {
    value(val) {
      this.code = val;
      this.setValues();
    },
    areaList: {
      deep: true,
      handler: 'setValues'
    },
    columnsNum() {
      this.$nextTick(() => {
        this.setValues();
      });
    }
  },
  methods: {
    async getAreaList() {
      const showFloorCount = this.columnsNum - 1;
      const area = storage.get(`${storage.KEYS.AREA_LIST}_${this.upAreaId}_${showFloorCount}`);
      if (area) {
        this.areaList = JSON.parse(area);
        return;
      }
      const res = await this.$api.post({
        url: '/common/GetAreaList',
        data: {
          Extra: { FatherAreaSysNo: this.upAreaId, ShowFloorCount: showFloorCount }
        }
      });
      if (res.List) {
        const list = parseArea(res.List);
        storage.set(`${storage.KEYS.AREA_LIST}_${this.upAreaId}_${showFloorCount}`, JSON.stringify(list));
        this.areaList = list;
      }
    },
    getList(type, code) {
      let result = [];
      if (!type && !code) {
        return result;
      }
      const list = this[type];
      result = Object.keys(list).map((listCode) => ({
        code: listCode,
        name: list[listCode].n,
        id: list[listCode].s
      }));
      if (code) {
        result = result.filter((item) => item.code.indexOf(code) === 0);
      }
      return result;
    },
    getIndex(type, code) {
      const compareNum = type === 'province' ? 2 : type === 'city' ? 4 : 6;
      const list = this.getList(type, code.slice(0, compareNum - 2));

      code = code.slice(0, compareNum);
      for (let i = 0; i < list.length; i++) {
        if (list[i].code.slice(0, compareNum) === code) {
          return i;
        }
      }

      return 0;
    },
    setValues() {
      let { code } = this;
      if (!code) {
        if (Object.keys(this.county)[0]) {
          code = Object.keys(this.county)[0];
        } else {
          code = '';
        }
      }

      const { picker } = this.$refs;
      if (!picker) {
        return;
      }

      const province = this.getList('province');
      const city = this.getList('city', code.slice(0, 2));
      picker.setColumnValues(0, province);
      picker.setColumnValues(1, city);

      if (
        city.length &&
        code.slice(2, 4) === '00'
      ) {
        [{ code }] = city;
      }
      const county = this.getList('county', code.slice(0, 4));
      picker.setColumnValues(2, county);
      picker.setIndexes([
        this.getIndex('province', code),
        this.getIndex('city', code),
        this.getIndex('county', code)
      ]);
    },
    parseOutputValues(values) {
      return values.map((value, index) => {
        // save undefined value
        if (!value) {
          return value;
        }

        value = JSON.parse(JSON.stringify(value));

        if (!value.code || value.name === this.columnsPlaceholder[index]) {
          value.code = '';
          value.name = '';
          value.id = 0;
        }

        return value;
      });
    },
    onChange(picker, values, index) {
      this.code = values[index].code;
      this.setValues();

      let getValues = picker.getValues();
      getValues = this.parseOutputValues(getValues);
      this.$emit('change', picker, getValues, index);
    },
    onCancel() {
      this.$emit('update:show', false);
      this.$emit('cancel');
    },
    onConfirm(values, indexs) {
      values = this.parseOutputValues(values);
      this.setValues();
      this.$emit('update:show', false);
      this.$emit('confirm', values, indexs);
    },
    // @exposed-api
    reset(code) {
      this.code = code || '';
      this.setValues();
    }
  }
};
</script>
<style lang="less" scoped>
</style>

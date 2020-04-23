/**
 * 全局过滤器，使用Vue.fileter()注册到全局；
 */
import { parseTime } from '@/utils';

const filters = {
  // 时间戳转换为 yyyy-MM-dd mm:hh:ss
  DateTime: function(time) {
    return parseTime(time);
  }
};

export default filters;

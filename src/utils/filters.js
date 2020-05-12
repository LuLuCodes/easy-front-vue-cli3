/**
 * 全局过滤器，使用Vue.fileter()注册到全局；
 */
import { parseTime } from '@/utils';

const filters = {
  DateTime: function(time) {
    // 时间戳转换为 yyyy-MM-dd mm:hh:ss
    return parseTime(time);
  },
  PhoneEncrypt: function(phone) {
    // 手机号脱敏
    const pat = /(\d{3})\d*(\d{4})/;
    return phone.replace(pat, '$1****$2');
  }
};

export default filters;

export default {
  set: function(name, val) {
    localStorage.setItem(name, val);
  },
  get: function(name, isjson = true) {
    const val = localStorage.getItem(name);
    if (isjson) {
      return JSON.parse(val);
    }
    return val;
  },
  remove: function(name) {
    const val = localStorage.getItem(name);
    localStorage.removeItem(name);
    return val;
  },
  clear: function(name) {
    localStorage.clear(name);
  },
  KEYS: {
    SELECTED_POINT_ID: 'SELECTED_POINT_ID',
    AREA_LIST: 'AREA_LIST'
  }
};

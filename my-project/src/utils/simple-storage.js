/**
 * 取得關鍵字資料物件
 * @param {*} key 管件字
 * @returns {Object}
 */
 function get(key) {
    try {
      const value = localStorage.getItem(key)
      return JSON.parse(value)
    } catch (error) {
      console.log(error)
      return {}
    }
  }
  
  /**
   * 儲存暫存記憶體
   * @param {String} key 關鍵字
   * @param {Object} value 物件
   */
  function set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  /**
   * 新增新的東西進去
   * @param {*} key 關鍵字
   * @param {*} value 新增物件
   */
  function add(key, value) {
      let tempData = this.get(key) || []
      if(Array.isArray(tempData)){
          tempData.push(value)
      }
      this.set(key, tempData)
  }
  
  /**
   * 全部記憶體清空
   */
  function clear() {
    localStorage.clear()
  }
  
  /**
   * 移除特定資料
   * @param {String} key 關鍵字
   */
  function remove(key) {
    localStorage.removeItem(key)
  }
  
  export default {
    get,
    set,
    clear,
    remove,
    add
  }
  
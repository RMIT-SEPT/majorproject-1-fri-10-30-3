const sessionStorage = {
  data: {},
  getItem(key) {
    return this.data[key]
  },
  setItem(key, value) {
    this.data[key] = value
  }
}

export default sessionStorage
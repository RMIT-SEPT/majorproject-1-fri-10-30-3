const dev = "http://localhost:3000/api/"
const prod = "http://54.210.18.102:8080/api/"

const config = {
  base: process.env.NODE_ENV === "development" ? dev : prod
}

export default config
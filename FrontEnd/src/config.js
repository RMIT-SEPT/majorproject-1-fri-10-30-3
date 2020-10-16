const dev = "http://localhost:8080/api/"
const prod = "http://34.238.242.177:8080/api/"

const config = {
  base: process.env.NODE_ENV === "development" ? dev : prod
}

export default config
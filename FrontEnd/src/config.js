const dev = "http://localhost:8080/api/"
const prod = "http://18.204.228.73:8080/api/"

const config = {
  base: process.env.NODE_ENV === "development" ? dev : prod
}

export default config
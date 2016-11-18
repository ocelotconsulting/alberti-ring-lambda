const validate = require('../src/validateAuth0APIToken.js')

const testCallback = (data) => {
  console.log(JSON.stringify(data))
}

validate('replace-with-jwt-client-token')
.then(testCallback)
.catch((err) => {
  if (err) {
    console.log(err.stack)
  }
})
.then(() => process.exit(0))

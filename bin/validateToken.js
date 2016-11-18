const validate = require('../src/validateAuth0Token.js')

const testCallback = (data) => {
  console.log(JSON.stringify(data))
}

validate('replace-with-jwt-user-token') // jwt
.then(testCallback)
.then(() => validate('Bearer replace-with-oauth-user-token') // bearer access token
  .then(testCallback)
)
.then(() => process.exit(0))
.catch((err) => {
  if (err) {
    console.log(err.stack)
  }
})

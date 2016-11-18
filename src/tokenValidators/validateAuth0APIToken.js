const config = require('../../config/default.json')
const jwksClient = require('jwks-rsa')
const jwt = require('jsonwebtoken')
const promisify = require('es6-promisify')
const client = jwksClient({
  cache: true,
  rateLimit: true,
  jwksUri: config['auth0-jwks-uri-endpoint']
})
const getSigningKey = promisify(client.getSigningKey, client)
const verify = promisify(jwt.verify)

const validateToken = (token) =>
  getSigningKey(jwt.decode(token, {complete: true}).header.kid)
  .then((key) =>
    verify(
      token, key.publicKey || key.rsaPublicKey,
      { audience: config['auth0-jwt-aud'], issuer: config['auth0-jwt-issuer'] }
    )
  )
  .then(auth0RespHandler)

const auth0RespHandler = (tokenInfo) => {
  console.log(`The token info is: ${JSON.stringify(tokenInfo)}`)
  return ({
    principal: tokenInfo['sub'],
    tokenInfo
  })
}

module.exports = validateToken

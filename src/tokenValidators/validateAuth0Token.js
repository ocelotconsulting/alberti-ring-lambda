const agent = require('../agent')
const config = require('../../config/default.json')
// Regular expression to extract an access token from
// Authorization header.
const BEARER_TOKEN_PATTERN = /^Bearer[ ]+([^ ]+)[ ]*$/i

// validate the incoming token
// and produce the principal user identifier associated with the token

// this could be accomplished in a number of ways:
// 1. Call out to OAuth provider
// 2. Decode a JWT token inline
// 3. Lookup in a self-managed DB
const validateToken = (token) => {
  switch (extractToken(token).type) {
    case 'open_id':
      return validateAuth0IDToken(config['auth0-token-info-endpoint'], token)
    case 'access_token':
    default:
      return validateAuth0AccessToken(config['auth0-user-info-endpoint'], token)
  }
}

const extractToken = (authorization) => {
  // If the value of Authorization header is not available.
  if (!authorization) {
    // No access token.
    return null
  }

  // Check if it matches the pattern "Bearer {access-token}".
  const result = BEARER_TOKEN_PATTERN.exec(authorization)

  // If the Authorization header does not match the pattern.
  if (!result) {
    // No access token.
    return ({type: 'open_id', value: authorization})
  }

  // Return the access token.
  return ({type: 'access_token', value: result[1]})
}

const validateAuth0AccessToken = (auth0UserInfoUrl, token) =>
  agent.post(`${auth0UserInfoUrl}`)
  .set('Authorization', token)
  .then(auth0RespHandler)

const validateAuth0IDToken = (auth0TokenInfoUrl, token) =>
  agent.post(`${auth0TokenInfoUrl}`)
  .send(`id_token=${token}`)
  .then(auth0RespHandler)

const auth0RespHandler = (resp) => ({
  principal: resp.body['user_id'],
  tokenInfo: resp.body
})

module.exports = validateToken

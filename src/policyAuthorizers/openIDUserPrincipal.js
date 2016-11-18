const AuthPolicy = require('alberti-ring').AuthPolicy

const openIDUserPrincipal = (tokenValidation) =>
  Promise.resolve({
    allow: [{
      verb: AuthPolicy.HttpVerb().GET,
      resource: `/user/${encodeURIComponent(tokenValidation['principal'])}/*`
    }],
    deny: []
  })

module.exports = openIDUserPrincipal

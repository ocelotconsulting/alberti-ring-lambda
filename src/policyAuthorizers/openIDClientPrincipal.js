const AuthPolicy = require('alberti-ring').AuthPolicy

const canReadSecrets = (tokenValidation) =>
  (tokenValidation['tokenInfo'].scope.indexOf('read:secrets') > -1)
    ? ({
      verb: AuthPolicy.HttpVerb().GET,
      resource: `/client/${encodeURIComponent(tokenValidation['principal'])}/*`
    })
    : undefined

const canWriteSecrets = (tokenValidation) =>
  (tokenValidation['tokenInfo'].scope.indexOf('write:secrets') > -1)
    ? ({
      verb: AuthPolicy.HttpVerb().PUT,
      resource: `/client/${encodeURIComponent(tokenValidation['principal'])}/*`
    })
    : undefined

const openIDClientPrincipal = (tokenValidation) =>
  Promise.resolve({
    allow: [
      canReadSecrets(tokenValidation),
      canWriteSecrets(tokenValidation)
    ].filter(x => x),
    deny: []
  })

module.exports = openIDClientPrincipal

const getAuthPolicy = require('alberti-ring').getAuthPolicy
const openIDPrincipal = require('./src/policyAuthorizers/openIDClientPrincipal')
const validateToken = require('./src/tokenValidators/validateAuth0APIToken')

const authorizer = (policyAuthorizer) => ({ handler: getAuthPolicy(validateToken, [policyAuthorizer]) })

module.exports = authorizer(openIDPrincipal)

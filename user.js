const getAuthPolicy = require('alberti-ring').getAuthPolicy
const openIDPrincipal = require('./src/policyAuthorizers/openIDUserPrincipal')
const validateToken = require('./src/tokenValidators/validateAuth0Token')

const authorizer = (policyAuthorizer) => ({ handler: getAuthPolicy(validateToken, [policyAuthorizer]) })

module.exports = authorizer(openIDPrincipal)

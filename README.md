# Alberti Ring Lambda
An access mechanism (custom authorizer) Lambda to secrets backed by [alberti](https://github.com/ocelotconsulting/alberti), exposed via AWS API Gateway.

## Status
Under development (11-18-2016). For now just messing with validating against Auth0 client/user tokens... others to be added later.

## Execution
Follow these steps to get started:

1. Git-clone this repository.

        $ git clone git@github.com:ocelotconsulting/alberti-ring.git

2. Package lambda zip:

        $ npm run dist

3. Create lambda by uploading zip... use either `user` or `client` handler depending on if you want to establish a lambda for authorizing users or clients access to call their respective secrets' endpoints in alberti.

**Disclaimer** - This is intended to be triggered by an API Gateway event, so choosing "API Gateway Authorizer" event template from the Lambda testing tool will yield the best result at the moment.

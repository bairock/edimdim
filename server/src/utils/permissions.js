const { shield, rule } = require('graphql-shield')

const rules = {
    isAuthenticatedUser: rule({ cache: 'contextual' })((parent, args, ctx) => {
        if (!ctx.verify && !ctx.verify.id && ctx.verify.role !== 'user') {
            return false
        }
        return true
    }),
}

const permissions = shield(
    {
        Query: {
            findUniqueAdmin: rules.isAuthenticatedUser,
        },
    },
    {
        allowExternalErrors: true,
        fallbackError: 'not authorized'
    }
)

module.exports = { permissions }

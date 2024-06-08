const { author, description, homepage } = require('./package.json')

const README = `
Search across your filesystem with advanced features.

You can control whether to exclude hidden files, node_modules, inly in git repos, etc.

See the workflow codebase in here:
${homepage}
`.trim()

/**
 * @type {import('fast-alfred').FastAlfredConfig}
 */
module.exports = {
    workflowMetadata: {
        name: 'Search File System',
        category: 'Productivity',
        createdby: author.name,
        webaddress: homepage,
        description,
        readme: README,
    },
    tabSize: 4,
}

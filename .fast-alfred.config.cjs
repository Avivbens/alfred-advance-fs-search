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
    bundlerOptions: {
        outputFormat: 'esm',
        esmHelpers: true,
    },
    workflowMetadata: {
        name: 'Search File System',
        category: 'Tools',
        createdby: author.name,
        webaddress: homepage,
        description,
        readme: README,
    },
    tabSize: 4,
}

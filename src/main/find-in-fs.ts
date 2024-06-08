import type { AlfredScriptFilter } from 'fast-alfred'
import { FastAlfred } from 'fast-alfred'
import { homedir } from 'node:os'
import { basename } from 'node:path'
import { Variables } from '@common/variables'
import type { SearchOptions } from '@models/search-options.model'
import { searchInFileSystem } from '@services/search.service'

;(async () => {
    const alfredClient = new FastAlfred()

    const sliceAmount = alfredClient.env.getEnv(Variables.SLICE_AMOUNT, { defaultValue: 10, parser: Number })
    const targetType = alfredClient.env.getEnv<SearchOptions['type']>(Variables.TARGET_TYPE, { defaultValue: 'all' })

    /**
     * Advanced options
     */
    const onlyIn = alfredClient.env.getEnv(Variables.ONLY_IN, {
        defaultValue: [],
        parser: (data) =>
            data
                .trim()
                .split('\n')
                .filter(Boolean)
                .map((path) => path.replace('~', homedir())),
    })
    const excludePaths = alfredClient.env.getEnv(Variables.EXCLUDE_PATHS, {
        defaultValue: [],
        parser: (data) =>
            data
                .trim()
                .split('\n')
                .filter(Boolean)
                .map((path) => path.replace('~', homedir())),
    })

    const excludeGit = alfredClient.env.getEnv(Variables.EXCLUDE_GIT, {
        defaultValue: false,
        parser: (data) => Boolean(Number(data)),
    })
    const excludeHidden = alfredClient.env.getEnv(Variables.EXCLUDE_HIDDEN, {
        defaultValue: false,
        parser: (data) => Boolean(Number(data)),
    })
    const gitReposOnly = alfredClient.env.getEnv(Variables.GIT_REPOS_ONLY, {
        defaultValue: false,
        parser: (data) => Boolean(Number(data)),
    })
    const excludeNodeModules = alfredClient.env.getEnv(Variables.EXCLUDE_NODE_MODULES, {
        defaultValue: false,
        parser: (data) => Boolean(Number(data)),
    })

    const { input } = alfredClient

    const res = await searchInFileSystem({
        name: input,
        type: targetType,
        onlyIn,
        excludePaths,
        /*  */
        excludeGit,
        excludeHidden,
        gitReposOnly,
        excludeNodeModules,
    })

    const items: AlfredScriptFilter['items'] = res.map(({ path, type }) => {
        const fileName = basename(path)

        const icon =
            type === 'folder'
                ? alfredClient.icons.getIcon('genericFolder')
                : alfredClient.icons.getIcon('genericDocument')

        return {
            title: fileName,
            subtitle: path,
            arg: path,
            icon: { path: icon },
        }
    })

    const sliced = items.slice(0, sliceAmount)

    alfredClient.output({ items: sliced, cache: { seconds: 60 } })
})()

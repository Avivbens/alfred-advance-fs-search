import { readdir, stat } from 'node:fs/promises'
import { execPromise } from '@common/utils'
import type { FileSearch } from '@models/file-search.model'
import type { SearchOptions } from '@models/search-options.model'

export async function searchInFileSystem(options: SearchOptions): Promise<FileSearch[]> {
    const { name, type, excludeGit, excludeHidden, excludeNodeModules, excludePaths, onlyIn, gitReposOnly } = options
    const filteredRootPaths = onlyIn?.filter((path) => path.includes(name)) ?? []

    const kind = type === 'file' ? 'kind:file' : type === 'folder' ? 'kind:folder' : ''
    const onlyInStr = onlyIn?.map((path) => `-onlyin ${path}`).join(' ')

    const query = `mdfind ${kind} -name "${name}" ${onlyInStr ?? ''}`
    const { stdout } = await execPromise(query)

    const parsedQueryRes = stdout.split('\n').filter(Boolean).concat(filteredRootPaths)

    const filtered = parsedQueryRes.filter((path) => {
        const isExcluded = excludePaths?.some((excludePath) => new RegExp(excludePath).test(path))
        if (isExcluded) {
            return false
        }

        if (excludeNodeModules && path.includes('node_modules')) {
            return false
        }

        if (excludeHidden && path.includes('/.')) {
            return false
        }

        if (excludeGit && path.includes('/.git')) {
            return false
        }

        return true
    })

    const resPrm = filtered.map(async (path) => {
        const fileData = await stat(path)

        const type = fileData.isDirectory() ? 'folder' : fileData.isFile() ? 'file' : undefined
        return {
            path,
            type,
        } satisfies FileSearch
    })

    const res: FileSearch[] = await Promise.all(resPrm)

    if (!gitReposOnly) {
        return res
    }

    /**
     * Handle the case when we need to search only in git repositories
     */
    const gitResPrm = res.map(async ({ path, type }) => {
        if (type === 'file') {
            return null
        }

        const directoryEntities = await readdir(path, { withFileTypes: true }).catch(() => [])

        const isIncludeGit = directoryEntities.some((entity) => entity.isDirectory() && entity.name === '.git')

        return isIncludeGit ? { path, type } : null
    })

    const gitRes = await Promise.all(gitResPrm)

    return gitRes.filter(Boolean) as FileSearch[]
}

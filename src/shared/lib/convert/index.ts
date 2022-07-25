export const converterFactory = <T>(record: Record<string, string>) => {
    const resultRecord = {}
    const fn = createOrUpdateObjectField

    return (obj: Record<string, unknown>): T => {
        Object.keys(record).forEach(key => {
            fn(resultRecord, record[key], fn(obj, key))
        })

        return resultRecord as T
    }
}

// @ts-ignore
export const createOrUpdateObjectField = (
    obj: Record<string, any>,
    path: string | string[],
    value?: unknown
) => {
    if (typeof path === 'string') {
        return createOrUpdateObjectField(obj, path.split('.'), value)
    }
    if (path.length === 0) {
        return obj
    }

    const key = path[0]

    if (path.length === 1 && value !== undefined) {
        return obj[key] = value
    }

    if (typeof obj[key] === 'undefined') {
        obj[key] = {}
    }

    return createOrUpdateObjectField(obj[key], path.slice(1), value)
}

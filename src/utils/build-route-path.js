// /users/:id 
export function buildRoutePath(path) {
    const routeParametersRegex = /:([a-zA-A]+)/g
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9/-_]+)')

    // console.log(Array.from(path.matchAll(routeParametersRegex))) 

    const pathRegex = new RegExp(`^${pathWithParams}`)

    return pathRegex
}
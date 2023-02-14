// /users/:id 
export function buildRoutePath(path) {
    const routeParametersRegex = /:([a-zA-A]+)/g

    console.log(Array.from(path.matchAll(routeParametersRegex)))
}
const toRoute = (val) => encodeURIComponent(val.toLowerCase())
export const tagRoute = (tag) => `/tag/${toRoute(tag)}`

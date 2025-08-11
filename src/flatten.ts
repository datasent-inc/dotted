export const stripArrayDots = (obj: any): { [key: string]: any } => {
  const ret: { [key: string]: any } = {}
  for (let key in obj) {
    ret[key.replaceAll('.[', '[')] = obj[key]
  }
  return ret
}

export const flatten = (
  obj: any,
  delimiter: string = '.',
  prefix: string = '',
): { [key: string]: any } => {
  return Object.keys(obj).reduce((acc: { [key: string]: any }, found) => {
    const pre = prefix.length ? `${prefix}${delimiter}` : ''
    if (
      typeof obj[found] === 'object' &&
      obj[found] !== null &&
      Object.keys(obj[found]).length > 0
    ) {
      Object.assign(acc, flatten(obj[found], delimiter, pre + found))
    } else if (Array.isArray(obj)) {
      acc['.' + pre + '[' + found + ']'] = obj[Number(found)]
    } else {
      acc['.' + pre + found] = obj[found]
    }
    return stripArrayDots(acc)
  }, {})
}

// Taken from NSFW
/**
 * Re-maps a number from one range to another
 *
 * @return float
 */
export function map(n, start1, stop1, start2, stop2) {
  return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2
}

/**
 * Return true 1 times out of {chances}
 *
 * @return boolean
 */
export function lucky(chances) {
  return !~~(Math.random() * chances)
}

/**
 * Generates random numbers
 *
 * @return float
 */
export function random(low, hight) {
  return Math.random() * (hight - low) + low
}

/**
 * Get random value of an array
 *
 * @return array value
 */
export function randomFromArray(array) {
  return array[~~(Math.random() * array.length)]
}

/**
 * Returns a suffled version of the original array
 *
 * @return Array
 */
export function shuffleArray(o) {
  for (
    let j, x, i = o.length;
    i;
    j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
  );
  return o
}

/**
 * Return a clamped value between two bounds
 *
 * @return {number} clamped value
 */
export function clamp(value, min, max) {
  if (value < min) {
    return min
  }

  if (value > max) {
    return max
  }

  return value
}

/**
 * TODO!
 * @param  {Array}  as [description]
 * @return {[type]}    [description]
 */
export function removeNil(as = []) {
  return as.filter(a => a != null)
}

/**
 * TODO!
 * @param  {...[type]} args [description]
 * @return {[type]}         [description]
 */
export function merge(...args) {
  const filtered = removeNil(args)

  if (filtered.length < 1) {
    return {}
  }

  if (filtered.length === 1) {
    return args[0]
  }

  return filtered.reduce((acc, cur) => {
    Object.keys(cur).forEach(key => {
      if (
        typeof acc[key] === 'object' &&
        typeof cur[key] === 'object' &&
        cur[key].length === undefined
      ) {
        acc[key] = merge(acc[key], cur[key])
      } else {
        acc[key] = cur[key]
      }
    })

    return acc
  }, {})
}

/**
 * Generate an unique ID
 * @return {String}
 */
export function getUniqueID() {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  )
}

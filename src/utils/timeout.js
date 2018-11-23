export default function timeout(delay) {
  return new Promise(resolve => {
    const wait = setTimeout(() => {
      clearTimeout(wait)
      resolve()
    }, delay)
  })
}

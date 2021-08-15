function curry(callbackFn: Function) {
  return (x: number, y?: number) => {
    if (x && y) {
      return callbackFn.call(null, x, y)
    } else if (x && !y) {
      return (y?: number) => {
        if (y) {
          return callbackFn.call(null, x, y)
        } else {
          return (yy: number) => callbackFn.call(null, x, yy)
        }
      }
    }
  }
}

const sum = (a: number, b: number) => a + b

const inc = curry(sum)(1)

console.log(inc(2)) // 3
console.log(inc()(1)) // 2
console.log(curry(sum)(1, 2)) // 3

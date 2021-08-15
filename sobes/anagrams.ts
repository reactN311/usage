// checkAnagrams('cinema', 'iceman') => true

function checkAnagrams(a: string, b: string) {
  if (a.length !== b.length) return false
  let t = a.split('')
  let r = true
  b.split('').forEach((el) => {
    let idx = t.indexOf(el)
    if (idx > -1) {
      t.splice(idx, 1)
    } else {
      r = false
    }
  })
  return r
}

let res = checkAnagrams('cinema', 'iceman')
let res2 = checkAnagrams('asdfgh', 'hgfdsa')
console.log(res, res2) // true true

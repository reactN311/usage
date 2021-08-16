// Написать функцию которая переворачивает строку сохраняя пробелы на своих местах
//solve('your code') => 'edoc ruoy'
//solve('your code rocks') => 'skco redo cruoy'
//solve('i love codewars') => 's rawe docevoli'
// Дана строка, состоящая из букв A-Z:

let solvWords = 'i love codewars'

function solve(str: string) {
  let idxOfSpaсe: number[] = []
  let rev = str
    .split('')
    .filter((e, i) => {
      if (e !== ' ') {
        return true
      } else {
        idxOfSpaсe.push(i)
        return false
      }
    })
    .reverse()

  idxOfSpaсe.forEach((s) => {
    rev.splice(s, 0, ' ')
  })
  return rev.join('')
}
let result = solve(solvWords)
console.log(result) // s rawe docevoli

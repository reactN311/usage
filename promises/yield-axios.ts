import axios from 'axios'

const baseUrl = 'https://jsonplaceholder.typicode.com/'

function* generateSequence(start: number, end: number) {
  for (let i = start; i <= end; i++) yield axios(`${baseUrl}users/${i}`)
}

let generator = generateSequence(1, 5)

Promise.all(generator).then((r) => {
  r.forEach((user) => {
    console.log(user.data.username)
  })
})
// print results
// Bret
// Antonette
// Samantha
// Karianne
// Kamren

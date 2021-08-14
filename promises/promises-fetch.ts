import fetch from 'node-fetch'

// class Thenable {
//   constructor(num: number) {
//     this.num = num
//   }
//   then(resolve, reject) {
//     // console.log(resolve)
//     // resolve with this.num*2 after 1000ms
//     setTimeout(() => resolve(this.num * 2), 1000) // (*)
//   }
// }

// async function f() {
//   // waits for 1 second, then result becomes 2
//   let result = await new Thenable(1)
//   console.log(result)
// }

// f()
///////////////
// class Waiter {
//   async wait() {
//     return await Promise.resolve(1)
//   }
// }

// new Waiter().wait().then(console.log) // 1 (this is the same as (result => alert(result)))

////////////////////////

interface IUser {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: number
    geo: { lat: number; lng: number }
  }
  phone: number
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

const baseUrl = 'https://jsonplaceholder.typicode.com/'

const usersIdArr: number[] = [1, 2, 3, 4, 5]

/////////////
async function someProcedure(n: number[]): Promise<IUser[] | Error> {
  const usersArr: IUser[] = []
  for (let i = 1; i <= n.length; i++) {
    try {
      const response = await fetch(`${baseUrl}susers/${i}`)
      if (response.status >= 400) {
        return new Error('Bad status:' + response.status)
      }
      const jVal = await response.json()
      usersArr.push(jVal)
    } catch (e) {
      console.log(e)
    }
  }
  return usersArr
}

someProcedure(usersIdArr)
  .then((r) => console.log(r))
  .catch(console.error)

/////

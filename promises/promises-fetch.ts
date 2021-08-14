import fetch from 'node-fetch'

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

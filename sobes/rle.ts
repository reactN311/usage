//AAAABBBCCXYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBBbbb
//Нужно написать функцию RLE, которая на выходе даст строку вида:
//A4B3C2XYZD4E3F3A6B28b3

let str: string = 'AAAABBBCCXYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBBbbb'

function rle(str: string) {
  for (var i = 0, a = '', r = 0; i < str.length; i++) {
    if (str.charAt(i) === str.charAt(i + 1)) {
      r += 1
    } else {
      r += 1
      a += str.charAt(i) + r
      r = 0
    }
  }
  return a
}

console.log(rle(str)) //A4B3C2X1Y1Z1D4E3F3A6B28b3

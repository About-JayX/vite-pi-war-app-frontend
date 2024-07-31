export default function (str: string) {
  let rValue: any
  let value = str.split('.')
  if (value.length === 1 || Number(value[1]) !== 0) {
    rValue = str
  } else {
    rValue = value[0]
  }
  return rValue
}

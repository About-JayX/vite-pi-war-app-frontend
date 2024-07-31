type UserData = {
  user_id: number
  registration_date: Date
  timestamp?: number
}

// 定义已知用户ID和注册时间的样本数据

const data: UserData[] = [
  {
    user_id: 1700555756,
    registration_date: new Date(
      new Date().setFullYear(new Date().getFullYear() - 4)
    ),
  },
  {
    user_id: 1875953573,
    registration_date: new Date(
      new Date().setFullYear(new Date().getFullYear() - 4)
    ),
  },
  { user_id: 6477307931, registration_date: new Date(2023, 7, 25) }, // 注意月份是0基的，8月是7
  { user_id: 6848879543, registration_date: new Date(2024, 6, 11) }, // 2024年7月11日
  { user_id: 5483653093, registration_date: new Date(2022, 8, 2) }, // 2022年9月2日
]

// 将日期转换为时间戳
data.forEach(d => {
  d.timestamp = d.registration_date.getTime()
})

// 创建线性回归模型
function linearRegression(X: number[], Y: number[]) {
  const n = X.length
  const sumX = X.reduce((a, b) => a + b, 0)
  const sumY = Y.reduce((a, b) => a + b, 0)
  const sumXY = X.map((x, i) => x * Y[i]).reduce((a, b) => a + b, 0)
  const sumXX = X.map(x => x * x).reduce((a, b) => a + b, 0)

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
  const intercept = (sumY - slope * sumX) / n

  return { slope, intercept }
}

// 获取样本数据的X和Y值
const X = data.map(d => d.user_id)
const Y = data.map(d => d.timestamp!)

// 训练线性回归模型
const model = linearRegression(X, Y)

// 使用模型预测新的用户ID的注册时间
export function predictRegistrationDate(user_id: number): number {
  const timestamp = model.slope * user_id + model.intercept
  // return timestamp // 返回时间戳
  return Math.floor(timestamp / 1000)
}

// 封装方法，传入10位时间戳，返回年限
export function getYearFromTimestamp(timestamp: number): string {
  const currentTime = Date.now() / 1000 // 当前时间戳（秒）
  const diffInSeconds = currentTime - timestamp
  const years = diffInSeconds / (365 * 24 * 60 * 60)
  const roundedYears = Math.ceil(years)
  return `${roundedYears}`
}
export function formatTimestampToDate(timestamp: number): string {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // 月份从0开始，需要加1，并且保证两位数格式
  const day = date.getDate().toString().padStart(2, '0') // 获取日期，并且保证两位数格式
  const hours = date.getHours().toString().padStart(2, '0') // 获取小时，并且保证两位数格式
  const minutes = date.getMinutes().toString().padStart(2, '0') // 获取分钟，并且保证两位数格式
  const seconds = date.getSeconds().toString().padStart(2, '0') // 获取秒钟，并且保证两位数格式
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}` // 返回年月日时分秒格式的字符串
}

// // 用户ID列表
// const user_ids: number[] = [
//   2102201613, 1875953573, 1721582988, 1700555756, 1700555756, 1700555756,
//   1481615095, 864780380, 813426810, 7090711267,
// ]

// // 预测并打印每个用户ID的注册时间
// user_ids.forEach((user_id) => {
//   const predicted_date = predictRegistrationDate(user_id)
//   console.log(
//     `Predicted registration date for user_id ${user_id}: ${predicted_date}`
//   )
// })

import './config'
import express from 'express'

const port = process.env.PORT
const app = express()

app.get('/', (req, res) => {
  res.json({
    testing: 'Hello, there!',
  })
})

app.listen(port, () => {
  console.log(`Server available on http://localhost:${port}/`)
})

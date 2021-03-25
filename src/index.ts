import express from 'express'

const port = 8080
const app = express()

app.get('/', (req, res) => {
  res.json({
    testing: 'Hello, there!',
  })
})

app.listen(port, () => {
  console.log(`Server available on http://localhost:${port}/`)
})

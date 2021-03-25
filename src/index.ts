import './config'
import express from 'express'
import usersApiRoutes from './routes/users.api'

const port = process.env.PORT
const app = express()

app.use(express.json())
app.use('/users', usersApiRoutes)

app.get('/', (_request, response) => {
  response.json({
    '/users': {
      post: 'create new user',
    },
  })
})

app.listen(port, () => {
  console.log(`Server available on http://localhost:${port}/`)
})

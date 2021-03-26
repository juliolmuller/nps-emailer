import './config'
import express from 'express'
import surveysApiRoutes from './routes/surveys.api'
import usersApiRoutes from './routes/users.api'

const app = express()

app.use(express.json())
app.use('/surveys', surveysApiRoutes)
app.use('/users', usersApiRoutes)

app.get('/', (_request, response) => {
  response.json({
    '/surveys': {
      get: 'list all surveys',
      post: 'create new survey',
    },
    '/users': {
      post: 'create new user',
    },
  })
})

export default app

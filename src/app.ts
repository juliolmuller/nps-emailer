import './config'
import express from 'express'
import responseApiRoutes from './routes/surveyResponses.api'
import surveysApiRoutes from './routes/surveys.api'
import usersApiRoutes from './routes/users.api'

const app = express()

app.use(express.json())
app.use('/', responseApiRoutes)
app.use('/surveys', surveysApiRoutes)
app.use('/users', usersApiRoutes)

app.get('/', (_request, response) => {
  response.json({
    '/send-email': {
      post: 'create a survey and notify user',
    },
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

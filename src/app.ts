import './config'
import express from 'express'
import adminApiRoutes from './routes/admin.api'
import responseApiRoutes from './routes/surveyResponses.api'
import surveysApiRoutes from './routes/surveys.api'
import usersApiRoutes from './routes/users.api'

const app = express()

app.use(express.json())
app.use('/admin', adminApiRoutes)
app.use('/survey-response', responseApiRoutes)
app.use('/surveys', surveysApiRoutes)
app.use('/users', usersApiRoutes)

app.get('/', (_request, response) => {
  response.json({
    '/admin/get/:surveyId': {
      get: 'calculate NOS index to the given survey',
    },
    '/admin/send-email': {
      post: 'create survey response and notify user',
    },
    '/survey-response/:id': {
      get: 'add grade to a given survey response',
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

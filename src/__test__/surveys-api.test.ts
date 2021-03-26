/* eslint-disable no-magic-numbers */
import request from 'supertest'
import { createConnection } from '../database'
import app from '../app'

describe('Surveys API', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  it('Should create a new survey', async () => {
    const response = await request(app)
      .post('/surveys').send({
        title: 'Lorem ipsam iste velit',
        description: 'Rerum et accusamus quam praesentium culpa maiores hic.',
      })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('createdAt')
  })

  it('Should return a list of surveys', async () => {
    const response = await request(app).get('/surveys')

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
  })
})

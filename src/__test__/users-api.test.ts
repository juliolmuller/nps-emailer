/* eslint-disable no-magic-numbers */
import request from 'supertest'
import { createConnection } from '../database'
import app from '../app'

describe('Users API', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  it('Should create a new user', async () => {
    const response = await request(app)
      .post('/users').send({
        name: 'John Doe',
        email: 'john.doe@email.com',
      })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('createdAt')
  })

  it('Should not create a user with duplicate email', async () => {
    const response = await request(app)
      .post('/users').send({
        name: 'John Doe',
        email: 'john.doe@email.com',
      })

    expect(response.status).toBe(422)
    expect(response.body).toHaveProperty('error')
  })
})

import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { helmet } from 'elysia-helmet';
import { swagger } from '@elysiajs/swagger'
import { logger } from '@grotto/logysia';
import { rateLimit } from 'elysia-rate-limit'
import MongoConnection from '@/connections/mongo.connections'


/**
 * App Class: Bootstrap our server and intialise all required steps to start the server
 */
export default class App {
  public elysia: Elysia
  private port: number

  constructor(controllers: Array<Elysia>, port: number) {
    this.elysia = new Elysia()
    this.port = port

    this.intialiseMongoConnection()
    this.initialiseMiddlewares()
    this.initialiseControllers(controllers)
  }

  /**
   * method used for intialising all global middlewares
   */
  private initialiseMiddlewares() {
    this.elysia.use(cors())
    this.elysia.use(helmet())
    this.elysia.use(logger())
    this.elysia.use(rateLimit({ duration: 60000, max: 20, responseMessage: 'Too many requests, please try again later' }))
    this.elysia.use(swagger({
      documentation: {
        info: {
          title: 'Task Management API',
          version: '1.0.0'
        },
        tags: [
          { name: 'Auth', description: 'Authentication endpoints' },
          { name: 'Tasks', description: 'Task management endpoints' }
        ]
      },
    }))
  }

  /**
   * Intialise all the controllers by looping through the plugins of each controller and passes it to elysia
   * @param controllers - Array of controllers for all modules
   */
  private initialiseControllers(controllers: Array<Elysia>) {
    controllers.forEach((controller) => {
      this.elysia.use(controller)
    })
  }


  private intialiseMongoConnection() {
    MongoConnection.connect()
  }
  /**
   * Start listening the elysia server on the predefined port
   */
  public listen() {
    this.elysia.listen(this.port, () => {
      console.log(`App running on port: ${this.port}`)
    })
  }
}
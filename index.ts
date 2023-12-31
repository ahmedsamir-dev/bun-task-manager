import 'dotenv/config'
import App from './app'
import { controllers } from '@/modules/shared/utils/controllersBuilder.utils'

//@ts-ignore
const app = new App(controllers, Number(process.env.PORT))

app.listen()

import express, {Express, Request, Response} from 'express'
import { config } from './config/config'
import rootRouter from './routes'
import { PrismaClient } from '@prisma/client'

const app:Express = express()
export const prismaClient = new PrismaClient({
    log:['query']
})

app.use(express.json())

app.use('/api', rootRouter)

app.listen(config.port, ()=>{
    console.log(`Server started at: http://localhost:${config.port}`);
})
import express, {Express, Request, Response} from 'express'
import { config } from './config/config'
import rootRouter from './routes'
import { PrismaClient } from '@prisma/client'
import { errorMiddleware } from './middlewares/errors'

const app:Express = express()
export const prismaClient = new PrismaClient({
    log:['query']
})

// to perform validation on create
// .$extends({
//     query:{
//         user:{
//             create({args, query}) {
//                 args.data = SignUpSchema.parse(args.data)
//                 return query(args)
//             }
//         }
//     }
// })

app.use(express.json())
app.use(errorMiddleware)

app.use('/api', rootRouter)

app.listen(config.port, ()=>{
    console.log(`Server started at: http://localhost:${config.port}`);
})
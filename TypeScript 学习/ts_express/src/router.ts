import { Router, Request, Response } from 'express'

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.send(' Hello World')
})

router.get('/getData', (req: Request, res: Response) => {
    res.send('getData')
})

export default router
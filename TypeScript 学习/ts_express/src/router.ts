import { Router, Request, Response } from 'express'
import Crowller from './douban_top250'
import Analyzer from './moviesAnalyzer'
import fs from 'fs'
import path from 'path'

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.send(' Hello World')
})

router.get('/getData', (req: Request, res: Response) => {
    const analyzer = new Analyzer()
    const crowller = new Crowller(analyzer)
    res.send('getData success!')
})

router.get('/showData', (req: Request, res: Response) => {
    try {
        const filePath = path.resolve(__dirname, '../data/douban_top250.json')
        const data = fs.readFileSync(filePath, 'utf-8')
        res.json(JSON.parse(data))
    } catch (error) {
        res.send('尚未爬取到内容，请先爬取内容')
    }
})

export default router
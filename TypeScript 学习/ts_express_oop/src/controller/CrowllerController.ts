import 'reflect-metadata'
import { Response } from 'express'
import fs from 'fs'
import path from 'path'

import { controller, get, use } from '../decorator'
import { responseData, login_required } from '../utils/utils'
import Crowller from '../utils/douban_top250'
import Analyzer from '../utils/moviesAnalyzer'
import { BodyRequest } from '../utils/type'

@controller
export class CrowllerController {
    @get('/getData')
    @use(login_required)
    getData(req: BodyRequest, res: Response) {
        const analyzer = new Analyzer()
        const crowller = new Crowller(analyzer)
        // res.send('getData success!')
        res.json(responseData(true, "数据爬取成功"))
    }

    @get('/showData')
    @use(login_required)
    showData(req: BodyRequest, res: Response) {
        try {
            const filePath = path.resolve(__dirname, '../../data/douban_top250.json')
            const data = fs.readFileSync(filePath, 'utf-8')
            res.json(responseData(true, "数据获取成功", JSON.parse(data)))
        } catch (error) {
            // res.send('尚未爬取到内容，请先爬取内容')
            res.json(responseData(false, "尚未爬取到内容，请先爬取内容"))
        }
    }
}
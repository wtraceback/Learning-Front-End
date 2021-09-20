import superagent from 'superagent'
import fs from 'fs'
import path from 'path'
import Analyzer from './moviesAnalyzer'

export interface IAnalyzer {
    analyze: (html: string, filePath: string) => string
}

class Crowller {
    private save_page_data(data: string, filepath: string) {
        fs.writeFileSync(filepath, data)
    }

    private async page_from_url(url: string) {
        const result = await superagent.get(url)
        return result.text
    }

    private async main() {
        var url = 'https://movie.douban.com/top250'
        var filepath = path.resolve(__dirname, '../data/douban_top250.json')

        const page = await this.page_from_url(url)
        const movies_json = this.analyzer.analyze(page, filepath)
        this.save_page_data(movies_json, filepath)
    }

    constructor(private analyzer: IAnalyzer) {
        this.main()
    }
}

const analyzer = new Analyzer()
const crowller = new Crowller(analyzer)
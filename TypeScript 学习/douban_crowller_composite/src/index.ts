import superagent from 'superagent'
import cherrio from 'cheerio'
import fs from 'fs'
import path from 'path'

interface MovieDict {
    name: string
    score: string
    quote: string
    cover_url: string | undefined
    ranking: string
}

class Movie {
    public name: string
    public score: string
    public quote: string
    public cover_url: string | undefined
    public ranking: string

    constructor() {
        this.name = ''
        this.score = ''
        this.quote = ''
        this.cover_url = ''
        this.ranking = ''
    }

    toDict() {
        return {
            name: this.name,
            score: this.score,
            quote: this.quote,
            cover_url: this.cover_url,
            ranking: this.ranking,
        }
    }
}

class Crowller {
    generate_json_content(data: Movie[]) {
        var r: MovieDict[] = []
        data.map((item) => {
            r.push(item.toDict())
        })

        return JSON.stringify(r)
    }

    save_page_data(data: string) {
        var filepath = path.resolve(__dirname, '../data/douban_top250.json')
        var file_content: Movie[] = []
        if (fs.existsSync(filepath)) {
            file_content = JSON.parse(fs.readFileSync(filepath, 'utf-8'))
            console.log('file_content', file_content);
        }

        file_content = file_content.concat(JSON.parse(data))
        fs.writeFileSync(filepath, JSON.stringify(file_content))
    }

    movies_from_page(page: string) {
        var $ = cherrio.load(page)
        var items = $('.item')
        var movies: Movie[] = []
        items.map((index, e) => {
            var m = new Movie()
            m.name = $(e).find('.title').text()
            m.score = $(e).find('.rating_num').text()
            m.quote = $(e).find('.inq').text()
            m.cover_url = $(e).find('img').attr('src')
            m.ranking = $(e).find('.pic').find('em').text()
            movies.push(m)
        })

        return movies
    }

    async page_from_url(url: string) {
        const result = await superagent.get(url)
        return result.text
    }

    async main() {
        var url = 'https://movie.douban.com/top250'
        const page = await this.page_from_url(url)
        const movies = this.movies_from_page(page)
        const movies_json = this.generate_json_content(movies)
        this.save_page_data(movies_json)
    }

    constructor() {
        this.main()
    }
}

const crowller = new Crowller()
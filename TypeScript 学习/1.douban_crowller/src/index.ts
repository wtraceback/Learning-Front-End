import superagent from 'superagent'
import cherrio from 'cheerio'
import fs from 'fs'
import path from 'path'

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

    toString() {

    }
}

class Crowller {
    save_page_data(data: Movie[]) {
        var filepath = path.resolve(__dirname, '../data/douban_top250.json')
        var file_content: Movie[] = []
        if (fs.existsSync(filepath)) {
            file_content = JSON.parse(fs.readFileSync(filepath, 'utf-8'))
            console.log('file_content', file_content);
        }

        file_content = file_content.concat(data)
        fs.writeFileSync(filepath, JSON.stringify(file_content))
    }

    movies_from_doc(page: string) {
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
        const movies = this.movies_from_doc(page)
        this.save_page_data(movies)
    }

    constructor() {
        this.main()
    }
}

const crowller = new Crowller()
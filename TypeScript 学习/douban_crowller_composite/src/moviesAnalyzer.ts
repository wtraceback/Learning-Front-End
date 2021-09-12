import cherrio from 'cheerio'
import fs from 'fs'

interface IMovieDict {
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

export default class Analyzer {
    private movies_from_page(page: string) {
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

    private generate_json_content(data: Movie[], filepath: string) {
        var file_content: Movie[] = []

        if (fs.existsSync(filepath)) {
            file_content = JSON.parse(fs.readFileSync(filepath, 'utf-8'))
        }
        file_content = file_content.concat(data)

        var r: IMovieDict[] = []
        data.map((item) => {
            r.push(item.toDict())
        })

        return JSON.stringify(r)
    }

    public analyze(page: string, filepath: string) {
        const movies = this.movies_from_page(page)
        const movies_json = this.generate_json_content(movies, filepath)

        return movies_json
    }
}
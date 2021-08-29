import superagent from 'superagent'
import cherrio from 'cheerio'

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

var movies_from_url = async function(url: string) {
    var r = await superagent.get(url)
    var page = r.text
    var $ = cherrio.load(page)
    var items = $('.item')
    var movies = []
    items.map((index, e) => {
        var m = new Movie()
        m.name = $(e).find('.title').text()
        m.score = $(e).find('.rating_num').text()
        m.quote = $(e).find('.inq').text()
        m.cover_url = $(e).find('img').attr('src')
        m.ranking = $(e).find('.pic').find('em').text()
        movies.push(m)
        console.log(m);
    })
}

var main = function() {
    var url = 'https://movie.douban.com/top250'
    const movies = movies_from_url(url)
}

main()
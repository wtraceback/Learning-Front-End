import superagent from 'superagent'

class Crowller {
    constructor(url: string) {
        this.getHtml(url)
    }

    async getHtml(url: string) {
        var result = await superagent.get(url)
        console.log(result.text);
    }
}

var main = function() {
    var url = 'https://movie.douban.com/top250'
    const crowller = new Crowller(url)
}

main()
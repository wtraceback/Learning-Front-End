class Header {
    constructor() {
        const e = `
            <div>Header</div>
        `
        document.body.insertAdjacentHTML('afterbegin', e)
    }
}

class Content {
    constructor() {
        const e = `
            <div>Content</div>
        `
        document.body.insertAdjacentHTML('afterbegin', e)
    }
}

class Footer {
    constructor() {
        const e = `
            <div>Footer</div>
        `
        document.body.insertAdjacentHTML('afterbegin', e)
    }
}

class Page {
    constructor() {
        new Footer()
        new Content()
        new Header()
    }
}
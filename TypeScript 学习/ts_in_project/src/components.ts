namespace Components {
    export class Header {
        constructor() {
            const e = `
                <div>Header</div>
            `
            document.body.insertAdjacentHTML('afterbegin', e)
        }
    }

    export class Content {
        constructor() {
            const e = `
                <div>Content</div>
            `
            document.body.insertAdjacentHTML('afterbegin', e)
        }
    }

    export class Footer {
        constructor() {
            const e = `
                <div>Footer</div>
            `
            document.body.insertAdjacentHTML('afterbegin', e)
        }
    }
}
class Singleton {
    private static instance: Singleton

    private constructor() {

    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new Singleton()
        }

        return this.instance
    }
}

const d = Singleton.getInstance()
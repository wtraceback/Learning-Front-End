import { RequestHandler } from 'express'
import router from '../router'
import { Methods } from '../utils/type'

export var controller = function(target: new (...args: any[]) => {}) {
    // controller 装饰器会遍历所有原型链上的所有方法
    for (let key in target.prototype) {
        // 获取 get 装饰器的元数据
        const path: string = Reflect.getMetadata('path', target.prototype, key)
        const method: Methods = Reflect.getMetadata('method', target.prototype, key)
        // 获取类方法，key 为方法名
        const handler = target.prototype[key]
        const middleware: RequestHandler = Reflect.getMetadata('middleware', target.prototype, key)
        if (path && method) {
            // 将路由和方法绑定在一起
            if (middleware) {
                router[method](path, middleware, handler)
            } else {
                router[method](path, handler)
            }
        }
    }
}
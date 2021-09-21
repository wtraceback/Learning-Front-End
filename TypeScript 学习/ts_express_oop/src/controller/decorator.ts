import { Router, RequestHandler } from 'express'

export const router = Router()

enum Method {
    get = 'get',
    post = 'post'
}

export var controller = function(target: any) {
    // controller 装饰器会遍历所有原型链上的所有方法
    for (let key in target.prototype) {
        // 获取 get 装饰器的元数据
        const path = Reflect.getMetadata('path', target.prototype, key)
        const method: Method = Reflect.getMetadata('method', target.prototype, key)
        // 获取类方法，key 为方法名
        const fn = target.prototype[key]
        const middleware = Reflect.getMetadata('middleware', target.prototype, key)
        if (path && method && fn) {
            // 将路由和方法绑定在一起
            if (middleware) {
                router[method](path, middleware, fn)
            } else {
                router[method](path, fn)
            }
        }
    }
}

export var use = function(middleware: RequestHandler) {
    return function(target: any, key: string) {
        Reflect.defineMetadata('middleware', middleware, target, key)
    }
}

export var requestMethod = function(type: string) {
    return function(path: string) {
        return (target: any, key: string) => {
            // 在方法上定义元数据
            Reflect.defineMetadata('path', path, target, key)
            Reflect.defineMetadata('method', type, target, key)
        }
    }
}

export const get = requestMethod('get')
export const post = requestMethod('post')
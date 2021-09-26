import { RequestHandler } from 'express'
import router from '../router'
import { Methods } from '../utils/type'

export var controller = (root: string) => {
    return function(target: new (...args: any[]) => {}) {
        // controller 装饰器会遍历所有原型链上的所有方法
        for (let key in target.prototype) {
            // 获取 get 装饰器的元数据
            const path: string = Reflect.getMetadata('path', target.prototype, key)
            const method: Methods = Reflect.getMetadata('method', target.prototype, key)
            // 获取类方法，key 为方法名
            const handler = target.prototype[key]
            const middlewares: RequestHandler[] = Reflect.getMetadata('middlewares', target.prototype, key)
            if (path && method) {
                const fullPath = root === '/' ? path : `${root}${path}`
                // 将路由和方法绑定在一起
                if (middlewares && middlewares.length) {
                    router[method](fullPath, ...middlewares, handler)
                } else {
                    router[method](fullPath, handler)
                }
            }
        }
    }
}
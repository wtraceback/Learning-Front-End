import { RequestHandler } from 'express'
import { CrowllerController, LoginController } from '../controller'

export var use = function(middleware: RequestHandler) {
    return function(target: CrowllerController | LoginController, key: string) {
        var originMiddlewares = Reflect.getMetadata('middlewares', target, key) || []
        originMiddlewares.push(middleware)
        Reflect.defineMetadata('middlewares', originMiddlewares, target, key)
    }
}
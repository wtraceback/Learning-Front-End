import { RequestHandler } from 'express'
import { CrowllerController, LoginController } from '../controller'

export var use = function(middleware: RequestHandler) {
    return function(target: CrowllerController | LoginController, key: string) {
        Reflect.defineMetadata('middleware', middleware, target, key)
    }
}
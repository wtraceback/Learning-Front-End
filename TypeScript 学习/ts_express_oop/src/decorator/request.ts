import { CrowllerController, LoginController } from '../controller'
import { Methods } from '../utils/type'

export var requestMethod = function(type: Methods) {
    return function(path: string) {
        return (target: CrowllerController | LoginController, key: string) => {
            // 在方法上定义元数据
            Reflect.defineMetadata('path', path, target, key)
            Reflect.defineMetadata('method', type, target, key)
        }
    }
}

export const get = requestMethod(Methods.get)
export const post = requestMethod(Methods.post)
// 定义全局变量
declare var $: (params: () => void) => void

// 对对象进行类型定义，以及对类进行类型定义
// $.fn.init()
declare namespace $ {
    namespace fn {
        class init {}
    }
}

// 使用 interface 的语法，实现函数
interface JQuery {
    (fn: () => void): void
}

declare var $: JQuery
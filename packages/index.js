import Test from './Test/index'
import AutoRotation from './AutoRotation/index'
import AutoDown from './AutoDown/index'
import AutoRotate from './AutoRotate/index'

const components = [
    Test,
    AutoRotation,
    AutoDown,
    AutoRotate
]

const install = function (Vue) {
    if (install.installed) return
    components.map(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}


const API = {
    install,
    Test,
    AutoRotation,
    AutoDown,
    AutoRotate
}
export default API

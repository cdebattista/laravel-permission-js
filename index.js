const app = document.getElementById('app');
const hasPermissions = function(permissions){
    if (Array.isArray(permissions)) {
        if(permissions.indexOf('all') != -1 || permissions.length == 0){
            return true;
        }
        const page = JSON.parse(app.dataset.page);
        for (let key in permissions) {
            if (page.props.UserPermissions.indexOf(permissions[key]) != -1) {
                return true;
            }
        }
    }
    return false;
}
export default {
    install(Vue, options) {
        Vue.directive('can', {
            bind (el, binding, vnode, oldVnode) {
                if(!hasPermissions(binding.value)) {
                    el.innerHTML = ''
                }
            }
        });
        Vue.prototype.HasPermissions = function (permissions) {
            return hasPermissions(permissions);
        };
    }
}
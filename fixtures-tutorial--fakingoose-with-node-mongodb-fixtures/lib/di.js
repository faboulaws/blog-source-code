class DIC {
    constructor() {
        this.dependencies = {};
        this.factories = {};
    }

    get(name) {
        if (!this.dependencies[name]) {
            const factoryFn = this.factories[name];
            if (!factoryFn) {
                throw new Error(`Module with name ${name} not found`);
            }
            this.dependencies[name] = factoryFn(this);
        }
        return this.dependencies[name];
    }

    register(name, dependency) {
        this.dependencies[name] = dependency;
    }

    factory(name, factoryFn) {
        this.factories[name] = factoryFn;
    }
}

exports.init = () => {
    const dic = new DIC();
    dic.register('repository.article', require('./repositories/article.repository'));
    dic.factory('service.article', (container) => {
        const serviceFactory = require('./services/article.service');
        const articleRepo = container.get('repository.article');
        return serviceFactory({ articleRepo });
    });
    return dic;
}
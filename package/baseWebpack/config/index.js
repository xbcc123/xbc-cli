module.exports = {

    // 环境变量配置
    development: {
        envObj: {
            NODE_ENV: '"development"',
            API_HOST: '"http://192.168.16.9:8081"',
            API_HOST_H5: '"http://192.168.16.9:8081"',
            API_IMG: '"http://192.168.16.103:9999/"',
        }
    },

    production: {
        envObj: {
            NODE_ENV: '"production"',
            API_HOST: '"http://m.szsjysy.com"',
            API_HOST_H5: '"http://m.szsjysy.com"',
            API_IMG: '"http://image.szsjysy.com/"'
        }
    },

    test: {
        envObj: {
            NODE_ENV: '"test"',
            API_HOST: '"http://192.168.16.9:8081"',
            API_HOST_H5: '"http://manage.batar.cn"',
            API_IMG: '"http://192.168.16.103:9999/"'
        }
    },

    formalTest: {
        envObj: {
            NODE_ENV: '"formalTest"',
            API_HOST: '"http://192.168.16.8:8201"',
            API_HOST_H5: '"http://192.168.16.8:8201"',
            API_IMG: '"http://192.168.16.8:9999/"'
        }
    },

    demo: {
        envObj: {
            NODE_ENV: '"demo"',
            API_HOST: '"http://demo.oms.m.batar.cn"',
            API_HOST_H5: '"http://demo.oms.m.batar.cn"',
            API_IMG: '"https://demo.img.batar.cn/"'
        }
    }
}
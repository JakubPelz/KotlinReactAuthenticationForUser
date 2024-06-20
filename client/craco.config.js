const CracoLessPlugin = require('craco-less');
const path = require('path');
// https://ant.design/docs/react/customize-theme
module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin
        }
    ], 
    eslint: {
        enable: true /* (default value) */,
        mode: 'extends' /* (default value) */ || 'file',
        configure: eslintConfig => {
            return eslintConfig;
        },
        pluginOptions: eslintOptions => {
            return eslintOptions;
        }
    },
    typescript: {
        enableTypeChecking: true /* (default value)  */
    },
    webpack: {
        alias: {
            app: path.resolve(__dirname, 'src/'),
            components: path.resolve(__dirname, 'src/components/'),
            data: path.resolve(__dirname, 'src/data/'),
            enums: path.resolve(__dirname, 'src/enums/'),
            hooks: path.resolve(__dirname, 'src/hooks/'),
            services: path.resolve(__dirname, 'src/services/'),
            styles: path.resolve(__dirname, 'src/styles/'),
            types: path.resolve(__dirname, 'src/types/'),
            utils: path.resolve(__dirname, 'src/utils/')
        }
    }
};

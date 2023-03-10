
// 基本结构
const path = require('path')
const fs = require('fs')
const Icons = require('unplugin-icons/webpack');
const { FileSystemIconLoader } = require('unplugin-icons/loaders');
const Config = require('webpack-chain');
const config = new Config();
const semver = require('semver')
const getPackageJsonInfo = (pkgName, cwd = process.cwd()) => {
    let pkgDir, packageJsonPath;
    try {
        pkgDir = require.resolve(pkgName, {
            paths: [cwd]
        });
    } catch (err) {
        console.error(err);
    }
    if (!pkgDir) {
        return null;
    }
    pkgDir = path.dirname(pkgDir);
    let oldPkgDir = pkgDir;
    while (true) {
        packageJsonPath = path.join(pkgDir, 'package.json');
        if (fs.existsSync(packageJsonPath)) {
            break;
        }
        oldPkgDir = pkgDir;
        pkgDir = path.dirname(pkgDir);
        if (pkgDir === oldPkgDir) {
            packageJsonPath = undefined;
            break;
        }
    }
    if (!packageJsonPath) {
        return null;
    }
    return path.dirname(packageJsonPath);
};
function getContextVueVersion() {
    const vuePackagePath = path.join(process.cwd(), './node_modules/vue/package.json');

    let pkg;
    try {
        pkg = require(vuePackagePath);
    } catch (e) {
        pkg = {
            version: '2.6.12'
        };
    }

    if (pkg.version.match(/^\d+\.\d+\.\d+/)) {
        return pkg.version;
    } else {
        throw new Error(`Not a valid semver version on ${vuePackagePath}, received ${pkg.version}.`);
    }
}

const isInstall = getPackageJsonInfo('hfex-icon');
const vueVersion = getContextVueVersion();
const vueCompiler = semver.major(vueVersion) === 2 ? 'vue2' : 'vue3';
if (!isInstall) {
    throw new Error('请安装hfex-icon.');
} else {

    config.plugin('hfex-icon').use(
        Icons({
            compiler: vueCompiler,
            customCollections: {
                'hfex-icon': FileSystemIconLoader(path.join(process.cwd(), './node_modules/hfex-icon/icons'), svg =>
                    svg.replace(/^<svg /, '<svg fill="currentColor" ')
                )
            }
        }))
}

module.exports = config.toConfig();
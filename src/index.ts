import path from 'path';
import fs from 'fs';
import { Plugin } from 'vite'
import ViteIcons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import {Compiler} from 'webpack'
import semver from 'semver';
import { createUnplugin } from 'unplugin';
const PLUGIN_NAME = 'hfex-icon-plugin';

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
const getPackageJsonInfo = (pkgName: string, cwd = process.cwd()) => {
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
const getIconsConfig = () => {
    return {
        'hfex-icon': FileSystemIconLoader(path.join(process.cwd(), './node_modules/hfex-icon/icons'), (svg: string) => {
            return svg.replace(/^<svg /, '<svg fill="currentColor" ')
        }

        )
    };
}
export function HfexIconPlugin() {
    const isInstall = getPackageJsonInfo('hfex-icon');
    const vueVersion = getContextVueVersion();
    const vueCompiler = semver.major(vueVersion) === 2 ? 'vue2' : 'vue3';
    if (!isInstall) {
        throw new Error('请安装hfex-icon.');
    } else {

        return createUnplugin(() => {
            const viteIconsPlugin = ViteIcons({
                compiler: vueCompiler,
                customCollections: getIconsConfig()
            }) as Plugin
            return {
                name: PLUGIN_NAME,
                enforce: 'post',
                webpack(compiler: Compiler) {

                    const webpackIconsPlugin = require('unplugin-icons/webpack')({
                        compiler: vueCompiler,
                        customCollections: getIconsConfig()
                    });
                    webpackIconsPlugin.apply(compiler);
                },
                vite: {
                    resolveId: viteIconsPlugin.resolveId,

                    load: viteIconsPlugin.load,
                }
            };
        })
    }

}
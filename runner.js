const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const render = require('./render');

const forebiddenDirs = ['node_modules'];

class Runner {
    constructor() {
        this.testFiles = [];
    }

    async runTests() {
        for (let file of this.testfiles) {
            console.log(chalk.gray('---- ${file.shortName}'));
            const beforeEachs = [];
            global.render = render;
            global.beforeEach = (fn) => {
                beforeEaches.push(fn);
            }
            global.it = async (desc, fn) => {
                beforeEaches.forEach(func => func());
                try {
                await fn();
                console.log(chalk.green(`/tOK - ${desc}`));
            }  catch (err) {
                const message = err.message.replace(/\n/g, '\n\t\t');
                console.log(chalk.red(`/tX - ${desc}`));
                console.log(chalk.red('/t', message));
            }
            };

            try {
            require(file.name);
        } catch (err) {
            console.log('X - Error Loading file, file.name');
            console.log(chalk.red(err));
        }
    }


    async collectFiles(targetPath); {
       const files = await fs.promises.readdir(targetPath);

       for (let file of files) {
        const filepath = path.join(targetPath, file);
        const stats = await fs.promises.lstate(filePath);

         if (stats.isFile() && file.includes('.test.js')) {
            this.testFiles.push({name: filepath});
        } else if (stats.isDirectory() && !forebiddenDirs.includes(file)) {
            const childFiles = await fs.promises.readdir(filepath);

            files.push(...childFiles.map(f => path.join(file, f)));

        }
       }
    }
}

module.exports = Runner;
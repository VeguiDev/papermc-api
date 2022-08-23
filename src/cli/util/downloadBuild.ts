import axios from "axios";
import chalk from "chalk";
import ProgressBar from "progress";
import { Build } from "../../class/Build";
import fs from 'fs';
import path from 'path';

export async function DownloadBuild(build: Build, xpath?: string) {
    let url = build.getDownloadUrl();

    let { data, headers } = await axios.get(url, {
        responseType: 'stream'
    });

    const totalLength = headers['content-length'];

    console.log(chalk.blue("Starting download"));

    const progressBar = new ProgressBar('-> Downloading '+build.downloads.application.name+' [:bar] :percent :etas', {
        width: 40,
        complete: '=',
        incomplete: ' ',
        renderThrottle: 1,
        total: parseInt(totalLength)
    })

    const writer = fs.createWriteStream(
        xpath ? path.join(xpath, build.downloads.application.name) : path.resolve(process.cwd(), build.downloads.application.name)
    )

    data.on('data', (chunk:Buffer) => progressBar.tick(chunk.length))
    data.pipe(writer)
    data.on('close', () => {
        console.log(chalk.green(`${build.downloads.application.name} successfuly downloaded!`));
    });
}
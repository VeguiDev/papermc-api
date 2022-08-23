import chalk from "chalk";
import { Argument, Command } from "commander";
import inquirer from "inquirer";
import { PaperAPI } from '../../class/PaperAPI';
import { DownloadBuild } from "../util/downloadBuild";

let cmd = new Command("download")
    .argument("<project>", "It's field must be a project ID or in this format <paperProject>@<version>-[build] (The build field is optional). Example: paper@1.19.2")
    .option("-P, --path <path>", "Set the path where the Jar is downloaded.")
    .description("Downloads PaperMC project application. ")
    .action(async (proj_id:string, opts) => {
        
        let map = proj_id.split("@");

        if(map.length > 1) {

            let mapP = map[1].split("-");
            
            

            let versId = mapP[0];
            let proj = await PaperAPI.project(map[0] as any);

            if(!proj) {
                console.log(chalk.red(`${proj_id} is invalid project ID.`));
                return;
            }

            console.log("Project Name: "+chalk.blue(proj.project_name));

            let vers = await proj.getVersion(versId);

            if(!vers) {
                console.log(chalk.red(`An exception occurred while trying to get version ${versId} information.`));
                return;
            }

            console.log("Project Version: "+chalk.blue(vers.version));

            let buildId = vers.builds[vers.builds.length-1];

            
            if(typeof mapP[1] != 'undefined') {
                buildId = mapP[1];
            }

            let buld = await vers.getBuild(buildId);

            if(!buld) {
                console.log(chalk.red(`An exception occurred while trying to get ${buildId} build information.`));
                return;
            }

            console.log("Project Build: "+chalk.blue(buld.build));

            DownloadBuild(buld, opts.path);

            return;
        }

        let project = await PaperAPI.project(proj_id as any);

        if(!project) {
            console.log(chalk.red(`${proj_id} is invalid project ID.`));
            return;
        }

        const prompt = inquirer.createPromptModule();

        let ans = await prompt({
            type: "list",
            name: "version_selector",
            message:"Select the version you want",
            choices: project.versions,
            default: project.versions[project.versions.length-1]
        });

        let vers = await project.getVersion(ans.version_selector);

        if(!vers) {
            console.log(chalk.red(`An exception occurred while trying to get version ${ans.version_selector} information.`));
            return;
        }

        let ans2 = await prompt({
            name: "sb",
            message:"You want to select the build of this version.",
            type: "confirm",
            default: false
        });

        let bv = "latest";

        if(ans2.sb) {

            let anx = await prompt({
                type: "list",
                name: "build_select",
                message:"Select the build you want",
                choices: vers.builds,
                default: vers.builds[vers.builds.length-1]
            });

            bv = anx.build_select;

        }

        let build = await vers.getBuild(bv);

        if(!build) {
            console.log(chalk.red(`An exception occurred while trying to get ${bv} build information.`));
            return;
        }

        console.log(chalk.greenBright("Downloading in current working directory."))

        DownloadBuild(build, opts.path);
    });

export { cmd as DownloadCommand };
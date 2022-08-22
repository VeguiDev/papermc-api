import chalk from "chalk";
import { Argument, Command } from "commander";
import { PaperAPI } from '../../class/PaperAPI';

let cmd = new Command("project")
    .argument("<project_id>", "PaperMC project ID. Example: paper")
    .argument("[version]", "Minecraft version of PaperMC Project. Must be: latest")
    .argument("[build]", "Build id of PaperMC project. Default: latest")
    .description("Show information of a PaperMC project. ")
    .action(async (proj_id, ver, build) => {
        let project = await PaperAPI.project(proj_id);

        
        if(!project) {
            console.log(chalk.red(`${proj_id} isn't valid Project ID.`));
            return;
        }

        console.log(chalk.bold("Project Name: "+chalk.blue(`${project.project_name} `)));

        if(!ver) {
            console.log(chalk.bold("Project Versions: "));
            for (let ver of project.versions) {
                console.log(" - " + chalk.cyanBright(ver));
            }
            console.log("");

            return;
        }

        let version = ver;

        if(ver == "latest") {
            version = project.versions[project.versions.length-1];
        }

        let vers = await project.getVersion(version);

        if(!vers) {
            console.log(chalk.red(`${version} is invalid version.`));
            return;
        }

        console.log(chalk.bold("Project Version: "+chalk.blue(`${version} `)));

        

        if(!build) {
            console.log(chalk.bold("Project Builds: "));

            for (let build of vers.builds) {
                console.log(" - " + chalk.greenBright(build));
            }
            return;
        }

        let buid = build;

        if(build == "latest") {
            buid = vers.builds[vers.builds.length-1];
        }

        let buildx = await vers.getBuild(buid);

        if(!buildx) {
            console.log(chalk.red(`${buid} is an invalid build.`))
        }

        console.log(chalk.bold("Project Build: "+chalk.greenBright(`${buid}`)));
        
        for(let down of Object.keys(buildx.downloads)) {

            console.log(chalk.bold(down+" Download Url: "+chalk.redBright(`${buildx.getDownloadUrl(down)}`)));

        }

    });

export { cmd as ProjectCommand };
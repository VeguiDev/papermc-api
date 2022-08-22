import chalk from "chalk";
import { Command } from "commander";
import {PaperAPI} from '../../class/PaperAPI';

let cmd = new Command("projects")
.description("List all PaperMC projects.")
.action(async (e) => {
    
    let projects = await PaperAPI.projects();

    if(!projects) {
        console.log(chalk.red("Projects can't be listed."));
        return;
    }
    console.log(chalk.green("Listing all PaperMC projects."))
    console.log("");
    for(let proj of projects) {

        console.log(chalk.bold(chalk.blue(`${proj.project_name}: `)));
        
        for(let ver of proj.versions) {
            console.log("- "+chalk.cyan(ver));
        }
        console.log("");
    }
});

export {cmd as ProjectsCommand};
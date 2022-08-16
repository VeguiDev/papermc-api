import { APIClient } from "./APIClient";


interface ProjectI {
    project_id:string;
    project_name:string;
    version_groups:string[];
    versions:string[];
}

export class PaperAPI {
    static async projects() {
        let res = await APIClient.get('/projects/');
        if(!res) {
            return null;
        } else {
            let projects:Project[] = [];

            for (let proj of res.projects) {
                let project = await PaperAPI.project(proj);
                if(!!project) {
                    projects.push(project);
                }
            }

            return projects;

        }
    }

    static async project(proyect:("paper"|"travertine"|"waterfall"|"velocity")) {
        let res = await APIClient.get('/projects/'+proyect);
        if(!res) {
            return null;
        } else {

            return Project.fromRaw(res);

        }
    }
}

class Project implements ProjectI {

    project_id: string;
    project_name: string;
    version_groups: string[];
    versions: string[];

    constructor(id:string, name:string, version_groups:string[], versions:string[]) {
        this.project_id = id;
        this.project_name = name;
        this.version_groups = version_groups;
        this.versions = versions;
    }
    static fromRaw(raw:ProjectI):Project
    static fromRaw(raw:ProjectI[]):Project[]
    static fromRaw(raw:ProjectI|ProjectI[]):Project|Project[] {
        if(Array.isArray(raw)) {
            let projects = [];

            for(let proj of raw) {

                projects.push(Project.fromRaw(proj));

            }

            return projects;
        } else {
            return new Project(raw.project_id, raw.project_name, raw.version_groups, raw.versions);
        }
    }
}
import { APIClient } from "./APIClient";
import { Project } from "./Project";

export class PaperAPI {

    static async projects() {
        let res = await APIClient.get('/projects/');
        if (!res) {
            return null;
        } else {
            let projects: Project[] = [];

            for (let proj of res.projects) {
                let project = await PaperAPI.project(proj);
                if (!!project) {
                    projects.push(project);
                }
            }

            return projects;

        }
    }


    static async project(proyect: ("paper" | "travertine" | "waterfall" | "velocity")) {
        let res = await APIClient.get('/projects/' + proyect);
        if (!res) {
            return null;
        } else {

            return Project.fromRaw(res);

        }
    }
}
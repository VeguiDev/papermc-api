import { APIClient } from "./APIClient";
import { Version } from "./Version";

export interface ProjectI {
    project_id: string;
    project_name: string;
    version_groups: string[];
    versions: string[];
}

export class Project implements ProjectI {

    project_id: string;
    project_name: string;
    version_groups: string[];
    versions: string[];

    constructor(id: string, name: string, version_groups: string[], versions: string[]) {
        this.project_id = id;
        this.project_name = name;
        this.version_groups = version_groups;
        this.versions = versions;
    }
    static fromRaw(raw: ProjectI): Project
    static fromRaw(raw: ProjectI[]): Project[]
    static fromRaw(raw: ProjectI | ProjectI[]): Project | Project[] {
        if (Array.isArray(raw)) {
            let projects = [];

            for (let proj of raw) {

                projects.push(Project.fromRaw(proj));

            }

            return projects;
        } else {
            return new Project(raw.project_id, raw.project_name, raw.version_groups, raw.versions);
        }
    }

    async getVersion(ver:("latest"|string)) {

        if (this.versions.includes(ver)) {

            let version = await APIClient.get('/projects/' + this.project_id + '/versions/' + ver);

            return Version.fromRaw(version);

        } else if(ver == "latest") {
            let version = await APIClient.get('/projects/' + this.project_id + '/versions/' + this.versions[this.versions.length-1]);

            return Version.fromRaw(version);
        } else {
            throw new Error("Invalid Version");
        }

    }
}
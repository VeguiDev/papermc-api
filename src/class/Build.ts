import { APIClient } from "./APIClient";


export interface DownloadInfo {
    name: string;
    sha256: string;
}

export interface DownloadInfoCollection {
    [name: string]: DownloadInfo;
}

export interface Change {
    commit: string;
    summary: string;
    message: string;
}

export interface BuildI {
    project_id: string;
    project_name: string;
    version: string;
    build: number;
    time: string;
    channel: string;
    promoted: boolean;
    changes: Change[];
    downloads: DownloadInfoCollection;
}

export class Build implements BuildI {
    project_id: string;
    project_name: string;
    version: string;
    build: number;
    time: string;
    channel: string;
    promoted: boolean;
    changes: Change[];
    downloads: DownloadInfoCollection;

    constructor(
        project_id: string,
        project_name: string,
        version: string,
        build: number,
        time: string,
        channel: string,
        promoted: boolean,
        changes: Change[],
        downloads: DownloadInfoCollection
    ) {

        this.project_id = project_id;
        this.project_name = project_name;
        this.version = version;
        this.build = build;
        this.time = time;
        this.channel = channel;
        this.promoted = promoted;
        this.changes = changes;
        this.downloads = downloads;

    }
    
    getDownloadUrl(download?:string) {
        if(!download || !Object.keys(this.downloads).includes(download)) {
            return `https://papermc.io/api/v2/projects/${this.project_id}/versions/${this.version}/builds/${this.build}/downloads/${this.downloads.application.name}`
        } else {
            return `https://papermc.io/api/v2/projects/${this.project_id}/versions/${this.version}/builds/${this.build}/downloads/${this.downloads[download].name}`
        }
    }
    static fromRaw(raw:BuildI):Build
    static fromRaw(raw:BuildI[]):Build[]
    static fromRaw(raw:BuildI|BuildI[]):Build|Build[] {

        if(Array.isArray(raw)) {
            let builds:Build[] = [];

            for(let build of raw) {
                builds.push(Build.fromRaw(build));
            }

            return builds;
        } else {

            return new Build(raw.project_id, raw.project_name, raw.version, raw.build, raw.time, raw.channel, raw.promoted, raw.changes, raw.downloads);

        }

    }

}
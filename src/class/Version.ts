import { APIClient } from "./APIClient";
import { Build } from "./Build";

export interface VersionI {
    project_id: string;
    project_name: string;
    version: string;
    builds: string[];
}

export class Version {

    project_id: string;
    project_name: string;
    version: string;
    builds: string[];

    constructor(
        proj_id: string,
        proj_name: string,
        version: string,
        builds: string[]
    ) {

        this.project_id = proj_id;
        this.project_name = proj_name;
        this.version = version;
        this.builds = builds;

    }

    async getBuild(build: ('latest' | number|string)) {
        let buildId = build;

        if (build == "latest") {
            buildId = this.builds[this.builds.length - 1];
        }

        let buildVer = await APIClient.get('/projects/' + this.project_id + '/versions/' + this.version + '/builds/' + buildId);

        return Build.fromRaw(buildVer);

    }

    static fromRaw(raw: VersionI): Version
    static fromRaw(raw: VersionI[]): Version[]
    static fromRaw(raw: VersionI | VersionI[]): Version | Version[] {

        if (Array.isArray(raw)) {

            let versions: Version[] = [];

            for (let r of raw) {
                versions.push(Version.fromRaw(r));
            }

            return versions;

        } else {

            return new Version(raw.project_id, raw.project_name, raw.version, raw.builds)

        }

    }

}
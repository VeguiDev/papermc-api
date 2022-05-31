import { APIClient } from "./APIClient";


interface ProyectI {
    proyect_id:string;
    proyect_name:string;
    version_groups:string[];
    versions:string[];
}

export class PaperAPI {
    static async proyect(proyect:("paper"|"travertine"|"waterfall"|"velocity")) {
        let res = await APIClient.get('/proyects/'+proyect);
        if(!res) {
            return null;
        } else {

            return Proyect.fromRaw(res);

        }
    }
}

class Proyect implements ProyectI {

    proyect_id: string;
    proyect_name: string;
    version_groups: string[];
    versions: string[];

    constructor(id:string, name:string, version_groups:string[], versions:string[]) {
        this.proyect_id = id;
        this.proyect_name = name;
        this.version_groups = version_groups;
        this.versions = versions;
    }

    static fromRaw(raw:ProyectI) {
        return new Proyect(raw.proyect_id, raw.proyect_name, raw.version_groups, raw.versions);
    }

}
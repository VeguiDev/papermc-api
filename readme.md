
![PaperMC Logo](https://papermc.io/images/logo-marker.svg)

# PaperMC Downloads Api

*This library allows you to obtain version information of PaperMC projects and also generate download links.*

**Table of Contents:**

- [Quickstart](#quickstart)
- [Documentation](#documentation)

## Quickstart

Installing the client librery
```
npm install papermc-api
```

## Documentation

**PaperAPI.projects()**

List all PaperMC projects.
```ts
let projects = await PaperAPI.projects(); // Returns array with all PaperMc projects.
```

**PaperAPI.project(project_id)**

Get the information of a PaperMC project.
`project_id`: must be *waterfall*/*velocity*/*paper*.
```ts
let project = await PaperAPI.project("waterfall"); // Returns project info
```

**PaperAPI.project(project_id).getVersion(version)**

Get a version of a PaperMC project.

`version`: Must be a Minecraft Version. *Example: 1.19.2*
```ts
let project = await PaperAPI.project("waterfall"); // Returns project info

let version = await project.getVersion("1.19.2"); // Returns version info
```

**PaperAPI.project(project_id).getVersion(version).getBuild(build_number)**

Get the build information of a version of the PaperMC project

`build_number`: Must be a valid build number or latest. *Example: 568 or latest*
```ts
let project = await PaperAPI.project("waterfall"); // Returns project info

let version = await project.getVersion("1.19.2"); // Returns version info

let build = await version.getBuild("latest"); // Returns Build info
```

**PaperAPI.project(project_id).getVersion(version).getBuild(build_number).getDownloadUrl(download)**

Generates a link to download the specified file.

`download` *optional*: Specifies the file from which you want the link, in case you do not specify this parameter, the file will be downloaded *applicaiton*.

```ts
let project = await PaperAPI.project("waterfall"); // Returns project info

let version = await project.getVersion("1.19.2"); // Returns version info

let build = await version.getBuild("latest"); // Returns Build info

let downloadUrl = build.getDownloadUrl(); // Returns download URL for in this case waterfall 1.19.2
```

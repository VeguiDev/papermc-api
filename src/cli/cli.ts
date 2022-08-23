#!/usr/bin/env node

import {program} from 'commander';
import {ProjectsCommand} from './commands/projects';
import {ProjectCommand} from './commands/project';
import {DownloadCommand} from './commands/download';

program.addCommand(ProjectsCommand);
program.addCommand(ProjectCommand);
program.addCommand(DownloadCommand);

program.parse();
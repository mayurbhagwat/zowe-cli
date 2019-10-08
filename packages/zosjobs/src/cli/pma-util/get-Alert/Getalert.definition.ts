/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright Contributors to the Zowe Project.
*
*/


import { ICommandDefinition, ICommandOptionDefinition } from "@zowe/imperative";
// import { JobDefinition } from "./Job/job.definition";

export const GetalertDefinition: ICommandDefinition = {
    name: "get-alert",
    aliases: ["geta"],
    type: "command",
    summary: "get today's performance alert information",
    description: "check if there is any alert is created in the PMA ",
    handler: __dirname + "/Getalert.handler",
    profile: {
        optional: ["zosmf"],
    },
    positionals: [
        {
            name: "jobname",
            description: "The jobname (e.g. TESTPMA8) of the job. ",
            type: "string",
            required: true
        },
    ],
    options: ([
        {
            name: "view-all-spool-content", aliases: ["vasc"],
            description: "Print all spool output." +
                " If you use this option you will wait the job to complete.",
            type: "boolean"
        },
    ]as ICommandOptionDefinition[]),
    examples: [
        {
            description: "measure job with job name TESTPMA8.",
            options: "TESTPMA8",
        },
    ],
};

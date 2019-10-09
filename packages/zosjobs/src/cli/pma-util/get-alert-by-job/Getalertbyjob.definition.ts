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

export const GetalertbyjobDefinition: ICommandDefinition = {
    name: "get-alert-by-job",
    aliases: ["getabj"],
    type: "command",
    summary: "Get today's performance status for the job.",
    description: "Check if the job has violated statistical norms for performance test. If this returns no record your job is still in good condition for performance metrics. ",
    handler: __dirname + "/Getalertbyjob.handler",
    profile: {
        optional: ["zosmf"],
    },
    positionals: [
        {
            name: "jobname",
            description: "The name of the job you are interested or under test (e.g. TESTPMA8).",
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
            description: "To see if job TESTPMA8 violated statistical norm from performance point of view.",
            options: "TESTPMA8",
        },
    ],
};

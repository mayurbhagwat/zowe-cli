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

export const GetperfDefinition: ICommandDefinition = {
    name: "get-perf",
    aliases: ["getp"],
    type: "command",
    summary: "Get the performance test result for the jobname",
    description: "Get the performance data for the Jobname using PMA.",
    handler: __dirname + "/Getperf.handler",
    profile: {
        optional: ["zosmf"],
    },
    positionals: [
        {
            name: "jobname",
            description: "The name for the job that is under test (e.g. TESTPMA8) ",
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
            description: "To get performance data for job TESTPMA8.",
            options: "TESTPMA8",
        },
    ],
};

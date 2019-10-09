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
    summary: "Get today's performance alert information for all jobs in PMA scope",
    description: "Check for the alert created today by PMA for those job that over consume one of the performance metrics: CPU, Elapse time, EXCP, SRVU ",
    handler: __dirname + "/Getalert.handler",
    profile: {
        optional: ["zosmf"],
    },
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
            description: "List all the jobs that over consume resource.",
            options: "",
        },
    ],
};

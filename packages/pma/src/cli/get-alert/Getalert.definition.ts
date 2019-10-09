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


import { ICommandDefinition } from "@zowe/imperative";
// import { JobDefinition } from "./Job/job.definition";

export const GetalertDefinition: ICommandDefinition = {
    name: "get-alert",
    aliases: ["geta"],
    type: "command",
    summary: "get today's performance alert information",
    description: "check for the alert created in the PMA ",
    handler: __dirname + "/Getalert.handler",
    profile: {
        optional: ["zosmf"],
    },
    examples: [
        {
            description: "To see if any job violated statistical norm from performance point of view today.",
            options: "",
        },
    ],
};

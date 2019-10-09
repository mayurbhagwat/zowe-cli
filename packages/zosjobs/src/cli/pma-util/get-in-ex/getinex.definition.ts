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
import { LocalFileDefinition } from "../../submit/local-file/localFile.definition";

export const GetinexDefinition: ICommandDefinition = {
    name: "get-in-ex",
    aliases: ["getie"],
    type: "command",
    summary: "Include or exclude job(s) from PMA scope",
    description: "Include or exclude job(s) from PMA scope, only those jobs will be measured ",
    handler: __dirname + "/Getperf.handler",
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
            description: "To include TESTPMA8 in PMA scope.",
            options: "TESTPMA8",
        },
    ],
};

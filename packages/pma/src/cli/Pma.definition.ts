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
import { GetperfDefinition } from "./get-perf/Getperf.definition";
import { GetinexDefinition } from "./get-in-ex/getinex.definition";
import { GetalertDefinition } from "./get-alert/Getalert.definition";
import { GetalertbyjobDefinition } from "./get-alert-by-job/Getalertbyjob.definition";
import { ZosmfSession } from "../../../zosmf";

export const definition: ICommandDefinition = {
    name: "pma-util",
    aliases: ["pmau"],
    type: "group",
    summary: "Manage Performance Managment Assistant (PMA) utilities",
    description: "Provides Utilities to access performance data provided by Performance Management Assistant(PMA).",
    children: [
        GetperfDefinition,
        GetinexDefinition,
        GetalertDefinition,
        GetalertbyjobDefinition,
    ],
    passOn: [
        {
            property: "options",
            value: ZosmfSession.ZOSMF_CONNECTION_OPTIONS,
            merge: true,
            ignoreNodes: [
                { type: "group" }
            ]
        }
    ]
};

module.exports = definition;


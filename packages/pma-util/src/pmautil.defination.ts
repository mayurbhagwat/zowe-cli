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
import { SubmitDefinition } from "../../zosjobs/src/cli/submit/Submit.definition";
import { ViewDefinition } from "../../zosjobs/src/cli/view/View.definition";
import { ListDefinition } from "../../zosjobs/src/cli/list/List.definition";
import { CancelDefinition } from "../../zosjobs/src/cli/cancel/Cancel.definition";
import { DeleteDefinition } from "../../zosjobs/src/cli/delete/Delete.definition";
import { DownloadDefinition } from "../../zosjobs/src/cli/download/Download.definition";
import { ZosmfSession } from "../../zosmf/src/ZosmfSession";
import { GetperfDefination } from "./cli/get-perf/Getperf.defination";
import { GetstartstopfDefination } from "./cli/get-start-stop/getstartstop.defination";
import { GetinexDefination } from "./cli/get-in-ex/getinex.defination";

export const definition: ICommandDefinition = {
    name: "pma-util",
    aliases: ["pmau"],
    type: "group",
    summary: "Manage performance management analyzer utilities",
    description: "Manage pma utilities.",
    children: [
        /*SubmitDefinition,
        DownloadDefinition,
        ViewDefinition,
        ListDefinition,
        DeleteDefinition,
        CancelDefinition,*/
        GetperfDefination,
        GetstartstopfDefination,
        GetinexDefination


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

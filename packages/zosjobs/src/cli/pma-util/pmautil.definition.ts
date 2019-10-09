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
import { SubmitDefinition } from "../submit/Submit.definition";
import { ViewDefinition } from "../view/View.definition";
import { ListDefinition } from "../list/List.definition";
import { CancelDefinition } from "../cancel/Cancel.definition";
import { DeleteDefinition } from "../delete/Delete.definition";
import { DownloadDefinition } from "../download/Download.definition";
import { ZosmfSession } from "../../../../zosmf";
import { GetperfDefinition } from "./get-perf/Getperf.definition";
import { GetinexDefinition } from "./get-in-ex/getinex.definition";
import { GetalertDefinition } from "./get-alert/Getalert.definition";
import { GetalertbyjobDefinition } from "./get-alert-by-job/Getalertbyjob.definition";

export const PmautilDefinition: ICommandDefinition = {
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
    ]
};

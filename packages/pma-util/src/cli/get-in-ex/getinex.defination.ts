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
import { LocalFileDefinition } from "../../../../zosjobs/src/cli/submit/local-file/localFile.definition";

export const GetinexDefination: ICommandDefinition = {
    name: "get-perf",
    aliases: ["getp"],
    type: "group",
    summary: "get the performance test result information for the provided jobname",
    description: "Get the performance data for the JOobname using the PMA product.",
    children: [
        LocalFileDefinition,
    ]
};

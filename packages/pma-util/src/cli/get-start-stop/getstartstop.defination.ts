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

export const GetstartstopfDefination: ICommandDefinition = {
    name: "get-start-stop",
    aliases: ["getss"],
    type: "group",
    summary: "You can start or stop the PMA server",
    description: "You can start or stop the PMA server.",
    children: [
        LocalFileDefinition,
    ]
};

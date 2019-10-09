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

import { IHandlerParameters, ImperativeError, ITaskWithStatus, TaskProgress, TaskStage } from "@zowe/imperative";
import { SubmitJobs } from "../../../../zosjobs/src/api/SubmitJobs";
import { IJob } from "../../../../zosjobs/src/api/doc/response/IJob";
import { isNullOrUndefined } from "util";
import * as  fs from "fs";
import { ISubmitParms } from "../../../../zosjobs/src/api/doc/input/ISubmitParms";
import { ISpoolFile } from "../../../../zosjobs/src/api/doc/response/ISpoolFile";
import { IDownloadOptions } from "../../../../zosfiles/src/api/methods/download/doc/IDownloadOptions";
import { Get } from "../../../../zosfiles/src/api/methods/get/Get";
import { ZosmfBaseHandler } from "../../../../zosmf/src/ZosmfBaseHandler";
// import { localfile } from "../../pma-util/";
import getstdin = require("get-stdin");

/**
 * "zos-jobs submit data-set" command handler. Submits a job (JCL) contained within a z/OS data set (PS or PDS member).
 * @export
 * @class SubmitJobHandler
 * @implements {ICommandHandler}
 */
export default class GetalertbyjobHandler extends ZosmfBaseHandler {

    /**
     * Command handler process - invoked by the command processor to handle the "zos-jobs submit data-set"
     * @param {IHandlerParameters} params - Command handler parameters
     * @returns {Promise<void>} - Fulfilled when the command completes successfully OR rejected with imperative error
     * @memberof SubmitDataSetHandler
     */
    private arguments: any;

    public async processCmd(params: IHandlerParameters): Promise<void> {
        const status: ITaskWithStatus = {
            statusMessage: "Submitting job",
            percentComplete: TaskProgress.TEN_PERCENT,
            stageName: TaskStage.IN_PROGRESS
        };
        // Save the needed parameters for convenience
        const parms: ISubmitParms = {
            jclSource: undefined,
            viewAllSpoolContent: this.mArguments.viewAllSpoolContent,
            directory: this.mArguments.directory,
            extension: this.mArguments.extension,
            volume: this.mArguments.volume,
            task: status
        };
        const options: IDownloadOptions = {};
        params.response.progress.startBar({ task: status });


        // let response: IJob; // Response from Submit Job
        let apiObj: any;    // API Object to set in the command JSON response
        let spoolFilesResponse: ISpoolFile[]; // Response from view all spool content option
        let source: any;    // The actual JCL source (i.e. data-set name, file name, etc.)
        // let directory: string = this.mArguments.directory;// Path where to download spool content
        this.arguments = params.arguments;
        const pmajob = "pmajob";
        const jobname: string = this.arguments.jobname;
        const jobname1= jobname.toUpperCase();
        const today = "today";
        const tod = new Date();
        // var dd = String(today.getDate()).padStart(2, '0');
        let dd = String(tod.getDate()).substring(0,2);
        if (dd.length === 1 ){
            dd = "0" + dd;
        }
        const mm = String(tod.getMonth() + 1).substring(0,2);
        const yyyy = tod.getFullYear();
        const todaystring: string = yyyy + "-"+ mm + "-" + dd;

        let Jcl: string =
            "//PMAALRT  JOB (124400000),'PMA ALERT',CLASS=A,        \n" +
            "//       MSGCLASS=P,MSGLEVEL=(1,1),NOTIFY=&SYSUID      \n" +
            "//APCXATAB EXEC PGM=APCXATAB                           \n" +
            "//STEPLIB  DD DISP=SHR,DSN=APM.QATT.CADEMO.CEETLOAD    \n" +
            "//APCBALT1 DD DISP=SHR,DSN=APM.QATT.MAT12PMA.KSDSALT   \n" +
            "//APCTAB   DD SYSOUT=*                                 \n" +
            "//APCEREP  DD SYSOUT=*                                 \n" +
            "//APCIN    DD *                                        \n" +
            "INFILE(SYSUT1),                                        \n" +
            "SUBSYSTEM=B                                            \n" +
            "MODE=L                                                 \n" +
            "TEXT=N                                                 \n" +
            "JOBNAME=pmajob                                         \n" +
            "TX-NAME=_________                                      \n" +
            "SYSNAME=_________                                      \n" +
            "PGMNAME=_________                                      \n" +
            "STATE=PEND                                             \n" +
            "CREATION-DATE=today                                    \n" +
            "/*                                                    ";

        Jcl = Jcl.replace(today, todaystring);
        Jcl = Jcl.replace(pmajob, jobname1);
        parms.viewAllSpoolContent = true;
        // const Jcl = await getstdin();
        apiObj = await SubmitJobs.submitJclString(this.mSession, Jcl, parms);
        source = "jobname";
        // if (parms.viewAllSpoolContent) {
        spoolFilesResponse = apiObj;
        // }


        // Print the response to the command
        if (isNullOrUndefined(spoolFilesResponse)) {
            params.response.format.output({
                fields: ["jobid", "retcode", "jobname", "status"],
                output: apiObj,
                format: "object"
            });
            // Set the API object to the correct
            this.data.setObj(apiObj);

            // Print data from spool content
        } else {
            for (const spoolFile of spoolFilesResponse) {
                if (spoolFile.ddName === "APCTAB") {
                    if (!isNullOrUndefined(spoolFile.procName) && spoolFile.procName.length > 0) {
                        this.console.log("Spool file: %s (ID #%d, Step: %s, ProcStep: %s)",
                            spoolFile.ddName, spoolFile.id, spoolFile.stepName, spoolFile.procName);
                    } else {
                        this.console.log("Spool file: %s (ID #%d, Step: %s)",
                            spoolFile.ddName, spoolFile.id, spoolFile.stepName);
                    }
                    this.console.log(spoolFile.data);
                }
            }

            // Set the API object to the correct
            this.data.setObj(spoolFilesResponse);
        }

        params.response.progress.endBar();
        this.data.setMessage(`Submitted JCL contained in "${source}"`);
    }
}

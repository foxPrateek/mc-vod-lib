const constants = require('./constants.js');

/**
 * Send error for failed operations
 */
const sendError = async (sns, topicArn, sendErrParams) => {
    if (!sns || !topicArn || !sendErrParams) {
        throw new Error('Invalid input param during sendError');
    }

    if (!sendErrParams.contentId || !sendErrParams.jobType ||
        !sendErrParams.context || !sendErrParams.module 
        || !sendErrParams.errParams) {
        throw new Error('Invalid sendErrParam during sendError');
    }

    let errParams = sendErrParams.errParams;
    if (!errParams.errorCode || !errParams.errorMessage || !errParams.detailType) {
        throw new Error('Invalid errParam during sendError');
    }

    
    let module_name = sendErrParams.context.logGroupName.split("mc-vod-");
    let logUrl = "[" + module_name[1] + "]" + sendErrParams.context.logStreamName;

    let errString = "["+ errParams.detailType+"]["+errParams.errorCode+"]["+errParams.errorMessage+"]";
    let msg = {
        contentId : sendErrParams.contentId,
        JobType : sendErrParams.jobType,
        logUrl: logUrl,
        errString: errString,
    };

    let subject = {} ;
    subject["event"]= constants.EventType.ERROR;
    subject["module"] = sendErrParams.module;
    subject["db"] = constants.DbType.PUB;
    
    await sendSns(sns, topicArn, {subject : subject, message : msg});
};

/**
 * Send an sns notification with input subject and message
 */
const sendSns = async (sns, topicArn, snsParams) => {

    /* If any SNS param is not set then dont proceed */
    if (!sns || !topicArn || !snsParams.message || !snsParams.subject) {
        throw new Error("Invalid sns param during sendSns");
    }

    if (!snsParams.subject.event || !snsParams.subject.module || !snsParams.subject.db) {
        throw new Error("Invalid subject during sendSns");
    }

    let jsonStrMsg = JSON.stringify(snsParams.message);
    let jsonStrSubject = JSON.stringify(snsParams.subject);

    console.log("SNS publish JSON string : " + jsonStrMsg);

    await sns.publish({
        TargetArn: topicArn,
        Message: jsonStrMsg,
        Subject: jsonStrSubject,
        })
        .promise();
};

module.exports = {
    sendSns : sendSns,
    sendError : sendError
};


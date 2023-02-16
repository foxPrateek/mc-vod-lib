

/**
 * Send error for failed operations
 */
const sendError = async (metadata, context, errParams,module_name,sns) => {

    try {
    
        if (null == metadata || null == context || null == errParams) {
            throw new Error('Invalid input param during sendError');
        }
        
        let module_name = context.logGroupName.split("mc-vod-");
        let logUrl = "[" + module_name[1] + "]" + context.logStreamName;

        let errString = "["+ errParams.detailType+"]["+errParams.errorCode+"]["+errParams.errorMessage+"]";
        let msg = {
          contentId : metadata.contentId,
          JobType : metadata.JobType,
          logUrl: logUrl,
          errString: errString,
        };

        let subject = {} ;
        subject["event"]= common.EventType.ERROR;
        subject["module"] = module_name;
        subject["db"] = common.DbType.PUB;
        
        await sendSns(subject, msg,sns);
    } catch (err) {
        throw err;
    }
    return;
};

const readDB = async (attrname,config_db,docClient) => {

    let value = null;
    /* Create record for database */
    let record = {
    TableName: config_db,
    ExpressionAttributeValues: {
        ":hashkey": attrname,
    },
    KeyConditionExpression: "id = :hashkey",
    ProjectionExpression:value,
    };

    /* Read record in database */
    try {
        let result = await docClient
            .query(record)
            .promise()
            .then(console.log("Read Operation is successful"));
        console.log( "attribute name is " + attrname + "\n") ;     
        value = result.Items[0].val;
        console.log("read value is val = " + value);
    } catch (err) {
        console.log(err.message);
        throw err;
    }

    return value;
};

/**
 * Send an sns notification with input subject and message
 */
const sendSns = async (subject, message,sns) => {
    try {
    /* If any input param is not set then dont proceed */
    if(null == message || null == subject) {
        throw new Error('Invalid input param during sendSns');
    }

    let jsonStrMsg = JSON.stringify(message);
    let jsonStrSubject = JSON.stringify(subject);

    console.log("SNS publish JSON string : " + jsonStrMsg);

    await sns
        .publish({
        TargetArn: process.env.SNS_TOPIC_ARN,
        Message: jsonStrMsg,
        Subject: jsonStrSubject,
        })
        .promise();
    } catch (err) {
        throw err;
    }
    return;
}

module.exports = {
    sendSns : sendSns,
    readDB : readDB,
    sendError : sendError
};


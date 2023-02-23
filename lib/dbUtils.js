/**
 * Reads attribute with attrname from config db
 */
const readConfigDb = async (dbParams, attrname) => {

    let value = null;

    if (!dbParams || !dbParams.docClient || !dbParams.tableName) {
        throw new Error ("Invalid input params for read config db");
    }

    /* Create record for database */
    let record = {
        TableName: dbParams.tableName,
        ExpressionAttributeValues: {
            ":hashkey": attrname,
        },
        KeyConditionExpression: "id = :hashkey",
        ProjectionExpression:value,
    };

    /* Read record in database */
    try {
        let result = await dbParams.docClient
            .query(record)
            .promise()
            .then(console.log("Read success : attrname : " + attrname +
            " , table : " + dbParams.tableName));
        value = result.Items[0].val;
    } catch (err) {
        console.log(err.message);
        throw err;
    }

    return value;
};

/**
 * Read db for external and internal db
 */
 const readDb = async (dbParams, contentId) => {

    if (!dbParams || !dbParams.docClient || !dbParams.tableName) {
        throw new Error ("Invalid input params for read db");
    }

    /* Create record for database */
    let record = {
        TableName: dbParams.tableName,
        ExpressionAttributeValues: {
            ":contentId": contentId
        },
        KeyConditionExpression: "contentId = :contentId",
    };

    /* Read record in database */
    try {
        let result = await dbParams.docClient
            .query(record)
            .promise()
            .then(console.log("Read success : contentId : " + contentId +
            " , table : " + dbParams.tableName));
        return result.Items[0];
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};

/**
 * Write attrname and attrvalue to config db
 */
 const writeConfigDb = async (dbParams, attrname, attrvalue) => {

    if (!dbParams || !dbParams.docClient || !dbParams.tableName || !attrvalue
        || !attrname) {
        throw new Error ("Invalid input params for write config db");
    }

    /* Create record for database */
    var record = {
        TableName: dbParams.tableName,
        Key: {
            id: attrname,
        },
        UpdateExpression: "SET val=:attrvalue",
        ExpressionAttributeValues: {
            ":attrvalue": attrvalue,
        },
        ReturnValues: "UPDATED_NEW",
    };

    /* Write record in database */
    try {
    await dbParams.docClient
        .update(record)
        .promise()
        .then(console.log("Write success : attrname : " + attrname +
        " , attrvalue : " + attrvalue + " , table : " + dbParams.tableName));
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};


module.exports = {
    readConfigDb : readConfigDb,
    readDb : readDb,
    writeConfigDb : writeConfigDb
};

/**
 * Reads attribute with attrname from config db
 */
const readConfigDb = async (dbParams, attrname) => {

    let value = null;

    if (!dbParams || !dbParams.docClient || !dbParams.dbName) {
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
            .then(console.log(dbParams.tableName + " read is successful"));
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
 * Read db for external and internal db
 */
 const readDb = async (dbParams, contentId) => {

    if (!dbParams || !dbParams.docClient || !dbParams.dbName) {
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
            .then(console.log(dbParams.tableName + " read is successful"));
    } catch (err) {
        console.log(err.message);
        throw err;
    }
  
    return result.Items[0];
};

/**
 * Write attrname and attrvalue to config db
 */
 const writeConfigDb = async (dbParams, attrname, attrvalue) => {

    if (!dbParams || !dbParams.docClient || !dbParams.dbName || !attrvalue || !attrname) {
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
        ReturnValues: DbAttr.RETVAL,
    };

    /* Write record in database */
    try {
    await dbParams.docClient
        .update(record)
        .promise()
        .then(console.log(dbParams.tableName + " write is successful"));
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

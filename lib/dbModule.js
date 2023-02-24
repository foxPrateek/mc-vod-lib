/**
 * Reads attribute whose id matches attrname in config db
 * 
 * @param {Object} docClient : dynamodb document client instance
 * @param {string} tableName : config table name
 * @param {string} attrname : attribute name (should match id of config db)
 * 
 * @returns {String} value of the attribute which matches attrname
 */
const readConfigDb = async (docClient , tableName, attrname) => {

    let value = null;

    if (!docClient || !attrname|| !tableName) {
        throw new Error ("Invalid input params for read config db");
    }

    let dbParams = {
        keys : {"id" : attrname},
        attrs : ["val"]
    };

    try {
        let result = await readDb(docClient, tableName, dbParams);
        value = (result) ? result.val : null;
    } catch (err) {
        console.log(err.message);
        throw err;
    }

    return value;
};

/**
 * Read whole db entry where primary key matches contentId
 * Applicable for only external and internal db
 * 
 * @param {Object} docClient : dynamodb document client instance
 * @param {string} tableName : table name (internal or external db)
 * @param {string} contentId : content Id (should match primary key)
 * 
 * @returns {Object} db entry which matches contentId
 */
 const readDbEntry = async (docClient, tableName, contentId) => {

    if (!contentId || !docClient || !tableName) {
        throw new Error ("Invalid input params for read db");
    }
    
    let dbParams = {
        keys : {"contentId" : contentId},
    };

    /* Read record in database */
    try {
        let result = await readDb(docClient, tableName, dbParams);
        return result;
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};

/**
 * Generic read function to read from any db type
 * 
 * @param {Object} docClient : dynamodb document client instance
 * @param {string} tableName : table name (internal or external db)
 * @param {Object} dbParams : holder for keys and attrs
 *      keys : object that contains primary key name and its value
 *      attrs : array of attribute names that needs to be read
 * 
 * @returns {Object} db result which matches dbParams.keys (contains attributes
 * specified in dbParams.attrs and entire db entry if dbParams.attr is set to null)
 */
const readDb = async (docClient , tableName, dbParams) => {

    if (!dbParams || !docClient || !tableName) {
        throw new Error ("Invalid input params for read db");
    }

    let keys = dbParams.keys;
    let attrs = dbParams.attrs;

    if (!keys) {
        throw new Error ("Invalid keys in read db");
    }

    /* Create record for database */
    let record = {
        TableName: tableName,
        ExpressionAttributeValues: {},
    };

    Object.entries(keys).forEach(([key , value]) => {
        record.KeyConditionExpression = key + "= :hashkey";
        record.ExpressionAttributeValues[':hashkey'] = value;
    });

    if (attrs) {
        let count = 0;
        attrs.forEach((attr) => {
            record.ProjectionExpression = (count == 0) ? ""
                : record.ProjectionExpression + ",";
            record.ProjectionExpression += attr;
            count++;
        });
    }

    console.log("read db for record : " + JSON.stringify(record));

    /* Read record in database */
    try {
        let result = await docClient
            .query(record)
            .promise()
            .then(console.log("Read success from table : " + tableName));
        return result.Items[0];
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};

/**
 * Write attrname and attrvalue to config db
 * 
 * @param {Object} docClient : dynamodb document client instance
 * @param {string} tableName : table name (of config db)
 * @param {string} attrname : attribute name (written to id)
 * @param {string} attrvalue : attribute value (written to val corresponding to attrname)
 */
 const writeConfigDb = async (docClient, tableName, attrname, attrvalue) => {

    if (!docClient || !tableName || !attrvalue || !attrname) {
        throw new Error ("Invalid input params for write config db");
    }
    
    let dbParams = {
        keys : {"id" : attrname},
        attrs : {"val" : attrvalue}
    };

    /* Write record in database */
    try {
        await writeDb(docClient, tableName, dbParams);
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};

/**
 * Generic Write db which writes dbParams to tableName 
 * 
 * @param {Object} docClient : dynamodb document client instance
 * @param {string} tableName : table name
 * @param {Object} dbParams : holder for keys and attrs
 *      keys : object that contains primary key name and its value
 *      attrs : object that contains attribute names and values (these key
 *      value pairs are written to db correponding to primary key)
 */
 const writeDb = async (docClient, tableName, dbParams) => {

    if (!docClient || !tableName || !dbParams) {
        throw new Error ("Invalid input params for write config db");
    }
    
    let keys = dbParams.keys;
    let attrs = dbParams.attrs;

    if (!keys) {
        throw new Error ("Invalid dbParams.keys in write db");
    }

    /* Create record for database */
    let record = {
        TableName: tableName,
        Key: {},
        ExpressionAttributeValues: {},
        ReturnValues: "UPDATED_NEW"
    };

    Object.entries(keys).forEach(([key , value]) => {
        record.Key[key] = value;
    });
    
    if (attrs) {
        let count = 0;
        Object.entries(attrs).forEach(([key , value]) => {
            record.UpdateExpression = (count == 0) ? "SET "
                : record.UpdateExpression + ",";
            record.UpdateExpression += key + "=:" + key;
            
            record.ExpressionAttributeValues[":" + key] = value;
            count++;
        });
    } else {
        throw new Error("Invalid dbParms.attrs in write db");
    }
    
    console.log("write db for record : " + JSON.stringify(record));

    /* Write record in database */
    try {
        await docClient
            .update(record)
            .promise()
            .then(console.log("Write success to table : " + tableName));
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};

module.exports = {
    readConfigDb : readConfigDb,
    readDbEntry : readDbEntry,
    readDb : readDb,
    writeConfigDb : writeConfigDb,
    writeDb : writeDb
};

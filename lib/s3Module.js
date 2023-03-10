/**
 * Extracts bucket and key from s3 url
 * 
 * @param {string} s3Path : s3 url
 * 
 * @returns {Object} containing bucket , key
 */
const getBucketKeyFromS3Url = (s3Path) => {

    if (!s3Path || (s3Path === "")) {
        throw new Error ("s3 Path null or empty in getS3FileData");
    }

    /* Extract bucket and key from input file name */
    let filePathWithS3Removed = s3Path.replace("s3://", "");
    let indexOfFirstDelimit = filePathWithS3Removed.indexOf("/");
    let bucket = filePathWithS3Removed.slice(0, indexOfFirstDelimit);
    let key = filePathWithS3Removed.slice(indexOfFirstDelimit + 1);
    return { bucket : bucket , key : key};
};

/**
 * Downloads the file from s3 and returns file buffer
 * 
 * @param {Object} s3 : aws s3 instance
 * @param {Object} getParams : contains s3Path of file to read
 * 
 * @returns {string} file buffer
 */
 const getS3FileData = async (s3, getParams) => {

    if (!getParams || !s3 ) {
        throw new Error ("Invalid input param in getS3FileData");
    }

    let s3Path = getParams.s3Path;
    let bucketKeyObj = getBucketKeyFromS3Url(s3Path);

    var getS3Params = {
        Bucket: bucketKeyObj.bucket,
        Key: bucketKeyObj.key
    };

    let fileBuf = await s3.getObject(getS3Params).promise();
    if (fileBuf)
        return fileBuf.Body.toString("ascii");
    else
        return null;
};

/**
 * Upload the fileBuf to s3
 * 
 * @param {Object} s3 : aws s3 instance
 * @param {Object} putParams : contains s3Path and buf to write
 */
const putS3FileData = async (s3, putParams) => {

    if (!putParams || !s3) {
        throw new Error ("Invalid input param in putS3FileData");
    }

    let s3Path = putParams.s3Path;
    let fileBuf = putParams.fileBuf;

    if (!fileBuf || fileBuf === "") {
        throw new Error ("fileBuf null or empty in putS3FileData");
    }

    let bucketKeyObj = getBucketKeyFromS3Url(s3Path);

    var putS3Params = {
        Bucket: bucketKeyObj.bucket,
        Key: bucketKeyObj.key,
        Body: fileBuf
    };

    await s3.putObject(putS3Params).promise().then(
    function(data) {
        console.log("Successfully uploaded file to " + s3Path);
    }).catch(
    function(err) {
        console.log(err.toString());
        throw err;
    });
};

module.exports = {
    getS3FileData : getS3FileData,
    putS3FileData : putS3FileData,
    getBucketKeyFromS3Url : getBucketKeyFromS3Url
};
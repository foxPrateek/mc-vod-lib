/**
 * Downloads the file from s3 and returns file buffer
 */
 const getS3FileData = async (s3Params, s3Path) => {

    if (!s3Params || !s3Params.s3 || !s3Path || s3Path === "") {
        throw new Error ("Invalid input param in getS3FileData");
    }

    /* Extract bucket and key from input file name */
    let filePathWithS3Removed = s3Path.replace("s3://", "");
    let indexOfFirstDelimit = filePathWithS3Removed.indexOf("/");
    let bucket = filePathWithS3Removed.slice(0, indexOfFirstDelimit);
    let key = filePathWithS3Removed.slice(indexOfFirstDelimit + 1);

    var getParams = {
        Bucket: bucket,
        Key: key
    };

    let fileBuf = await s3Params.s3.getObject(getParams).promise();
    return fileBuf.Body.toString("ascii");
};

/**
 * Upload the fileBuf to s3
 */
const putS3FileData = async (s3Params, s3Path, fileBuf) => {

    if (!s3Params || !s3Params.s3 || !s3Path || s3Path === "" ||
    !fileBuf || fileBuf === "") {
        throw new Error ("Invalid input param in putS3FileData");
    }

    /* Extract bucket and key from input file name */
    let filePathWithS3Removed = s3Path.replace("s3://", "");
    let indexOfFirstDelimit = filePathWithS3Removed.indexOf("/");
    let bucket = filePathWithS3Removed.slice(0, indexOfFirstDelimit);
    let key = filePathWithS3Removed.slice(indexOfFirstDelimit + 1);

    var putParams = {
        Bucket: bucket,
        Key: key,
        Body: fileBuf
    };

    await s3Params.s3.putObject(putParams).promise().then(
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
    putS3FileData : putS3FileData
};
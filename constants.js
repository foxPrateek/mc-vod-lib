const State = {
    PARSE_INPUT : 'INPUT-PARSING',
    PREPROC     : 'PRE-PROCESSING',
    SUBMIT      : 'JOB-SUBMISSION',
    META        : 'META-GENERATION'
};

const BusinessUnitType = {
    SPORTS : 'sports',
    WEATHER: 'weather'
};

const JobType = {
    ABR     : 'abr',
    ABR_CC  : 'abr_cc',
    MP4_2M  : 'mp4_2m'
};

const OrderType3play = {
    ASR             : "asr",
    TRANSCRIPTION   : "transcription"
};

const EventType = {
    INPUT_DETAILS   : "INPUT_DETAILS",
    ERROR           : "ERROR",
    SET_DEFAULT     : "SET_DEFAULT",
    COMPLETE        : "COMPLETE",
    CANCELED        : "CANCELED",
    STATUS_UPDATE   : "STATUS_UPDATE",
    CC_DETAILS      : "CC_DETAILS",
    CC_HLS_COMPLETE : "CC_HLS_COMPLETE"
};

const DbType = {
    PVT  : "PVT",
    PUB  : "PUB",
    CONF : "CONF"
};

const ContainerType = {
    MP4 : 'mp4',
    HLS : 'hls',
    DASH : 'dash',
    CMAF : 'cmaf',
};

const AssetType = {
    CLIP        : 'clip',
    LONG_FORM   : 'long-form'
};

module.exports = {
    State           : State,
    BusinessUnitType : BusinessUnitType,
    EventType       : EventType,
    DbType          : DbType,
    ContainerType   : ContainerType,
    JobType         : JobType,
    OrderType3play  : OrderType3play,
    AssetType       : AssetType
};


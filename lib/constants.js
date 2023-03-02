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
    CC_HLS_COMPLETE : "CC_HLS_COMPLETE",
    CC_OUTPUT       : "CC_OUTPUT"
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

const CaptionType = {
    NA     : "NA",
    SOURCE : "ccSource",
    ASR    : "ccASR",
    TRANSCRIPTION : "ccTranscription"
};

const FileExtension = {
    /* Input files */
    MP4 : "mp4",
    MOV : "mov",
    MXF : "mxf",
    /* Manifest files */
    M3U8 : "m3u8",
    MPD : "mpd",
    /* Captions */    
    SCC : "scc",
    VTT : "vtt",
    SRT : "srt",
    SMPTETT : "smptett",
    /* Thumbnails */
    JPG : "jpg",
    FS : "fs"
};

module.exports = {
    State           : State,
    BusinessUnitType : BusinessUnitType,
    EventType       : EventType,
    DbType          : DbType,
    ContainerType   : ContainerType,
    JobType         : JobType,
    OrderType3play  : OrderType3play,
    AssetType       : AssetType,
    CaptionType     : CaptionType,
    FileExtension   : FileExtension
};


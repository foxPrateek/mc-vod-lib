const State = {
    PARSE_INPUT : 'INPUT_PARSING',
    PREPROC     : 'PRE-PROCESSING',
    SUBMIT      : 'JOB-SUBMISSION',
    META        : 'META-GENERATION'
};

const BusinessUnitType = {
    SPORTS : 'sports',
    WEATHER: 'weather'
};

const EventType = {
    INPUT_DETAILS : "INPUT_DETAILS",
    ERROR : "ERROR",
    SET_DEFAULT : "SET_DEFAULT"
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

module.exports = {
    State : State,
    BusinessUnitType : BusinessUnitType,
    EventType : EventType,
    DbType : DbType,
    ContainerType : ContainerType
};


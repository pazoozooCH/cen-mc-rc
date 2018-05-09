export type BatchCodeAttrT = (string & ("env_unk" | "env_normal" | "env_plastic" | "pqua_std" | "pqua_low" | "pqua_colour" | "bgr_std" | "bgr_dark" | "bgr_colour" | "bgr_text" | "bgr_unln" | "fntt_var" | "fntt_std" | "fntt_italic" | "fntt_dmatrix" | "fntp_var" | "fntp_prop" | "fntp_const"));
export type BatchStatusAttrT = (string & ("origin_unk" | "origin_sm" | "origin_mm"));
export type BatchCntryCodeAttrT = (string & ("national" | "import" | "export" | "mix"));
export type AddressRegionT1 = (RegionT & AddressRegionT);
export type InfoCarrierT = (string & ("address" | "barcode" | "logo" | "endln"));
export type MailpieceFaceT = (string & ("top" | "bottom" | "left" | "right" | "front" | "rear"));
export type RestrictionTypeT = (string & ("include" | "exclude"));
export type RcStateT = (string & ("ready" | "notready" | "initializing" | "notconnected"));
export type CapabilityTypeT = (string & ("rec_code" | "sen_code" | "mcl_code" | "end_code" | "dbc_code" | "cbc_code" | "pbc_code" | "result_management" | "image_request" | "synch_result_trans" | "asynch_result_trans"));
export type ActionT = (string & ("online" | "offline" | "mixed"));
export type Disconnect = {
    [k: string]: any;
};
export type GetRcStatus = {
    [k: string]: any;
};
export type GetMcStatus = {
    [k: string]: any;
};
export type McStateT = (string & ("running" | "stopped" | "test" | "maintenance"));
export type SubmitMailpiece1 = (MailpieceSubmissionT & SubmitMailpiece);
export type MailpieceTypeT = (string & ("unknown" | "letter" | "letter_bundle" | "flat" | "flat_bundle" | "parcel"));
export type ImageTypeT = (string & ("all" | "binary" | "grey" | "color"));
export type ImageResolutionT = (string & ("all" | "high" | "low"));
export type ImageStatusT = (string & ("OK" | "no_image" | "invalid_id"));
export type Type9 = (string & ("Postnet" | "Planet" | "RM4SCC" | "USPS4SC" | "KIXC" | "AUPC" | "2of5" | "I2of5" | "Codabar" | "AIM39" | "AIM93" | "AIM128" | "UPC-A" | "UPC-E" | "EAN-8" | "EAN-13" | "EAN-128" | "RSS-14" | "PDF417" | "Aztec" | "DataMatrix" | "MaxiCode" | "FIM"));
export type BarCodeStatusT = (string & ("no_barcode" | "detected_and_recognized" | "detected_and_not_recognized"));
export type TransmitMailpieceAttributes1 = (RcResultT & TransmitMailpieceAttributes);

export interface UpdateMailpieceAttributes {
    iood?: boolean;
    weight?: number;
    indiciaValue?: string;
    indiciaType?: string;
    sortBin?: number;
    idtagPrintStatus?: boolean;
    code?: string;
    finalCoded?: boolean;
    mailpieceId: string;
    sourceId?: string;
    scannerId?: string;
    feederId?: string;
    sortplanId?: string;
    [k: string]: any;
}
export interface Connect {
    interfaceVersionId: string;
    machineControllerId: string;
    feederId: string;
    heartbeatTimeInt: number;
    initialBatchInformation?: BatchInformationT;
    [k: string]: any;
}
export interface BatchInformationT {
    batchInfo: BatchDescriptionT;
    sourceId?: string;
    feederId?: string;
    sortplanId?: string;
    liftLocation?: string;
    geoMode?: BatchCntryCodeAttrT;
    mailFlow?: string;
    [k: string]: any;
}
export interface BatchDescriptionT {
    mailerId?: string;
    batchId?: string;
    codeAttr?: BatchCodeAttrT[];
    statusAttr?: BatchStatusAttrT;
    geoMode?: BatchCntryCodeAttrT;
    cntryId?: string;
    region?: AddressRegionT1;
    location?: LocationT;
    restrictions?: RestrictionT[];
    mailFlow?: string;
    creator?: string;
    version?: string;
    od?: string;
    [k: string]: any;
}
export interface RegionT {
    type: InfoCarrierT;
    symbology?: string;
    [k: string]: any;
}
export interface AddressRegionT {
    [k: string]: any;
}
export interface LocationT {
    face?: MailpieceFaceT;
    angle?: number;
    confidence?: number;
    polygon: PolygonT;
    page?: number;
    [k: string]: any;
}
export interface PolygonT {
    dot: PolygonTDot[];
    [k: string]: any;
}
export interface PolygonTDot {
    x: number;
    y: number;
    [k: string]: any;
}
export interface RestrictionT {
    type: RestrictionTypeT;
    location: LocationT;
    [k: string]: any;
}
export interface PutRcStatus {
    state: RcStateT;
    text?: string;
    selectedReadyCapabilities: CapabilitySetT;
    selectedNotReadyCapabilities: CapabilitySetT;
    [k: string]: any;
}
export interface CapabilitySetT {
    capability: CapabilityT[];
    [k: string]: any;
}
export interface CapabilityT {
    type: CapabilityTypeT;
    subType?: string[];
    symbology?: string[];
    action?: ActionT[];
    [k: string]: any;
}
export interface McrcMessage {
    connect: Connect;
    disconnect: Disconnect;
    selectCapabilities: CapabilitySetT;
    getRcStatus: GetRcStatus;
    putRcStatus: PutRcStatus;
    getMcStatus: GetMcStatus;
    putMcStatus: PutMcStatus;
    submitMailpiece: SubmitMailpiece1;
    updateMailpieceAttributes: UpdateMailpieceAttributes;
    requestMailpieceAttributes: RequestMailpieceAttributes;
    requestImage: ImageAttributesT;
    transmitImage: TransmitImage;
    transmitMailpieceAttributes: TransmitMailpieceAttributes1;
    [k: string]: any;
}
export interface PutMcStatus {
    state: McStateT;
    text?: string;
    [k: string]: any;
}
export interface MailpieceSubmissionT {
    taskSet?: TaskT[];
    mpAttr?: MailpieceAttrT;
    [k: string]: any;
}
export interface TaskT {
    capability?: CapabilityT;
    batchInfo?: BatchDescriptionT;
    [k: string]: any;
}
export interface MailpieceAttrT {
    type: MailpieceTypeT;
    mailclass?: string;
    faces?: FaceSetT;
    preknowledge?: RecognitionResultT;
    [k: string]: any;
}
export interface FaceSetT {
    face: FaceSetTFace[];
    [k: string]: any;
}
export interface FaceSetTFace {
    value?: MailpieceFaceT;
    page?: number;
    [k: string]: any;
}
export interface RecognitionResultT {
    code?: string;
    codeCnf?: number;
    codeAttr?: string[];
    statusAttr?: string[];
    text?: string;
    reject?: string;
    region?: RegionT;
    recognizedElements?: TextElementT[];
    standardizedElements?: StandardizedElementT[];
    location?: LocationT;
    attrDict?: AttributeDictionaryT;
    creator?: string;
    version?: string;
    od?: string;
    [k: string]: any;
}
export interface TextElementT {
    type: string;
    nominal?: NominalT;
    reference?: ReferenceT[];
    [k: string]: any;
}
export interface NominalT {
    type: string;
    code: string;
    codeCnf: number;
    attribute?: string[];
    location?: LocationT;
    [k: string]: any;
}
export interface ReferenceT {
    type: string;
    code: string;
    matchCnf?: number;
    attribute?: string[];
    [k: string]: any;
}
export interface StandardizedElementT {
    type: string;
    code: string;
    attribute?: string[];
    [k: string]: any;
}
export interface AttributeDictionaryT {
    id: string;
    attr?: AttributeT[];
    [k: string]: any;
}
export interface AttributeT {
    name: string;
    val: string;
    [k: string]: any;
}
export interface SubmitMailpiece {
    permittedTime?: number;
    mailpieceId?: string;
    idTag?: string;
    sourceId?: string;
    feederId?: string;
    sortplanId?: string;
    liftLocation?: string;
    geoMode?: BatchCntryCodeAttrT;
    mailFlow?: string;
    [k: string]: any;
}
export interface RequestMailpieceAttributes {
    mailpieceId: string;
    idTag?: string;
    permittedTime?: number;
    [k: string]: any;
}
export interface ImageAttributesT {
    feederId?: string;
    scannerId?: string;
    sourceId?: string;
    type: ImageTypeT;
    resolution: ImageResolutionT;
    [k: string]: any;
}
export interface TransmitImage {
    requestParameters?: ImageAttributesT;
    imageStatus?: ImageStatusT;
    availableAttributes?: RcResultT;
    [k: string]: any;
}
export interface RcResultT {
    addressResult?: AddressResultT;
    sortBin?: string;
    mpSize?: DimensionT;
    barCode?: BarCodeT[];
    printText?: PrintTextT;
    [k: string]: any;
}
export interface AddressResultT {
    code?: string;
    codeAttribute?: string[];
    finalCoded?: boolean;
    statusAttr?: string;
    resultSource?: string;
    rejectReason?: string[];
    [k: string]: any;
}
export interface DimensionT {
    _long?: number;
    high?: number;
    thick?: number;
    [k: string]: any;
}
export interface BarCodeT {
    type?: Type9;
    value?: string;
    status: BarCodeStatusT;
    [k: string]: any;
}
export interface PrintTextT {
    type: string;
    textLine: string[];
    [k: string]: any;
}
export interface TransmitMailpieceAttributes {
    mailpieceId?: string;
    idTag?: string;
    permittedTime?: number;
    [k: string]: any;
}

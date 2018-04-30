export enum BatchCntryCodeAttrT {
    national, import, export, mix
}
export enum InfoCarrierT {
    address, barcode, logo, endln
}
/**
 * Specifies the valid scale of values of RC capabilities
 * * rec_code – recipient address recognition
 * * sen_code – sender address recognition
 * * mcl_code – mailclass determination
 * * end_code – endorsement line recognition
 * * dbc_code – distribution barcode recognition
 * * cbc_code – customer barcode recognition
 * * pbc_code – product barcode recognition
 * * result_management – Storage/Query of enrichment results e.g. by ID Tag
 * * image_request – request image by MC, e.g. for selection of batch region
 * * synch_result_trans – Synchronous result transmission
 * * asynch_result_trans – Asynchronous result transmission
 */
export enum CapabilityTypeT {
    rec_code, sen_code, mcl_code, end_code, dbc_code, cbc_code, pbc_code, result_management, image_request, synch_result_trans, asynch_result_trans
}
export enum ActionT {
    online, offline, mixed
}
/**
 * * envelope characteristics
 *   * env_var - type of envelop varies
 *   * env_normal - type of envelop is normal
 *   * env_plastic - type of envelop is plastic
 * * print quality
 *   * pqua_std - print quality of address is standard
 *   * pqua_low - low-contrast print quality of address
 *   * pqua_colour - coloured print of address
 * * background characteristics
 *   * bgr_text - textured background in address block area
 *   * bgr_unln - background in address block area with underlines
 * * info about the font type
 *   * fntt_var - font type varies
 *   * fntt_std - standard font type
 *   * fntt_italic - italic font
 *   * fntt_dmatrix - dot-matrix font
 * * font pitch characteristics
 *   * fntp_var - font pitch varies
 *   * fntp_prop - proportinal font pitch
 *   * fntp_const - constant font pitch
 */
export enum BatchCodeAttrT {
    env_unk, env_normal, env_plastic, pqua_std, pqua_low, pqua_colour, bgr_std, bgr_dark, bgr_colour, bgr_text, bgr_unln, fntt_var, fntt_std, fntt_italic, fntt_dmatrix, fntp_var, fntp_prop, fntp_const
}
/**
 * * origin_unk - origin of mail in the batch is unknown
 * * origin_sm - origin of mail in the batch is single mailer
 * * origin_mm - origin of mail in the batch is multiple mailer
 */
export enum BatchStatusAttrT {
    origin_unk, origin_sm, origin_mm
}
export enum MailpieceFaceT {
    top, bottom, left, right, front, rear
}
export enum RestrictionTypeT {
    include, exclude
}
export enum MailpieceTypeT {
    unknown, letter, letter_bundle, flat, flat_bundle, parcel
}
export enum MailFlowT {
    outgoing, regional, incoming
}

export interface SubmitMailpiece {
    timestamp: string; // [extension] @format date-time
    /**
     * Specifies the allowed processing time for the individual submission.
     * It is set by the MC.The unit of permitted_time is milliseconds (ms).
     */
    permittedTime?: number; 

    mailpieceId?: string; // Represents the identifier for the mail item, which has to be processed by the RC.
    idTag?: string; // Represents a long living identifier for the mail item. 
    sourceId?: string; // Identifies the sorting machine. 
    feederId?: string; // Refers to the feeding unit, where the mailpiece image was lifted. 
    sortplanId?: string; // Provides the id of the sortplan selected from a machine operator.
    
    /**
     * Represents a container and stores capability specific
     * information in single data sets. An MC can support the RC with multiple "task sets" and as 
     * a result of that request capability specific recognition.
     * 
     * When this element is missing the RC System is expected to apply all selected capabilities.
     */
    taskSet?: TaskT[];
    
    /**
     * The MailpieceAttrT type is assigned to the element mp_attr. It provides basic
     * mailpiece related information:
     * - the kind of the mail item
     * - the mailclass of the mail item; important for the ED because it and may affect the address recognition
     * - the scanned faces of the mail item. The FaceSetT type is assigned to faces and allows providing a sequence of faces. 
     *   The FaceSetT types allows to link a face with the corresponding image by a page attribute.
     * - a preknowledge result if a barcode reader or some other type of Enrichment Device is directly attached to the MC.
     *   This result will be in accordance with the result type specified in the IC-ED interface.
     */
    mpAttr?: MailpieceAttrT;    
    liftLocation?: string; // specifies the sorting centre where the image lift occurred.
    geoMode?: BatchCntryCodeAttrT; // provides information about the geographic destination of the mail batch 
    /**
     * * outgoing : mail is to be delivered all around the country (and outbound)
     * * regional : mail is to be delivered in the region of the sorting centre
     * * incoming : mail is to be delivered within the sorting centre area
     */
    mailFlow?: MailFlowT;
}

/**
 * Provides all information which RC requires to process the requested task(s).
 */
export interface TaskT {
    /**
     * Holds the description of the tasks which have to
     * be processed by the RC. The description and structure is strongly
     * dependent on the specific capability.
     */
    capability?: CapabilityT; 
    
    batchInfo?: BatchDescriptionT; // Allows the MC to specify batch characteristics to apply to the mailpiece.
}

/**
 * The capability enables an MC to specify a detailed recognition request and to control the recognition of an
 * RC. It further puts an RC in the position to forward its capabilities to an MC.
 * In difference to the CapabilityT used in the OCR/VCS interface, this type is extended with the values “online”
 * and “offline” in the ActionT.
 */
export interface CapabilityT {
    type: CapabilityTypeT;
    
    /**
     * represents a refinement of the recognition task. For
     * address recognition purposes it might be necessary to supply the RC with
     * the required coding depth like “inward or outward coding”. Basically the
     * existence of the sub_type element and its value range depend on the
     * specific capability.
     */
    subType?: string[];

    /**
     * The symbology depends on the characteristics of the info carrier. The data
     * model provides fashioned data types for the different carriers. InfoCarrierT
     * specifies the valid values.
     */
    symbology?: string[];

    /**
     * Influences the recognition of the RC. The MC can
     * specify if the recognition is expected online, offline, or both on- and offline
     * (mixed).
     */
    action?: ActionT[];
}

/**
 * Specifies the structure of a batch description. A batch is attached to a recipient address
 * only - capability rec_code.
 */
export interface BatchDescriptionT {
    mailerId?: string; // Identification of the mailer of a particular batch 
    batchId?: string; // Identification of the individual batch 
    codeAttr?: BatchCodeAttrT[]; // Provides information about features of the envelop, the address region and the address print itself. 
    statusAttr?: BatchStatusAttrT; // Provides information about the origin of the batch. BatchStatusAttrT specifies the valid ‘flags’. 
    geoMode?: BatchCntryCodeAttrT; // Provides information about the geographic destination of the mail batch 
    cntryId?: string; // The ISO two-character country ID for the batch description, if the mail has a foreign destination("export" for geo_mode). 
    region?: RegionT; // The element provides information about the address region
    location?: LocationT; // Location of a batch area 
    restrictions?: RestrictionT[]; // Include or exclude zones
    mailFlow?: MailFlowT; // The mail_flow attribute specifies the mail flow currently processed.
    creator?: string;
    version?: string;
    od?: string;
}

/**
 * To specify a region location, the region descriptor LocationT listed subsequently is used. LocationT encloses
 * no information about the image orientation. The image orientation is specified in the TIFF header. Region
 * coordinates are given in pixel and are related to the image origin which corresponds to the upper left corner.
 * The coordinates are independent of the TIFF orientation.
 */
export interface LocationT {
    /**
     * Face is basically optional. It is redundant in the result due to the fact, that the
     * linkage between a region and the corresponding image is realized with the
     * page attribute. face can represent a helpful hint in a multi-side scanning
     * environment like a camera tunnel for a parcel applications. The valid face
     * values are specified by MailpieceFaceT. The type is located in the primitives
     * layer.
     */
    face?: MailpieceFaceT;
    
    /**
     * The element angle specifies the orientation of the region. The element is of
     * type float and accepts values between 0.0 and 360.0 degree. The clockwise
     * rotation by this angle results in an oriented region (e.g. a horizontally
     * oriented text line, which can be read from left to right or right to left in the
     * case of mirrored images). The angle is measured from the x axis (== scan
     * line) of the image to the read direction of a text line in the region.
     */
    angle?: number;

    /**
     * The element confidence provides a confidence level for the detected region.
     * [float 0..1] – 1.0 highest confidence
     */
    confidence?: number;
    
    /**
     * The polygon of the region frame complies with a right-angled rectangular
     * with 4 coordinate tuples (dots). The order of the corner marks are either
     * counter-clockwise (in respect to the display of unmirrored images) or
     * clockwise (in respect to the display of mirrored images) and indicate the
     * orientation of the region. The dots correspond to the following corners:
     * * 1st: top left
     * * 2nd bottom left
     * * 3rd bottom right
     * * 4th top right
     * No intersection is allowed.
     */
    polygon: PolygonT;

    /**
     * The page attribute is of vital importance, if an enrichment request provides a
     * TIFF stream with multiple images. In that case the page attribute is
     * mandatory. It enables the result provider to assign its result – the region - to
     * a single image in the TIFF stream. The page attribute is optional, if the TIFF
     * stream contains just one image.
     * The region provider has to extract the page information from the TIFF
     * header of the image the region relates to. The number is stored in the tag
     * PageNumber
     */
    page?: number;
}

export interface PolygonT {
    dot: PolygonTDot[];
}

export interface PolygonTDot {
    x: number;
    y: number;
}

export interface RestrictionT {
    type: RestrictionTypeT;
    location: LocationT;
}

/**
 * This type is taken without change from CEN/TS 15448.
 * This type represents a template for different region descriptors specified in the base layer, e.g. address or
 * barcode region descriptors.
 */
export interface RegionT {
    /**
     * provides information about the content of the region - e.g. distribution code of
     * recipient address
     */
    type: InfoCarrierT;
    
    /**
     * The symbology is specified as string and tailored in the derived types dependent
     * on the “type” element.
     */
    symbology?: string;
}

/**
 * This type is taken from CEN/TS 15448 and extended by a “preknowledge” element.
 * The type MailpieceAttrT specifies basic mailpiece attributes.
 */
export interface MailpieceAttrT {
    type: MailpieceTypeT; // Defines the type of the mail item

    /**
     * provides the mailclass of the mailpiece
     * The valid range of mailclass values have to be customized project
     * specific. This applies also to the code element in the mailclass result
     * (MailClassT) which can be returned from an ED. Both – the mailclass
     * element here and the code element as part of a mailclass result - have to
     * provide the same range of values.
     */
    mailclass?: string;
    
    /**
     * The faces element is optional. The FaceSetT type is assigned to the
     * element. Every face is linked with the corresponding page attribute which
     * is required. face and page are important in an environment where multiple
     * faces of a mail item have been lifted. If that is the case the IC has to
     * provide the information about the disposable faces.
     */
    faces?: FaceSetT;
    
    /**
     * Provides preknowledge to the RC System, e.g. a barcode
     * result if a barcode reader is integrated into the machine.
     */
    preknowledge?: RecognitionResultT;
}

export interface FaceSetT {
    face: FaceSetTFace[];
}

export interface FaceSetTFace {
    value?: MailpieceFaceT;
    page?: number;
}

export interface RecognitionResultT {
    intMailpieceId: string; // [extension] International identCode
    additionalBarcodes: string[]; // [extension] PRZL codes
    dimension: Dimension; // [extension]
    lft: LFT; // [extension]
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
}

export interface TextElementT {
    type: string;
    nominal?: NominalT;
    reference?: ReferenceT[];
}

export interface NominalT {
    type: string;
    code: string;
    codeCnf: number;
    attribute?: string[];
    location?: LocationT;
}

export interface ReferenceT {
    type: string;
    code: string;
    matchCnf?: number;
    attribute?: string[];
}

export interface StandardizedElementT {
    type: string;
    code: string;
    attribute?: string[];
}

export interface AttributeDictionaryT {
    id: string;
    attr?: AttributeT[];
}

export interface AttributeT {
    name: string;
    val: string;
}

/**
 * Parcel dimension (millimeters?)
 */
export interface Dimension {
    length: number;
    width: number;
    height: number;
}

/**
 * LFT = ?
 */
export interface LFT {
    state: number;
    shape: number;
    actualVolume: number; // dm3
    boxVolume: number; // dm3
    volumeRatio: number; // is it not redundant?
    weight: number; // grams ?
}
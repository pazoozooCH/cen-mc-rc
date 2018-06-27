/**
 * Provides the valid symbologies of a barcode label:
 * 
 * * Postnet - USPS Postnet barcode
 * * Planet - USPS Planet barcode
 * * RM4SCC - Royal Mail 4-State Customer Code
 * * USPS4SC - USPS 4-State Code
 * * KIXC - Netherlands 4-State Customer Code
 * * AUPC - Australian Postal Code - 4-State Barcode
 * * 2of5I - 2 of 5 Code - Industrial
 * * I2of5 - Interleaved 2 of 5 Code
 * * Codabar
 * * AIM39 - Code 39
 * * AIM93 - Code 93
 * * AIM128 - Code 128
 * * UPC-A
 * * UPC-E - short version of UPC-A
 * * EAN-8 - European Article Number - Length 8
 * * EAN-13
 * * EAN-128
 * * RSS-14 - Reduced Space Symbology
 * * PDF417 - Potable Data File 417
 * * Aztec
 * * DataMatrix
 * * MaxiCode
 * * FIM
 */
export enum BarCodeSymbologyT {
    Postnet, Planet, RM4SCC, USPS4SC, KIXC, AUPC, _2of5, I2of5, Codabar, AIM39, AIM93, AIM128, UPC_A, UPC_E, EAN_8, EAN_13, EAN_128, RSS_14, PDF417, Aztec, DataMatrix, MaxiCode, FIM
}
export enum BarCodeStatusT {
    no_barcode, detected_and_recognized, detected_and_not_recognized
}

/**
 * This type contains the result for a mail piece that has been determined by the RC System.
 **/
export interface TransmitMailpieceAttributes {
    rcResult?: RcResultT; // Basic Element which holds the result for a mail piece.
    mailpieceId?: string; // Represents the identifier for the mail item, which has to be processed by the RC.
    idTag?: string; // Represents a long living identifier for the mail item. 
    permittedTime?: number; // Specifies the allowed processing time for the individual submission. It is set by the MC.The unit of permitted_time is milliseconds (ms)
}
export interface RcResultT {
    addressResult?: AddressResultT; // This element contains the results related to address recognition.
    sortBin?: string; // The sort bin, if one has been assigned by the RC System.
    mpSize?: DimensionT; // This element contains the size of the (physical) mail piece. If the RC System does not measure or know the size of the mail piece, this element is absent.
    barCode?: BarCodeT[]; // If the RC System detects a bar code on the mail piece it can use this element to send the bar code to the MC.
    printText?: PrintTextT; // This element contains text to be printed on the mailpiece.
}
export interface AddressResultT {
    code?: string; // The distribution code determined by the RC System. Unless a reject reason is provided, this element must be present. This element needs to be consistent with the OCR/VCS standard.
    /**
     * This element contains information about the depth of the determined result code. The values have to be consistent with the 
     * AddressCodeAttrT in the OCR/VCS standard. If the element “code” is absent, this element is also absent.
     * Possible example values include:
     * * 'str', means Street
     * * 'pob', means Post Office Box
     **/
    codeAttribute?: string[];
    finalCoded?: boolean; // A boolean value indicating whether or not processing for a mail piece is complete.
    /**
     * This element contains the result status. The value has to be consistent with the AddressStatusAttrT of the OCR/VCS standard.
     * Possible values include:
     * * 'fin', means result is finalized, no further work is required.
     * * 'fdos', means result code is of finest depth of sort.
     **/
    statusAttr?: string;
    /**
     * This string element specifies where the result was obtained. It could correspond to the value of the attribute “creator” in the type
     * RecognitionResultT type of the OCR/VCS standard. E.g., it could be the name of the OCR identifying the result or the ID of a VCD keyer.
     **/
    resultSource?: string;
    rejectReason?: string[]; // This string element contains a reason why the RC System was unable to determine a result.
}
/**
 * This type contains the mailpiece’s dimensions in millimetres.
 **/
export interface DimensionT {
    _long?: number; // This element contains the physical length of the mail item in millimetres.
    high?: number; // This element contains the physical height of the mail item in millimetres.
    thick?: number; // This element contains the physical thickness of the mail item in millimetres. Mind, that this value is of type float.
}
/**
 * This type contains a barcode.
 **/
export interface BarCodeT {
    type?: BarCodeSymbologyT; // Provides the valid symbologies of a barcode label.
    value?: string; // This element contains the value of the barcode.
    status: BarCodeStatusT; // This element contains the status of the barcode.
}
/**
 * This element contains text that has to be printed on a mail piece.
 **/
export interface PrintTextT {
    type: string; // The type of information that the text contains, e.g. 'forwarding'.
    textLine: string[]; // A line of text to be printed on the mailpiece.
}

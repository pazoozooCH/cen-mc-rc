export enum Type9 {
    Postnet, Planet, RM4SCC, USPS4SC, KIXC, AUPC, _2of5, I2of5, Codabar, AIM39, AIM93, AIM128, UPC_A, UPC_E, EAN_8, EAN_13, EAN_128, RSS_14, PDF417, Aztec, DataMatrix, MaxiCode, FIM
}
export enum BarCodeStatusT {
    no_barcode, detected_and_recognized, detected_and_not_recognized
}

/**
 * Dieser Typ enth�lt das Ergebnis f�r eine Postsendung, das vom RC-System ermittelt worden ist.
 **/
export interface TransmitMailpieceAttributes {
    rcResult?: RcResultT; // Basiselement, das das Ergebnis f�r eine Postsendung enth�lt.
    mailpieceId?: string; // Represents the identifier for the mail item, which has to be processed by the RC.
    idTag?: string; // Represents a long living identifier for the mail item. 
    permittedTime?: number; // Specifies the allowed processing time for the individual submission. It is set by the MC.The unit of permitted_time is milliseconds (ms)
}
export interface RcResultT {
    addressResult?: AddressResultT; // Dieses Element enth�lt die Ergebnisse in Bezug auf die Adresserkennung
    sortBin?: string; // Der Sortierbeh�lter, falls vom RC-System ein Beh�lter zugeordnet worden ist.
    mpSize?: DimensionT; // Dieses Element enth�lt die Gr��e der (physikalischen) Postsendung. Wenn das RC-System die Sendungsgr��e nicht misst oder kennt, fehlt dieses Element.
    barCode?: BarCodeT[]; // Wenn das RC-System einen Strichcode auf der Postsendung erkennt, kann mit diesem Element der Strichcode zur MC gesendet werden
    printText?: PrintTextT; // Dieses Element enth�lt den auf die Postsendung zu druckenden Text.
}
export interface AddressResultT {
    code?: string; // Der vom RC-System bestimmte Verteilungscode. Wenn kein Grund f�r eine Zur�ckweisung geliefert wird, muss dieses Element vorhanden sein. Dieses Element muss mit der OCR/VCS-Norm �bereinstimmen.
    /**
     * Dieses Element enth�lt Informationen �ber die Tiefe des bestimmten Ergebnis-codes. Die Werte m�ssen mit AddressCodeAttrT in der OCR/VCS-Norm �bereinstimmen. Wenn das Element �code� fehlt, fehlt auch dieses Element.
     * M�gliche Beispielwerte sind:
     * * �str� bedeutet Stra�e;
     * * �pob� bedeutet Postschlie�fach.
     **/
    codeAttribute?: string[];
    finalCoded?: boolean; // nicht dokumentiert!
    /**
     * Dieses Element enth�lt den Ergebniszustand.Der Wert muss mit AddressStatusAttrT in der OCR/ VCS - Norm �bereinstimmen.
     * M�gliche Werte sind:
     * * �fin� bedeutet, das Ergebnis ist endg�ltig, es ist keine weitere Arbeit erforderlich;
     * * �fdos� bedeutet, dass der Ergebniscode die h�chste Sortiertiefe ist.
     **/
    statusAttr?: string;
    /**
     * Dieses Zeichenkettenelement legt fest, wo das Ergebnis erzielt wurde.
     * Es kann dem Wert des Attributs �creator� im Typ RecognitionResultT der OCR/VCS-Norm entsprechen.
     * Das kann z. B. der Name der OCR sein, die das Ergebnis ermittelt, oder die ID eines VCD-Gebers
     **/
    resultSource?: string;
    rejectReason?: string[]; // Dieses Zeichenkettenelement enth�lt den Grund daf�r, warum das RC-System kein Ergebnis ermitteln konnte.
}
/**
 * Dieser Typ enth�lt die Sendungsma�e in Millimeter
 **/
export interface DimensionT {
    _long?: number; // Dieses Element enth�lt die physikalische L�nge der Postsendung in Millimeter.
    high?: number; // Dieses Element enth�lt die physikalische Breite der Postsendung in Millimeter.
    thick?: number; // Dieses Element enth�lt die physikalische Dicke der Postsendung in Millimeter. Es ist zu beachten, dass dieser Wert vom Typ float ist.
}
/**
 * Dieser Typ enth�lt einen Strichcode.
 **/
export interface BarCodeT {
    type?: Type9;
    value?: string; // Dieses Element enth�lt den Wert des Strichcodes.
    status: BarCodeStatusT; // Dieses Element enth�lt den Zustand des Strichcodes.
}
/**
 * Dieses Element enth�lt den Text, der auf eine Postsendung aufgedruckt wird.
 **/
export interface PrintTextT {
    type: string; // Der Typ der Information, die der Text enth�lt, z. B. �Nachsendung�. ToDo: Enum definieren!
    textLine: string[]; // Eine Textzeile, die auf die Sendung aufzudrucken ist.
}

/**
 * Der Dienst erm�glicht der MC, aktualisierte oder zus�tzliche Informationen in Bezug auf eine Postsendung zu �bertragen, die dem RC- System bereits vorgelegt worden ist.Solange sich die Postsendung zur Verarbeitung in der Maschine befindet, kann dieser Dienst von der MC mehrfach ausgef�hrt werden.
 * F�r einen Sortierablauf ohne das Einscannen von Bildern (z.B.station�re Bearbeitung im Zielfrachtzentrum oder Sortierung in der Reihenfolge der Zustellung) kann mit diesem Dienst die Beh�lternummer zur Verf�gung gestellt werden, in den die Postsendung physikalisch einsortiert wird; f�r diesen Fall muss kein submitMailpiece ausgef�hrt werden.
 **/
export interface UpdateMailpieceAttributes {
    iood?: boolean; // A boolean element indicating whether or not the mail piece is passing outside the mail processing machine’s delay line.
    weight?: number; // Weight, in grams, of the mail piece.
    indiciaValue?: string; // The value of the indicia printed on the mail piece. Specific values are defined on a per-program basis.
    indiciaType?: string; // The type of the indicia printed on the mail piece. Specific values are defined on a per-program basis.
    sortBin?: number; // The sort bin to which the machine physically sorted the mail piece.
    idtagPrintStatus?: boolean; // A boolean value indicating whether or not an ID-Tag was printed on the mail piece.
    code?: string; // The destination sort code assigned to the mail piece. Specific values are defined on a per-program basis.
    finalCoded?: boolean; // A boolean value indicating whether or not processing for a mail piece is complete.
    mailpieceId: string; // Represents the identifier for the mail item, which has to be processed by the RC.
    sourceId?: string; // This attribute specifies the id of the sorting machine processing the mail piece.
    scannerId?: string; // This attribute specifies the id of the scanner where the mail piece was scanned.
    feederId?: string; // This attribute specifies the id of the feeder where the mail piece was lifted.
    sortplanId?: string; // Provides the id of the sortplan selected from a machine operator.
}
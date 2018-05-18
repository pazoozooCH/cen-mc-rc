/**
 * Der Dienst erm�glicht der MC, aktualisierte oder zus�tzliche Informationen in Bezug auf eine Postsendung zu �bertragen, die dem RC- System bereits vorgelegt worden ist.Solange sich die Postsendung zur Verarbeitung in der Maschine befindet, kann dieser Dienst von der MC mehrfach ausgef�hrt werden.
 * F�r einen Sortierablauf ohne das Einscannen von Bildern (z.B.station�re Bearbeitung im Zielfrachtzentrum oder Sortierung in der Reihenfolge der Zustellung) kann mit diesem Dienst die Beh�lternummer zur Verf�gung gestellt werden, in den die Postsendung physikalisch einsortiert wird; f�r diesen Fall muss kein submitMailpiece ausgef�hrt werden.
 **/
export interface UpdateMailpieceAttributes {
    iood?: boolean; // Ein Boolesches Element, das anzeigt, ob die Postsendung ausserhalb des Laufzeitspeichers der Sendungsverarbeitungsmaschine weitergegeben wird oder nicht.
    weight?: number; // Weight of the ail item in grams
    indiciaValue?: string; // Wert der auf der Postsendung aufgedruckten Freimachung. Spezifische Werte sind je nach Programm definiert.
    indiciaType?: string; // Typ der auf der Postsendung aufgedruckten Freimachung. Spezifische Werte sind je nach Programm definiert.
    sortBin?: number; // Der Sortierbeh�lter, in das die Maschine die Postsendung physikalisch einsortiert.
    idtagPrintStatus?: boolean; // Ein Boolescher Wert, der anzeigt, ob ein ID-Kennzeichen auf die Sendung aufgedruckt wurde.
    code?: string; // Der der Postsendung zugeordnete Zustellsortiercode. Spezifische Werte sind je nach Programm definiert.
    finalCoded?: boolean; // Ein Boolesches Element, das anzeigt, ob die Verarbeitung der Postsendung abgeschlossen ist oder nicht.
    mailpieceId: string; // Represents the identifier for the mail item, which has to be processed by the RC.
    sourceId?: string; // Identifies the sorting machine.
    scannerId?: string; // Dieses Attribut legt die ID des Scanners fest, mit dem die Postsendung eingescannt wurde.
    feederId?: string; // Refers to the feeding unit, where the mailpiece image was lifted. 
    sortplanId?: string; // Provides the id of the sortplan selected from a machine operator.
}
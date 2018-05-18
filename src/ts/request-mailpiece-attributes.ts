/**
 * Dieser Typ versorgt den anfragenden Teilnehmer mit den Ergebnissen einer Anreicherungsantwort. Das RC sendet das Dokument entweder auf eine Anforderung der MC oder ohne Abfrage zurück.
 * Die MC erwartet, dass sie alle festgelegten Attribute für die entsprechende Postsendung vom RC-System erhält.
 **/
export interface RequestMailpieceAttributes {
    mailpieceId?: string; // Represents the identifier for the mail item, which has to be processed by the RC.
    idTag?: string; // Represents a long living identifier for the mail item. 
    permittedTime?: number; // Specifies the allowed processing time for the individual submission. It is set by the MC.The unit of permitted_time is milliseconds (ms)
}

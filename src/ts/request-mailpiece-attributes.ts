/**
 * This type provides the requester with the ability to obtain the results of an enrichment response. The RC
 * returns the document either on request of the MC or in an unsolicited fashion.
 * The MC expects to get all defined attributes for the corresponding mailpiece from the RC System.
 **/
export interface RequestMailpieceAttributes {
    mailpieceId?: string; // Represents the identifier for the mail item, which has to be processed by the RC.
    idTag?: string; // Represents a long living identifier for the mail item. 
    permittedTime?: number; // Specifies the allowed processing time for the individual submission. It is set by the MC.The unit of permitted_time is milliseconds (ms)
}

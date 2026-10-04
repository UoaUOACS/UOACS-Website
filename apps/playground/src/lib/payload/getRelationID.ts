/**
 * Returns the ID of a relationship value, which is a bare ID at depth 0 and a document otherwise
 */
export const getRelationID = (relation: string | { id: string }): string =>
  typeof relation === "string" ? relation : relation.id

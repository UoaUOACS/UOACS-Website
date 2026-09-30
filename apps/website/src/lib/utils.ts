/**
 * Asserts that a Payload relationship field was populated as an object rather than
 * left as a bare ID string. Payload only returns the populated object when the
 * query's `depth` option is high enough to resolve this relation.
 *
 * @throws If `value` is still a string ID, meaning the query's `depth` wasn't high enough.
 */
export function assertPopulated<T>(value: T | string): asserts value is T {
  if (typeof value === "string") {
    throw new Error(
      "Expected a populated relationship object but got a string ID. Increase the `depth` option on the Payload query that fetched this relation.",
    )
  }
}

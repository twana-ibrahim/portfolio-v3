/** Punctuation that closes a clause and must not be preceded by a space. */
const CLOSING_PUNCTUATION = /^[.?!,;:؟،؛]/;

type StatementTextProps = {
  lead: string;
  emphasis: string;
  /** May be a full clause ("use.") or bare punctuation ("?"). */
  trail?: string;
};

/**
 * A heading with one phrase set apart from the rest.
 *
 * The three parts are stored separately rather than as one string with markup
 * in it, because the emphasis has to be a real element to carry the `emphasis`
 * utility — which renders as italic serif in English and as weight in Kurdish,
 * since Arabic script has no italic.
 *
 * The space before `trail` is conditional. English closes some of these with a
 * word ("have to use.") and others with bare punctuation ("properly?"), and a
 * space before a question mark is wrong in both languages. Deciding it here
 * beats asking every content author to remember a leading space they cannot
 * see in review.
 */
export function StatementText({ lead, emphasis, trail }: StatementTextProps) {
  const separator = !trail || CLOSING_PUNCTUATION.test(trail) ? "" : " ";

  return (
    <>
      {lead} <em className="emphasis">{emphasis}</em>
      {separator}
      {trail}
    </>
  );
}

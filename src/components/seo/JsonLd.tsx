type JsonLdProps = {
  /** One schema.org node, or a `@graph` of several. Serialised as-is. */
  data: Record<string, unknown>;
};

/**
 * JSON-LD injected from a server component (design-spec §14). The payload is data from the
 * content files, never user input; `<` is still escaped so no string can close the script.
 */
export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

import { site } from "@/content/site";

/**
 * First focusable element on every route. Hidden until it receives keyboard focus,
 * then it sits over the masthead and jumps to `<main id="content">`.
 */
export function SkipLink() {
  return (
    <a href="#content" className="skip-link type-button">
      {site.skipLinkLabel}
    </a>
  );
}

import type { ImageAlignment, ImageReference } from "../types";
import type { Replacement } from "./MarkdownReplacer";

type AlignmentOverride = Exclude<ImageAlignment, "theme">;

const OPEN_WRAPPER = /<span\s+class=["']iam-image-align-(?:left|center|right)["']\s*>\s*$/i;
const CLOSE_WRAPPER = /^\s*<\/span>/i;

export function imageAlignmentReplacement(
  content: string,
  reference: ImageReference,
  alignment?: AlignmentOverride
): Replacement {
  const before = content.slice(0, reference.start);
  const after = content.slice(reference.end);
  const open = OPEN_WRAPPER.exec(before);
  const close = CLOSE_WRAPPER.exec(after);
  const wrapped = open?.index !== undefined && close !== null;
  const start = wrapped && open ? open.index : reference.start;
  const end = wrapped && close ? reference.end + close[0].length : reference.end;
  const replacement = alignment
    ? `<span class="iam-image-align-${alignment}">${reference.rawLink}</span>`
    : reference.rawLink;
  return { start, end, expected: content.slice(start, end), replacement };
}

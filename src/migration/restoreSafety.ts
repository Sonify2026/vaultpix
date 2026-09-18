import type { NoteBackup } from "../types";

export function canRestoreNote(current: string, backup: Pick<NoteBackup, "content" | "after">): boolean {
  return current === backup.content || (backup.after !== undefined && current === backup.after);
}

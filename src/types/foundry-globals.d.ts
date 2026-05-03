declare global {
  class JournalEntrySheet extends DocumentSheetV2<JournalEntry> {
    static DEFAULT_OPTIONS: ApplicationV2Options;
    static defaultOptions : ApplicationV2Options;
    static VIEW_MODES: {SINGLE: 1; MULTIPLE: 2; };
    static RENDER_STATES: typeof ApplicationV2.RENDER_STATES;
    static _customElements: unknown;
    static _getInheritanceChains(): unknown;
    static _getInheritanceChain(cls: unknown): unknown;
    }
}

export {};
/*
declare global {
  const JournalEntrySheet: typeof import("fvtt-types/src/foundry/client/applications/sheets/journal-entry-sheet.d.mts").default;
}

export {};
*/
import { id as moduleId } from "../module.json";

const journalSheetDefinitions = [
  { "id": "pf2e-av", "label": "Abomination Vaults"},
  { "id": "pf2e-km", "label": "Kingmaker"},
];

function makeJournalSheet(cssClass: string) {
  return class extends foundry.applications.sheets.journal.JournalEntrySheet {
    static override get DEFAULT_OPTIONS() {
      return { classes: [cssClass] as string[] };
    }
  }
}

Hooks.once("init", () => {
  console.log(`Initializing ${moduleId}`);

  for (const { id, label } of journalSheetDefinitions) {
    const sheetClass = makeJournalSheet(id);
    foundry.applications.apps.DocumentSheetConfig.registerSheet(JournalEntry, id, sheetClass, {
      types: ["base"],
      label: label,
      makeDefault: false
    });
  }
  
});
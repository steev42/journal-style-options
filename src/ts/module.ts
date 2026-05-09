import { id as moduleId } from "../module.json";

interface MyModule extends foundry.packages.Module {
  KM_CLASS: string;
}

let module: MyModule;

class KingmakerJournalSheet extends foundry.applications.sheets.journal.JournalEntrySheet {
  static override get DEFAULT_OPTIONS() {
    return { classes: ["pf2e-km"] as string[] };
  }
}

class AVJournalSheet extends foundry.applications.sheets.journal.JournalEntrySheet {
  /*constructor(doc, options) {
    super(doc, options);
    this.options.classes.push(CONFIG.cssClass);*/
  static override get DEFAULT_OPTIONS() {
    return { classes: ["pf2e-av"] as string[] };
  }
}

/*class KingmakerTextPageSheet extends foundry.applications.sheets.journal.JournalEntryPageTextSheet{
  static override get DEFAULT_OPTIONS() {
    return { classes: ["pf2e-km"] as string[] };
  } 
}*/

Hooks.once("init", () => {
  console.log(`Initializing ${moduleId}`);

  module = game.modules!.get(moduleId) as MyModule;

  /**
   * The CSS class used to identify Kingmaker applications.
   * @type {string}
   */
  module.KM_CLASS = "pf2e-km";
  foundry.applications.apps.DocumentSheetConfig.registerSheet(JournalEntry, "pf2e-km", KingmakerJournalSheet, {
    types: ["base"],
    label: "Pathfinder Kingmaker",
    makeDefault: false
  });

  foundry.applications.apps.DocumentSheetConfig.registerSheet(JournalEntry, "pf2e-av", AVJournalSheet, {
      types: ["base"],
      label: "Abomination Vaults",
      makeDefault: false,
      canConfigure: true
  });

 /* foundry.applications.apps.DocumentSheetConfig.registerSheet(JournalEntryPage, moduleId, KingmakerTextPageSheet, {
    types: ["text"],
    label: "Pathfinder Kingmaker",
    makeDefault: false
  });*/
  
});

// @ts-ignore - Hook signature mismatch
/*Hooks.on("renderActorDirectory", (_app, html) => {
  const actionButtons = $(html).find(".directory-header .action-buttons");
  
  // Only add the button if it doesn't already exist
  if (!actionButtons.find(".cc-dog-browser-button").length) {
    const button = $(
      `<button class="cc-sidebar-button cc-dog-browser-button" type="button">🐶</button>`
    );
    button.on("click", () => {
      module.dogBrowser.render(true);
    });
    actionButtons.append(button);
  }
});*/
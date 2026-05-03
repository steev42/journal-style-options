import { id as moduleId } from "../module.json";
//import DogBrowser from "./apps/dogBrowser";

interface MyModule extends Module {
 //dogBrowser: DogBrowser;
 KM_CLASS: string;
}

let module: MyModule;

class KingmakerJournalSheet extends JournalEntrySheet {
  static override get DEFAULT_OPTIONS() {
      return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {      
        classes: [module.KM_CLASS]
      });
  /*constructor(doc, options) {
    super(doc, options);
    this.options.classes.push(module.KM_CLASS);*/
  }
}

  Hooks.once("init", () => {
 console.log(`Initializing ${moduleId}`);

 module = game.modules!.get(moduleId) as MyModule;
 //module.dogBrowser = new DogBrowser();
/**
 * The CSS class used to identify Kingmaker applications.
 * @type {string}
 */
 module.KM_CLASS = "pf2e-km";
//foundry.applications.api.ApplicationV2.registerSheet(JournalEntry, moduleId, KingmakerJournalSheet, {
foundry.applications.apps.DocumentSheetConfig.registerSheet(JournalEntry, moduleId, KingmakerJournalSheet, {
    types: ["base"],
    label: "Pathfinder Kingmaker",
    makeDefault: false
  });
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
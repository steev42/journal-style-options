import moduleData from "../module.json" with {type: "json"};
const moduleId = moduleData.id;

declare module "fvtt-types/configuration" {
  interface SettingConfig {
    "journal-style-options.descriptiveTextButton": boolean
  }
}

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

    // Allow disabling of the "send to chat" button
  game.settings?.register(moduleId as any, "descriptiveTextButton", {
      name: "\"Send To Chat\" button",
      hint: "Add a button to journals that will send \"section\" tags with the \"description\" class to chat.",
      scope: "client",
      config: true,
      type: Boolean,
      default: true
  });
  
  for (const { id, label } of journalSheetDefinitions) {
    const sheetClass = makeJournalSheet(id);
    foundry.applications.apps.DocumentSheetConfig.registerSheet(JournalEntry, id, sheetClass, {
      types: ["base"],
      label: label,
      makeDefault: false
    });
  }  
});

function postDescToChat(description: HTMLElement, page: JournalEntryPage) {
  const content = description.innerHTML.trim();
  const speaker = foundry.documents.ChatMessage.getSpeaker({});

  foundry.documents.ChatMessage.create({
    user: game.user?.id,
    speaker,
    content,
    style: CONST.CHAT_MESSAGE_STYLES.EMOTE,
    flavor: page.name
  });
}

Hooks.on("renderJournalEntryPageSheet", (_app, html: HTMLElement, context) => {
  const showButton = game.settings?.get(moduleId as any, "descriptiveTextButton");
  // Find all <section class="description"> blocks
  if (showButton) {
    const descriptions = html.querySelectorAll<HTMLElement>("section.description:not(.readout)");

    descriptions.forEach((description: HTMLElement) => {
      description.classList.add("readout");

      const button = document.createElement("i");
      button.className = "ph ph-chat-circle-text readoutbutton";
      button.style.cursor = "pointer";

      const page = context.document as JournalEntryPage;
      button.onclick = () => postDescToChat(description, page);

      description.prepend(button);
    });
  }
});

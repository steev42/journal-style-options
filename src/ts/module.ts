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
  // Find all <section class="description"> blocks
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
});

// Create a mixin-augmented ApplicationV2 class with Handlebars support
const HandlebarsApp = foundry.applications.api.HandlebarsApplicationMixin(
  foundry.applications.api.ApplicationV2
);

export default class DogBrowser extends HandlebarsApp {

    private imageUrl?: String;

  static override get DEFAULT_OPTIONS() {
    return foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
      id: "dog-browser",      
      window: {
        title: "Dog Browser",
        icon: "fas fa-dog"
      },
      position: {
        width: 720,
        height: 720
      },
      actions: {
        "randomize-dog": DogBrowser.prototype._randomizeDog
      }
    });
  }

  // Define which template parts to render
  static override get PARTS() {
    return {
      form: { 
        template: "modules/shattered-star-ap/templates/dogs.hbs" 
      }
    };
  }

  override async _prepareContext(_options: any): Promise<any> {
    return {
      imageUrl: this.imageUrl, // Pass your data here for the template
    };
  }

 async _randomizeDog() {
   const response = await fetch("https://dog.ceo/api/breeds/image/random");
   if (response.status != 200) {
     ui.notifications?.error(
       `Unexpected response fetching new dog image: ${response.status}: ${response.statusText}`
     );
     return;
   }
   this.imageUrl = (await response.json()).message;
   this.render();
 }
}
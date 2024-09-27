import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Text "mo:base/Text";

actor {
  // Define a type for translation entries
  type TranslationEntry = {
    original: Text;
    translated: Text;
    language: Text;
  };

  // Store translations in a stable variable
  stable var translations : [TranslationEntry] = [];

  // Add a new translation to the history
  public func addTranslation(original: Text, translated: Text, language: Text) : async () {
    let newEntry : TranslationEntry = {
      original = original;
      translated = translated;
      language = language;
    };
    translations := Array.append(translations, [newEntry]);
  };

  // Get all translations
  public query func getTranslations() : async [TranslationEntry] {
    translations
  };

  // Clear translation history
  public func clearTranslations() : async () {
    translations := [];
  };
}

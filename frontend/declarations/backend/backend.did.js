export const idlFactory = ({ IDL }) => {
  const TranslationEntry = IDL.Record({
    'translated' : IDL.Text,
    'language' : IDL.Text,
    'original' : IDL.Text,
  });
  return IDL.Service({
    'addTranslation' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [], []),
    'clearTranslations' : IDL.Func([], [], []),
    'getTranslations' : IDL.Func([], [IDL.Vec(TranslationEntry)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };

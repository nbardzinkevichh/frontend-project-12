import filter from 'leo-profanity';

const leoProfanityFilter = () => {
  filter.loadDictionary('ru');
  const badWordsListRu = filter.list();
  filter.loadDictionary('en');
  const badWordsListEn = filter.list();

  filter.add([...badWordsListRu, ...badWordsListEn]);

  return filter;
};

export default leoProfanityFilter;
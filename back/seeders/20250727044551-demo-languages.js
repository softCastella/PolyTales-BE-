//언어별 문법 변화 영역

'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('languages', [
      // 영어
      {
        storyId: 1,
        nation: 'en',
        grammar: '주어 + be동사: ~이다',
        word: 'girl',
        mean: '소녀',
        partSpeech: '(명사)',
        vocaSentence: 'Lily is a little girl.'
      },
      {
        storyId: 1,
        nation: 'en',
        grammar: null,
        word: 'little',
        mean: '작은',
        partSpeech: '(형용사)',
        vocaSentence: 'She is little.'
      },
      
      // 프랑스어
      {
        storyId: 1,
        nation: 'fr',
        grammar: 'Sujet + verbe être : ~est',
        word: 'fille',
        mean: '소녀',
        partSpeech: '(명사)',
        vocaSentence: 'Lily est une petite fille.'
      },
      {
        storyId: 1,
        nation: 'fr',
        grammar: null,
        word: 'petite',
        mean: '작은',
        partSpeech: '(형용사)',
        vocaSentence: 'Elle est petite.'
      }
      // ...다른 언어/단어 추가
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('languages', null, {});
  }
};
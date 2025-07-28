'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('story_resources', [
            { storyId: 1, nation: 'en', imgUrl: '/subs/en.srt', audioUrl: '/audio/en.mp3' },
            { storyId: 1, nation: 'fr', imgUrl: '/subs/fr.srt', audioUrl: '/audio/fr.mp3' },
            { storyId: 1, nation: 'de', imgUrl: '/subs/de.srt', audioUrl: '/audio/de.mp3' },
            // storyId: 2, 3 등도 추가 가능
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('story_resources', null, {});
    }
};
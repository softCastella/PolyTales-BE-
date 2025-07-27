'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('stories', {
      storyId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      storyTitle: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      langLevel: {
        type: Sequelize.ENUM('A1', 'A2', 'B1', 'B2', 'C1', 'C2'),
        allowNull: false
      },
      langLevelKo: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      nation: {
        type: Sequelize.ENUM('fr', 'ja', 'es', 'en', 'de', 'ko'),
        allowNull: false
      },
      topic: {
        type: Sequelize.STRING(100),
        allowNull: false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('stories');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_stories_langLevel";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_stories_nation";');
  }
};
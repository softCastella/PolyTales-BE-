'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('languages', {
      vocaId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      word: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      mean: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      partSpeech: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      vocaSentence: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      nation: {
        type: Sequelize.ENUM('fr', 'ja', 'es', 'en', 'de', 'ko'),
        allowNull: false
      },
      storyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'stories', key: 'storyId' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
    await queryInterface.addIndex('languages', ['storyId']);
    await queryInterface.addIndex('languages', ['nation']);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('languages');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_languages_nation";');
  }
};
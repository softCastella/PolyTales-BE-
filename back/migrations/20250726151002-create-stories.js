//컨텐츠(스토리 관련)

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('stories', {
      storyId: {               // 스토리 ID
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      storyTitle: {           // 스토리 제목
        type: Sequelize.STRING(255),
        allowNull: false
      },
      langLevel: {            // 언어 레벨
        type: Sequelize.ENUM('A1', 'A2', 'B1', 'B2', 'C1', 'C2'),
        allowNull: false
      },
      langLevelKo: {        // 한국어 언어 레벨
        type: Sequelize.STRING(20),
        allowNull: false
      },
      topic: {              // 주제
        type: Sequelize.STRING(100),
        allowNull: false
      },
      totalPages: {                // 전체 페이지 수
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 10
      },
    });
  },

  // 롤백 시 테이블 삭제
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('stories');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_stories_langLevel";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_stories_nation";');
  }
};

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('progresses', {
      progressId: {                  // 진행도 ID
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {                       // 사용자 ID
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'userId' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      storyId: {                 // 스토리 ID
        type: Sequelize.INTEGER,
        references: { model: 'stories', key: 'storyId' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      currentPage: {               // 현재 페이지
        type: Sequelize.INTEGER,
        allowNull: true
      },
      isFinished: {                // 완료 여부
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      updatedAt: {                 // 업데이트 날짜
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  // 롤백 시 테이블 삭제
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('progress');
  }
};
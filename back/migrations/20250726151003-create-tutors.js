//AI튜터 관련(사용여부 불확실)

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tutors', {
      chatId: {              // 채팅 ID
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {            // 사용자 ID
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'userId' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      storyId: {         // 스토리 ID
        type: Sequelize.INTEGER,
        references: { model: 'stories', key: 'storyId' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      message: {        // 메시지 내용
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {       // 생성 날짜
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  // 롤백 시 테이블 삭제
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tutors');
  }
};
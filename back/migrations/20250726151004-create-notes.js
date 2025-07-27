//노트 관련 (사용자, 스토리ID)
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('notes', {
      noteId: {                     // 노트 ID
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {                  // 사용자 ID
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'userId' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      storyId: {               // 스토리 ID 
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'stories', key: 'storyId' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      title: {                  // 노트 제목  
        type: Sequelize.TEXT,
        allowNull: false
      },
      content: {                // 노트 내용
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {              // 생성 날짜
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  // 롤백 시 테이블 삭제
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('notes');
  }
};
//스토리 ID별 문법, 단어, 언어전환 

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('languages', {
      grammar: {                    // 문법
        type: Sequelize.TEXT,
        allowNull: true
      },
      vocaId: {                     // 단어 ID
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      word: {                       // 단어   
        type: Sequelize.TEXT,
        allowNull: false
      },
      mean: {                      // 뜻  
        type: Sequelize.TEXT,
        allowNull: false
      },
      partSpeech: {               // 품사
        type: Sequelize.STRING(50),
        allowNull: true
      },
      vocaSentence: {             // 예문  
        type: Sequelize.TEXT,
        allowNull: true
      },
      nation: {                   // 언어 종류
        type: Sequelize.ENUM('fr', 'ja', 'es', 'en', 'de', 'ko'),
        allowNull: false
      },
      storyId: {                   // 스토리 ID
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'stories', key: 'storyId' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
    // 인덱스 추가
    await queryInterface.addIndex('languages', ['storyId']);          
    await queryInterface.addIndex('languages', ['nation']);
  },

  // 롤백 시 테이블 삭제
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('languages');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_languages_nation";');
  }
};
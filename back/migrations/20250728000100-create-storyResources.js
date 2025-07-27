//변환 리소스 정보 (스토리id, 언어종류, 이미지, 오디오, 날짜)
'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('story_resources', {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, // 리소스 ID
            storyId: {                                                              // 스토리 ID
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'stories', key: 'storyId' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            nation: {                                                               // 언어 종류
                type: Sequelize.ENUM('fr', 'ja', 'es', 'en', 'de', 'ko'),
                allowNull: false
            },
            imgUrl: { type: Sequelize.STRING, allowNull: true },                    // 이미지 URL
            audioUrl: { type: Sequelize.STRING, allowNull: true },                 // 오디오 URL
            createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },   // 생성 날짜
            updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }    // 업데이트 날짜
        });
    },

    // 롤백 시 테이블 삭제
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('story_resources');
        await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_story_resources_nation";');
    }
};
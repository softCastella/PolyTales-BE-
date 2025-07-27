//유저 정보(가입/로그인 관련)
'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            userId: {                   // 사용자 ID
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            oauthProvider: {             // OAuth 제공자 
                type: Sequelize.ENUM('naver', 'kakao', 'google'),
                allowNull: false
            },
            oauthId: {                   // OAuth ID
                type: Sequelize.TEXT,
                allowNull: false
            },
            email: {                      // 이메일
                type: Sequelize.TEXT,
                allowNull: true
            },
            nickName: {                   // 닉네임(별명)
                type: Sequelize.TEXT,
                allowNull: true
            },
            profImg: {                    // 프로필 이미지
                type: Sequelize.TEXT,
                allowNull: true
            },
            gender: {                       // 성별
                type: Sequelize.ENUM('male', 'female'),
                allowNull: true
            },
            age: {                          // 나이
                type: Sequelize.INTEGER,
                allowNull: true
            },
        });

        // OAuth 제공자와 ID의 조합은 유일해야 함
        await queryInterface.addIndex('users', ['oauthProvider', 'oauthId'], { unique: true });
    },

    // 롤백 시 테이블 삭제
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('users');
        await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_users_oauthProvider";');
    }
};
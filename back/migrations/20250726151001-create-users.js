'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            userId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            oauthProvider: {
                type: Sequelize.ENUM('naver', 'kakao', 'google'),
                allowNull: false
            },
            oauthId: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            email: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            nickName: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            profile: {
                type: Sequelize.TEXT,
                allowNull: true
            }
        });
        await queryInterface.addIndex('users', ['oauthProvider', 'oauthId'], { unique: true });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('users');
        await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_users_oauthProvider";');
    }
};
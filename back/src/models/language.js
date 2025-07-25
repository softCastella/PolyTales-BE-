// src/models/language.js
module.exports = (sequelize, DataTypes) => {
    const Language = sequelize.define(
        "Language",
        {
            vocaId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            word: {
                type: DataTypes.TEXT,
                allowNull: false // ✅ 추가
            },
            mean: {
                type: DataTypes.TEXT,
                allowNull: false // ✅ 추가
            },
            partSpeech: {
                type: DataTypes.STRING(50), // ✅ TEXT -> STRING으로 최적화
                allowNull: true
            },
            vocaSentence: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            nation: {
                type: DataTypes.ENUM('fr', 'ja', 'es', 'en', 'de', 'ko'),
                allowNull: false // ✅ 추가
            },
            storyId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { // ✅ PostgreSQL 외래키 명시
                    model: 'Stories',
                    key: 'id'
                },
                onUpdate: 'CASCADE', // ✅ 추가
                onDelete: 'CASCADE'  // ✅ 추가
            }
        },
        {
            tableName: "languages",
            timestamps: false, // createdAt, updatedAt 없음
            indexes: [ // ✅ PostgreSQL 성능 최적화
                {
                    fields: ['storyId']
                },
                {
                    fields: ['nation']
                }
            ]
        }
    );

    Language.associate = function (models) {
        // Language belongs to Story
        Language.belongsTo(models.Story, {
            foreignKey: "storyId",
            as: "story"
        });
    };
    
    return Language;
};
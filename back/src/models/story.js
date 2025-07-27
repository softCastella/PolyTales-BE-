//시퀄라이즈 컨벤션 : 엔터티: 대문자시작/테이블명: 복수형 소문자 카멜
// src/models/story.js
module.exports = (sequelize, DataTypes) => {
    const Story = sequelize.define(
        "Story",
        {
            storyId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            storyTitle: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            langLevel: {
                type: DataTypes.ENUM('A1', 'A2', 'B1', 'B2', 'C1', 'C2'),
                allowNull: false
            },
            langLevelKo: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            nation: {
                type: DataTypes.ENUM('fr', 'ja', 'es', 'en', 'de', 'ko'),
                allowNull: false
            },
            topic: {
                type: DataTypes.STRING(100),
                allowNull: false
            }
        },
        {
            tableName: "stories",
            timestamps: true // createdAt, updatedAt 사용
        }
    );

    Story.associate = function (models) {
        // Story has many Languages
        Story.hasMany(models.Language, {
            foreignKey: "storyId",
            as: "languages"
        });
    };
    
    return Story;
};
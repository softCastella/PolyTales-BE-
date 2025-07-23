//시퀄라이즈 컨벤션 : 엔터티: 대문자시작/테이블명: 복수형 소문자 카멜
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
                type: DataTypes.TEXT,
                allowNull: false
            },
            storyCoverPath: {
                type: DataTypes.TEXT,
            },
            thumbnail: {
                type: DataTypes.TEXT,
            },
            movie: {
                type: DataTypes.TEXT,
            },
            description: {
                type: DataTypes.TEXT,
            },
            langLevel: {
                type: DataTypes.ENUM('A1', 'A2', 'B1', 'B2', 'C1', 'C2'),
                allowNull: false
            },
            langLevelKo: {
                type: DataTypes.ENUM('초급', '초중급', '중급', '중고급', '고급', '최고급'),
                allowNull: true
            },
            nation: {
                type: DataTypes.ENUM('fr', 'ja', 'es', 'en', 'de', 'ko'),
                allowNull: false
            },
            topic: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        },
        {
            tableName: "stories",
            timestamps: false,
        }
    );

    Story.associate = function (models) {
        // Story has many Notes
        Story.hasMany(models.Note, {
            foreignKey: "storyId",
            as: "notes"
        });

        // Story has many Progress records
        Story.hasMany(models.Progress, {
            foreignKey: "storyId",
            as: "progress"
        });

        // Story has many Tutor chats
        Story.hasMany(models.Tutor, {
            foreignKey: "storyId",
            as: "tutorChats"
        });

        // Story has many Language entries
        Story.hasMany(models.Language, {
            foreignKey: "storyId",
            as: "vocabularies"
        });
    };
    return Story;
};


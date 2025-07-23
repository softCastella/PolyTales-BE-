//시퀄라이즈 컨벤션 : 엔터티: 대문자시작/테이블명: 복수형 소문자 카멜
module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define(
        "Note",
        {
            noteId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            storyId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            title: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
        },
        {
            tableName: "notes",
            timestamps: false,
        }
    );

    Note.associate = function (models) {
        // Note belongs to User
        Note.belongsTo(models.User, {
            foreignKey: "userId",
            as: "user"
        });

        // Note belongs to Story
        Note.belongsTo(models.Story, {
            foreignKey: "storyId",
            as: "story"
        });
    };
    return Note;
};


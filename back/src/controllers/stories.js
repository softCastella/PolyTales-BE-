// back/src/controllers/stories.js
const models = require("../models");

// GET /stories - 전체 스토리 목록 조회
const getStories = async (req, res) => {
    try {
<<<<<<< HEAD
        const { level, topic } = req.query; // 쿼리 파라미터로 레벨 필터링

        let whereCondition = {};
        if (level) whereCondition.langLevel = level;
        if (topic) whereCondition.langLevel = topic;
=======
        const { level } = req.query; // 쿼리 파라미터로 레벨 필터링

        let whereCondition = {};
        if (level) {
            whereCondition.langLevel = level;
        }
>>>>>>> 8b2bde9285343de62ec5a0f6f61258ab2d278bc3

        const stories = await models.Story.findAll({
            where: whereCondition,
            order: [['storyId', 'ASC']]
        });

        res.status(200).json({
            message: "ok",
            data: stories
        });
    } catch (error) {
        console.error("스토리 목록 조회 오류:", error);
        res.status(500).json({ message: "서버 오류" });
    }
};

// GET /stories/:id - 특정 스토리 상세 조회
const getStoryById = async (req, res) => {
    try {
        const { id } = req.params;
<<<<<<< HEAD
=======

>>>>>>> 8b2bde9285343de62ec5a0f6f61258ab2d278bc3
        const story = await models.Story.findByPk(id, {
            include: [
                {
                    model: models.Language,
                    as: "languages"
                }
            ]
        });

        if (!story) {
            return res.status(404).json({ message: "스토리를 찾을 수 없습니다." });
        }

        res.status(200).json({
            message: "ok",
            data: story
        });
    } catch (error) {
        console.error("스토리 상세 조회 오류:", error);
        res.status(500).json({ message: "서버 오류" });
    }
};
<<<<<<< HEAD
// GET /stories/:level - 레벨별 스토리 목록 조회
=======
// GET /stories/:id - 특정 스토리 상세 조회
>>>>>>> 8b2bde9285343de62ec5a0f6f61258ab2d278bc3
const getStoryByLevel = async (req, res) => {
    try {
        const { level } = req.params;

        const stories = await models.Story.findAll({
            where: {
                langLevel: level
            },
            include: [
                {
                    model: models.Language,
                    as: "languages"
                }
<<<<<<< HEAD
            ],
            order: [['storyId', 'ASC']]
        });

        if (!stories) {
=======
            ]
        });

        if (!story) {
>>>>>>> 8b2bde9285343de62ec5a0f6f61258ab2d278bc3
            return res.status(404).json({ message: "스토리를 찾을 수 없습니다." });
        }

        res.status(200).json({
            message: "ok",
            data: stories
        });
    } catch (error) {
        console.error("스토리 상세 레벨별 조회 오류:", error);
        res.status(500).json({ message: "서버 오류" });
    }
};

module.exports = {
    getStories,
    getStoryById,
    getStoryByLevel
};
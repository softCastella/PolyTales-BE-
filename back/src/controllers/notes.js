// back/controllers/notes.js
const models = require("../models");

const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "인증된 사용자만 작성할 수 있습니다." });
        }

        const note = await models.Note.create({
            title,
            content,
            userId,
            createdAt: new Date(),
        });

        res.status(201).json({ message: "ok", data: note });
    } catch (error) {
        console.error("노트 생성 오류:", error);
        res.status(500).json({ message: "서버 오류" });
    }
};

const findNotes = async (req, res) => {
    try {
        const notes = await models.note.findAll({
            include: [
                {
                    model: models.User,
                    attributes: ["userName"], // 작성자 이름 포함
                },
            ],
            order: [["createdAt", "DESC"]],
        });

        res.status(200).json({ message: "ok", data: notes });
    } catch (error) {
        console.error("노트 목록 오류:", error);
        res.status(500).json({ message: "서버 오류" });
    }
};

const updateNote = async (req, res) => {
    const noteId = req.params.id;
    const { title, content } = req.body;

    try {
        const note = await models.note.findByPk(noteId);

        if (!note) {
            return res.status(404).json({ message: "노트를 찾을 수 없습니다." });
        }

        // 수정 : 작성자와 현재 유저가 다른 경우
        if (note.userId !== req.user.id) {
            return res.status(403).json({ message: "본인만 수정할 수 있습니다." });
        }

        note.title = title;
        note.content = content;
        await note.save();

        res.status(200).json({ message: "ok", data: note });
    } catch (error) {
        console.error("노트 수정 오류:", error);
        res.status(500).json({ message: "서버 오류" });
    }
};

const deleteNote = async (req, res) => {
    const noteId = req.params.id;

    try {
        const note = await models.note.findByPk(noteId);

        if (!note) {
            return res.status(404).json({ message: "노트를 찾을 수 없습니다." });
        }

        // 삭제 : 작성자와 현재 유저가 다른 경우
        if (note.userId !== req.user.id) {
            return res.status(403).json({ message: "본인만 삭제할 수 있습니다." });
        }
        await note.destroy();
        res.status(200).json({ message: "노트가 삭제되었습니다." });
    } catch (error) {
        console.error("노트 삭제 오류:", error);
        res.status(500).json({ message: "서버 오류" });
    }
};

module.exports = {
    createNote,
    findNotes,

    updateNote,
    deleteNote,
};

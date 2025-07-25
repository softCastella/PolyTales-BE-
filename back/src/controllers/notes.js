// back/controllers/notes.js
<<<<<<< HEAD
const models = require("../models"); // ✅ 경로 수정 (CLI 초기화 후)
=======
const models = require("../models");
>>>>>>> 8b2bde9285343de62ec5a0f6f61258ab2d278bc3

const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "인증된 사용자만 작성할 수 있습니다." });
        }

<<<<<<< HEAD
        const note = await models.Note.create({ // ✅ Note (대문자)
            title,
            content,
            userId
            // createdAt은 Sequelize가 자동으로 생성
=======
        const note = await models.Note.create({
            title,
            content,
            userId,
            createdAt: new Date(),
>>>>>>> 8b2bde9285343de62ec5a0f6f61258ab2d278bc3
        });

        res.status(201).json({ message: "ok", data: note });
    } catch (error) {
        console.error("노트 생성 오류:", error);
        res.status(500).json({ message: "서버 오류" });
    }
};

const findNotes = async (req, res) => {
    try {
<<<<<<< HEAD
        const notes = await models.Note.findAll({ // ✅ Note (대문자)
            include: [
                {
                    model: models.User,
                    attributes: ["userName"]
                }
            ],
            order: [["createdAt", "DESC"]]
=======
        const notes = await models.note.findAll({
            include: [
                {
                    model: models.User,
                    attributes: ["userName"], // 작성자 이름 포함
                },
            ],
            order: [["createdAt", "DESC"]],
>>>>>>> 8b2bde9285343de62ec5a0f6f61258ab2d278bc3
        });

        res.status(200).json({ message: "ok", data: notes });
    } catch (error) {
<<<<<<< HEAD
        console.error("노트 목록 불러오기 오류:", error);
        res.status(500).json({ message: "서버 오류" });
    }
};

const findNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        const note = await models.Note.findByPk(noteId, {
            include: [
                {
                    model: models.User,
                    attributes: ["userName"]
                }
            ]
        });

        if (!note) {
            return res.status(404).json({ message: "노트를 찾을 수 없습니다." });
        }

        res.status(200).json({ message: "ok", data: note });
    } catch (error) {
        console.error("개별 노트 불러오기 오류:", error);
=======
        console.error("노트 목록 오류:", error);
>>>>>>> 8b2bde9285343de62ec5a0f6f61258ab2d278bc3
        res.status(500).json({ message: "서버 오류" });
    }
};

const updateNote = async (req, res) => {
    const noteId = req.params.id;
    const { title, content } = req.body;

    try {
<<<<<<< HEAD
        const note = await models.Note.findByPk(noteId); // ✅ Note (대문자)
=======
        const note = await models.note.findByPk(noteId);
>>>>>>> 8b2bde9285343de62ec5a0f6f61258ab2d278bc3

        if (!note) {
            return res.status(404).json({ message: "노트를 찾을 수 없습니다." });
        }

<<<<<<< HEAD
        if (!req.user || note.userId !== req.user.id) {
            return res.status(403).json({ message: "본인만 수정할 수 있습니다." });
        }

        // ✅ update 메서드 사용 (더 효율적)
        await note.update({ title, content });
=======
        // 수정 : 작성자와 현재 유저가 다른 경우
        if (note.userId !== req.user.id) {
            return res.status(403).json({ message: "본인만 수정할 수 있습니다." });
        }

        note.title = title;
        note.content = content;
        await note.save();
>>>>>>> 8b2bde9285343de62ec5a0f6f61258ab2d278bc3

        res.status(200).json({ message: "ok", data: note });
    } catch (error) {
        console.error("노트 수정 오류:", error);
        res.status(500).json({ message: "서버 오류" });
    }
};

const deleteNote = async (req, res) => {
    const noteId = req.params.id;

    try {
<<<<<<< HEAD
        const note = await models.Note.findByPk(noteId); // ✅ Note (대문자)
=======
        const note = await models.note.findByPk(noteId);
>>>>>>> 8b2bde9285343de62ec5a0f6f61258ab2d278bc3

        if (!note) {
            return res.status(404).json({ message: "노트를 찾을 수 없습니다." });
        }

<<<<<<< HEAD
        if (!req.user || note.userId !== req.user.id) {
            return res.status(403).json({ message: "본인만 삭제할 수 있습니다." });
        }

=======
        // 삭제 : 작성자와 현재 유저가 다른 경우
        if (note.userId !== req.user.id) {
            return res.status(403).json({ message: "본인만 삭제할 수 있습니다." });
        }
>>>>>>> 8b2bde9285343de62ec5a0f6f61258ab2d278bc3
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
<<<<<<< HEAD
    findNote,
    updateNote,
    deleteNote
};
=======

    updateNote,
    deleteNote,
};
>>>>>>> 8b2bde9285343de62ec5a0f6f61258ab2d278bc3

const { Schema, model } = require("mongoose");

const movieSchema = new Schema(
  {
    title: {
      // ชื่อหนัง
      type: String,
      default: "",
    },
    language: {
      // ภาษา
      type: String,
      default: "",
    },
    overview: {
      // เนื้อเรื่องย่อ
      type: String,
      default: "",
    },
    posterPath: {
      // รูปภาพหนัง
      type: String,
      default: "",
    },
    releaseDate: {
      // วันที่หนังเข้าฉาย
      type: String,
      default: "",
    },
    popularity: {
      // คะแนนความนิยม
      type: Number,
      required: true,
    },
    isReleased: {
      // สถานะหนังเข้าฉาย true = ฉายแล้ว, false ยังไม่เข้าฉาย
      type: Boolean,
      default: false,
    },
  },
  // Add timestamps auto (createdAt updatedAt)
  { timestamps: true }
);

module.exports = model("movies", movieSchema);

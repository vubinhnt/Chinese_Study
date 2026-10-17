/**
 * HỌC TIẾNG TRUNG (HSK) - DUOLINGO COMPLETE LEARNING ENGINE
 * Tích hợp đủ: Bài khóa đối thoại • Giải thích ngữ pháp • Bài tập ghép câu • Bảng tập viết chữ Hán • Luyện nghe • Flashcard
 */

const APP_CONFIG = {
  // Thay thế bằng URL triển khai Google Apps Script của bạn:
  GOOGLE_SHEETS_API_URL: "https://script.google.com/macros/s/AKfycbz4bCzyMBxnAZIUvLkJ2ejOmUHG1hduoGYBiaqR1uWG0EVNmHImVbv7TmnADpJ0b-Kq/exec",
  SPEECH_LANG: "zh-CN"
};

// 1. KHO DỮ LIỆU BÀI HỌC ĐA DẠNG (HSK 1 VÀ HSK 2)
const COMPREHENSIVE_LESSONS = [
  // HSK 1 - BÀI 1
  {
    id: "HSK1_L1",
    hsk_tier: 1,
    req_level: 1,
    title: "Bài 1: Gặp Gỡ & Chào Hỏi",
    icon: "message-circle",
    dialogue: [
      { speaker: "A (Đại Vệ)", hanzi: "你好！", pinyin: "Nǐ hǎo!", vn: "Chào bạn!" },
      { speaker: "B (Mã Lệ)", hanzi: "你好！很高兴认识你。", pinyin: "Nǐ hǎo! Hěn gāoxìng rènshì nǐ.", vn: "Chào bạn! Rất vui được quen biết bạn." },
      { speaker: "A (Đại Vệ)", hanzi: "你叫什么名字？", pinyin: "Nǐ jiào shénme míngzì?", vn: "Bạn tên là gì thế?" },
      { speaker: "B (Mã Lệ)", hanzi: "我叫玛丽。你呢？", pinyin: "Wǒ jiào Mǎlì. Nǐ ne?", vn: "Tôi tên là Mã Lệ. Còn bạn thì sao?" },
      { speaker: "A (Đại Vệ)", hanzi: "我叫大卫。再见！", pinyin: "Wǒ jiào Dàwèi. Zàijiàn!", vn: "Tôi tên là Đại Vệ. Tạm biệt nhé!" }
    ],
    grammar: [
      {
        title: "1. Câu chào hỏi căn bản với '好'",
        formula: "Đại từ / Danh từ xưng hô + 好 (hǎo)!",
        explain: "Đặt danh xưng trước từ '好' để tạo thành câu chào lịch sự.",
        example: "你好 (Chào bạn) • 老师好 (Chào thầy/cô) • 大家好 (Chào cả nhà)."
      },
      {
        title: "2. Hỏi tên với đại từ nghi vấn '什么' (Gì / Cái gì)",
        formula: "Chủ ngữ + 叫 (jiào) + 什么名字？",
        explain: "Từ '什么' đóng vai trò hỏi thông tin, đặt ngay trước danh từ mà bạn muốn hỏi.",
        example: "你叫什么名字？(Bạn tên là gì?) ➔ 我叫大卫。(Tôi tên là Đại Vệ)."
      }
    ],
    sentenceBuilder: {
      targetVn: "Rất vui được quen biết bạn.",
      correctSentence: ["很高兴", "认识", "你"],
      scrambledWords: ["你", "不客气", "很高兴", "再见", "认识", "叫"]
    },
    writingChars: ["你", "好", "见"],
    listening: {
      audioText: "你好！我叫玛丽。",
      question: "Bạn nghe được người nói giới thiệu tên mình là gì?",
      options: ["Đại Vệ", "Mã Lệ", "Vương Phương", "Lý Quân"],
      correct: "Mã Lệ"
    },
    words: [
      { hanzi: "你好", pinyin: "nǐ hǎo", han_viet: "Nhĩ hảo", meaning: "Xin chào", example: "你好！很高兴认识你。" },
      { hanzi: "名字", pinyin: "míng zi", han_viet: "Danh tự", meaning: "Tên gọi", example: "你叫什么名字？" },
      { hanzi: "再见", pinyin: "zài jiàn", han_viet: "Tái kiến", meaning: "Tạm biệt", example: "明天见，再见！" }
    ]
  },

  // HSK 1 - BÀI 2
  {
    id: "HSK1_L2",
    hsk_tier: 1,
    req_level: 1,
    title: "Bài 2: Cảm Ơn & Xin Lỗi",
    icon: "heart-handshake",
    dialogue: [
      { speaker: "A", hanzi: "太谢谢你了！", pinyin: "Tài xièxie nǐ le!", vn: "Cảm ơn bạn rất nhiều!" },
      { speaker: "B", hanzi: "不客气，这是我应该做的。", pinyin: "Bú kèqi, zhè shì wǒ yīnggāi zuò de.", vn: "Không có gì, đây là việc tôi nên làm mà." },
      { speaker: "A", hanzi: "对不起，让你久等了。", pinyin: "Duìbuqǐ, ràng nǐ jiǔ děng le.", vn: "Xin lỗi, đã để bạn phải chờ lâu." },
      { speaker: "B", hanzi: "没关系，我也刚到。", pinyin: "Méi guānxi, wǒ yě gāng dào.", vn: "Không sao đâu, tôi cũng vừa mới tới thôi." }
    ],
    grammar: [
      {
        title: "1. Đáp lại lời cảm ơn với '不客气'",
        formula: "不客气 (Bú kèqi) / 不用谢 (Bú yòng xiè)",
        explain: "Khuyên người đối diện không cần khách khí.",
        example: "谢谢你！➔ 不客气！"
      },
      {
        title: "2. Đáp lại lời xin lỗi với '没关系'",
        formula: "对不起 ➔ 没关系 (Méi guānxi)",
        explain: "Biểu thị sự thông cảm, không có việc gì phiền lòng.",
        example: "对不起！➔ 没关系。"
      }
    ],
    sentenceBuilder: {
      targetVn: "Cảm ơn bạn rất nhiều.",
      correctSentence: ["太", "谢谢", "你", "了"],
      scrambledWords: ["谢谢", "了", "没关系", "太", "你", "对不起"]
    },
    writingChars: ["谢", "不", "对"],
    listening: {
      audioText: "对不起，让你久等了。",
      question: "Người nói đang thể hiện thái độ gì?",
      options: ["Xin lỗi vì bắt chờ", "Chào buổi sáng", "Mời uống trà", "Cảm ơn quà tặng"],
      correct: "Xin lỗi vì bắt chờ"
    },
    words: [
      { hanzi: "谢谢", pinyin: "xiè xie", han_viet: "Tạ tạ", meaning: "Cảm ơn", example: "谢谢你的帮助。" },
      { hanzi: "不客气", pinyin: "bú kè qi", han_viet: "Bất khách khí", meaning: "Đừng khách sáo", example: "不用谢，不客气。" },
      { hanzi: "对不起", pinyin: "duì bu qǐ", han_viet: "Đối bất khởi", meaning: "Xin lỗi", example: "对不起，我迟到了。" }
    ]
  },

  // HSK 1 - BÀI 3
  {
    id: "HSK1_L3",
    hsk_tier: 1,
    req_level: 1,
    title: "Bài 3: Bạn Là Người Nước Nào?",
    icon: "globe",
    dialogue: [
      { speaker: "A", hanzi: "你是中国人吗？", pinyin: "Nǐ shì Zhōngguó rén ma?", vn: "Bạn có phải người Trung Quốc không?" },
      { speaker: "B", hanzi: "不是，我是越南人。你呢？", pinyin: "Bú shì, wǒ shì Yuènán rén. Nǐ ne?", vn: "Không phải, tôi là người Việt Nam. Còn bạn?" },
      { speaker: "A", hanzi: "我是美国人。", pinyin: "Wǒ shì Měiguó rén.", vn: "Tôi là người Mỹ." }
    ],
    grammar: [
      {
        title: "Câu trần thuật và nghi vấn với 是 (shì) và 吗 (ma)",
        formula: "Chủ ngữ + 是 + Danh từ + 吗？",
        explain: "Trợ từ nghi vấn '吗' đặt ở cuối câu để tạo câu hỏi Có... Không.",
        example: "你是老师吗？(Bạn là giáo viên phải không?) ➔ 我不是老师。(Tôi không phải giáo viên)."
      }
    ],
    sentenceBuilder: {
      targetVn: "Tôi là người Việt Nam.",
      correctSentence: ["我", "是", "越南人"],
      scrambledWords: ["是", "中国人", "我", "吗", "越南人", "不"]
    },
    writingChars: ["是", "国", "人"],
    listening: {
      audioText: "我不是中国人，我是越南人。",
      question: "Quốc tịch của người nói là nước nào?",
      options: ["Trung Quốc", "Việt Nam", "Mỹ", "Hàn Quốc"],
      correct: "Việt Nam"
    },
    words: [
      { hanzi: "是", pinyin: "shì", han_viet: "Thị", meaning: "Là, phải", example: "我是学生。" },
      { hanzi: "人", pinyin: "rén", han_viet: "Nhân", meaning: "Người", example: "中国人。" },
      { hanzi: "吗", pinyin: "ma", han_viet: "Ma", meaning: "Trợ từ hỏi (không?)", example: "好吗？" }
    ]
  },

  // HSK 2 - BÀI 1 (Yêu cầu cấp 2)
  {
    id: "HSK2_L1",
    hsk_tier: 2,
    req_level: 2,
    title: "Bài 1: Gọi Món & Ăn Uống",
    icon: "coffee",
    dialogue: [
      { speaker: "Phục vụ", hanzi: "服务员，您想吃什么？", pinyin: "Fúwùyuán, nín xiǎng chī shénme?", vn: "Kính chào quý khách, ngài muốn dùng món gì ạ?" },
      { speaker: "Khách", hanzi: "我想吃一碗米饭和一个苹果。", pinyin: "Wǒ xiǎng chī yì wǎn mǐfàn hé yí gè píngguǒ.", vn: "Tôi muốn một bát cơm và một quả táo." },
      { speaker: "Phục vụ", hanzi: "好的，请稍等。", pinyin: "Hǎo de, qǐng shāo děng.", vn: "Dạ vâng, xin vui lòng đợi một chút." }
    ],
    grammar: [
      {
        title: "Động từ năng nguyện 想 (xiǎng) - Muốn",
        formula: "Chủ ngữ + 想 + Động từ + Tân ngữ",
        explain: "Diễn tả nguyện vọng, dự định của người nói.",
        example: "我想喝茶。(Tôi muốn uống trà) • 我想买电脑。(Tôi muốn mua máy tính)."
      }
    ],
    sentenceBuilder: {
      targetVn: "Tôi muốn ăn cơm.",
      correctSentence: ["我", "想", "吃", "米饭"],
      scrambledWords: ["喝", "想", "米饭", "苹果", "我", "吃"]
    },
    writingChars: ["吃", "想", "饭"],
    listening: {
      audioText: "我想吃一碗米饭和一个苹果。",
      question: "Khách hàng muốn ăn những món gì?",
      options: ["Một bát cơm và một quả táo", "Hai bát mỳ", "Một cốc trà", "Bánh bao"],
      correct: "Một bát cơm và một quả táo"
    },
    words: [
      { hanzi: "苹果", pinyin: "píng guǒ", han_viet: "Bình quả", meaning: "Quả táo", example: "我想吃苹果。" },
      { hanzi: "米饭", pinyin: "mǐ fàn", han_viet: "Mễ phạn", meaning: "Cơm", example: "今天吃米饭。" }
    ]
  }
];

// 2. STATE NGƯỜI DÙNG
let currentUser = {
  username: "Khách",
  email: "",
  current_level: 1,
  completed_lessons: [],
  exp: 0,
  hearts: 5,
  streak: 1
};

let activeViewingHskTier = 1;
let currentLesson = null;
let currentCardIndex = 0;

// 3. KHỞI CHẠY ỨNG DỤNG
document.addEventListener("DOMContentLoaded", () => {
  loadLocalUserProgress();
  setupNavigationEvents();
  renderLearningPath();
  setupLessonSubtabs();
  initSentenceBuilderLogic();
  initHanziCanvasLogic();
  initLevelExam();
  loadSampleDictionary();
});

function loadLocalUserProgress() {
  const saved = localStorage.getItem("duo_hsk_user");
  if (saved) currentUser = JSON.parse(saved);
  updateUserStatusBar();
}

function saveUserProgress() {
  localStorage.setItem("duo_hsk_user", JSON.stringify(currentUser));
  updateUserStatusBar();

  // Đẩy dữ liệu lên Google Sheets nếu đã dán API URL
  if (APP_CONFIG.GOOGLE_SHEETS_API_URL && currentUser.email) {
    fetch(APP_CONFIG.GOOGLE_SHEETS_API_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "save_user", user: currentUser })
    }).catch(err => console.log("Lỗi đồng bộ Sheets:", err));
  }
}

function updateUserStatusBar() {
  document.getElementById("userStreakDisplay").innerText = currentUser.streak;
  document.getElementById("userExpDisplay").innerText = `${currentUser.exp} EXP`;
  document.getElementById("userHeartsDisplay").innerText = currentUser.hearts;
  document.getElementById("userDisplayName").innerText = currentUser.username;
  document.getElementById("userAvatarText").innerText = currentUser.username.charAt(0).toUpperCase();
}

// 4. RENDER CÂY BÀI HỌC
function renderLearningPath() {
  const container = document.getElementById("learningPathContainer");
  const filtered = COMPREHENSIVE_LESSONS.filter(l => l.hsk_tier === activeViewingHskTier);

  document.getElementById("currentHskBannerTitle").innerText = `HSK ${activeViewingHskTier}: ${getHskTitle(activeViewingHskTier)}`;
  document.getElementById("selectHskTier").value = activeViewingHskTier;

  const offsets = ["translate-x-0", "translate-x-8", "translate-x-0", "-translate-x-8"];

  if (filtered.length === 0) {
    container.innerHTML = `<div class="p-8 text-center text-stone-400 font-bold">Các bài học HSK ${activeViewingHskTier} đang được bổ sung thêm.</div>`;
    return;
  }

  container.innerHTML = filtered.map((lesson, idx) => {
    const isCompleted = currentUser.completed_lessons.includes(lesson.id);
    const isLocked = lesson.req_level > currentUser.current_level;
    const offsetClass = offsets[idx % offsets.length];

    let btnBg = "bg-[#58CC02] border-[#46A302] text-white";
    let icon = lesson.icon || "book-open";
    if (isCompleted) {
      btnBg = "bg-amber-400 border-amber-500 text-white";
      icon = "check";
    } else if (isLocked) {
      btnBg = "bg-stone-200 border-stone-300 text-stone-400";
      icon = "lock";
    }

    return `
      <div class="flex flex-col items-center ${offsetClass} transition-all">
        <button onclick="handleLessonClick('${lesson.id}', ${lesson.req_level})" 
                class="path-node ${isLocked ? 'locked' : ''} w-20 h-20 rounded-full border-b-8 flex items-center justify-center text-2xl shadow-md ${btnBg}">
          <i data-lucide="${icon}" class="w-8 h-8"></i>
        </button>
        <div class="mt-2 text-center">
          <span class="text-xs font-black px-2.5 py-1 rounded-xl bg-white border border-stone-200 shadow-sm text-stone-700 block max-w-[170px] truncate">
            ${lesson.title}
          </span>
          <span class="text-[10px] font-extrabold ${isLocked ? 'text-rose-500' : 'text-[#58CC02]'}">
            ${isLocked ? `Khóa (Cần HSK ${lesson.req_level})` : (isCompleted ? 'Đã hoàn thành' : 'Chưa học')}
          </span>
        </div>
      </div>
    `;
  }).join("");

  if (window.lucide) lucide.createIcons();
}

function getHskTitle(tier) {
  const map = { 1: "Cơ Bản Nhập Môn", 2: "Ăn Uống & Sinh Hoạt", 3: "Giao Tiếp Xã Hội", 4: "Công Sở & Thương Mại" };
  return map[tier] || "Tổng hợp";
}

// 5. XỬ LÝ KHÓA CẤP ĐỘ
window.handleLessonClick = function(lessonId, reqLevel) {
  if (reqLevel > currentUser.current_level) {
    document.getElementById("lockModalMessage").innerText = 
      `Bài học này thuộc cấp độ HSK ${reqLevel}. Bạn hiện đang ở HSK ${currentUser.current_level}. Vui lòng hoàn thành các bài học trước hoặc thi vượt cấp để mở khóa!`;
    document.getElementById("lockModal").classList.remove("hidden");
    return;
  }

  const lesson = COMPREHENSIVE_LESSONS.find(l => l.id === lessonId);
  if (lesson) openComprehensiveLesson(lesson);
};

document.getElementById("closeLockModalBtn").addEventListener("click", () => {
  document.getElementById("lockModal").classList.add("hidden");
});

document.getElementById("selectHskTier").addEventListener("change", (e) => {
  const tier = parseInt(e.target.value);
  if (tier > currentUser.current_level) {
    document.getElementById("lockModalMessage").innerText = 
      `Cấp độ HSK ${tier} đang bị khóa. Bạn chưa hoàn thành HSK ${currentUser.current_level}!`;
    document.getElementById("lockModal").classList.remove("hidden");
    e.target.value = activeViewingHskTier;
    return;
  }
  activeViewingHskTier = tier;
  renderLearningPath();
});

// 6. PHÒNG HỌC TOÀN DIỆN
function openComprehensiveLesson(lesson) {
  currentLesson = lesson;
  currentCardIndex = 0;

  document.getElementById("modalLessonLevel").innerText = `HSK ${lesson.hsk_tier} - ${lesson.id}`;
  document.getElementById("modalLessonTitle").innerText = lesson.title;

  // 1. Render Hội thoại
  renderDialogueSection(lesson.dialogue);

  // 2. Render Ngữ pháp
  renderGrammarSection(lesson.grammar);

  // 3. Render Ghép câu
  loadSentenceBuilder(lesson.sentenceBuilder);

  // 4. Render Bảng tập viết chữ Hán
  setupHanziWriterSelect(lesson.writingChars);

  // 5. Render Luyện nghe
  renderListeningSection(lesson.listening);

  // 6. Render Flashcard
  renderVocabCard();

  // Reset về tab Hội thoại đầu tiên
  triggerSubTab("sec-dialogue");

  document.getElementById("lessonModal").classList.remove("hidden");
  if (window.lucide) lucide.createIcons();
}

function renderDialogueSection(dialogueList) {
  const container = document.getElementById("dialogueChatContainer");
  container.innerHTML = dialogueList.map((item, idx) => {
    const isA = item.speaker.includes("A") || idx % 2 === 0;
    return `
      <div class="flex items-start gap-2.5 ${isA ? '' : 'flex-row-reverse'}">
        <div class="w-8 h-8 rounded-full ${isA ? 'bg-sky-500' : 'bg-emerald-500'} text-white font-black text-xs flex items-center justify-center shrink-0">
          ${item.speaker.charAt(0)}
        </div>
        <div class="p-3 max-w-[85%] ${isA ? 'chat-bubble-a' : 'chat-bubble-b'}">
          <div class="flex items-center justify-between gap-3 mb-1">
            <span class="text-xs font-black text-stone-500">${item.speaker}</span>
            <button onclick="speakChineseText('${item.hanzi}')" class="text-stone-400 hover:text-[#58CC02]">
              <i data-lucide="volume-2" class="w-4 h-4"></i>
            </button>
          </div>
          <div class="text-base font-chinese font-black text-stone-800">${item.hanzi}</div>
          <div class="text-xs font-bold text-stone-400">${item.pinyin}</div>
          <div class="text-xs font-bold text-stone-600 mt-1 border-t border-stone-200/50 pt-1">${item.vn}</div>
        </div>
      </div>
    `;
  }).join("");

  document.getElementById("playFullDialogueBtn").onclick = () => {
    let fullText = dialogueList.map(d => d.hanzi).join("，");
    speakChineseText(fullText);
  };
}

function renderGrammarSection(grammarList) {
  const container = document.getElementById("grammarContentBox");
  container.innerHTML = grammarList.map((g, idx) => `
    <div class="p-3.5 rounded-2xl bg-stone-50 border-2 border-stone-200 space-y-1.5">
      <h4 class="font-black text-stone-900 text-sm flex items-center gap-2">
        <span class="w-5 h-5 rounded-md bg-[#58CC02] text-white text-xs flex items-center justify-center">${idx + 1}</span>
        ${g.title}
      </h4>
      <div class="p-2 bg-white rounded-xl border border-stone-200 text-xs font-mono font-bold text-[#58CC02]">
        ${g.formula}
      </div>
      <p class="text-xs font-bold text-stone-600 leading-relaxed">${g.explain}</p>
      <div class="text-xs font-bold text-stone-500 italic bg-amber-50/60 p-2 rounded-lg border border-amber-200/40">
        💡 Ví dụ: ${g.example}
      </div>
    </div>
  `).join("");
}

// 7. BÀI TẬP GHÉP CÂU DUOLINGO
let currentSentenceConfig = null;
let userAssembledWords = [];

function initSentenceBuilderLogic() {
  document.getElementById("resetSentenceBtn").onclick = () => {
    userAssembledWords = [];
    renderSentenceBuilderState();
  };

  document.getElementById("checkSentenceBtn").onclick = () => {
    const feedback = document.getElementById("sentenceFeedback");
    feedback.classList.remove("hidden");
    const userString = userAssembledWords.join("");
    const correctString = currentSentenceConfig.correctSentence.join("");

    if (userString === correctString) {
      feedback.innerText = "Chính xác! Bạn ghép câu rất chuẩn 🎉 (+15 EXP)";
      feedback.className = "text-xs font-black p-3 rounded-2xl text-center bg-emerald-100 text-emerald-800 border border-emerald-300 block";
      currentUser.exp += 15;
      saveUserProgress();
      speakChineseText(userString);
    } else {
      feedback.innerText = `Chưa chính xác! Đáp án đúng là: "${correctString}"`;
      feedback.className = "text-xs font-black p-3 rounded-2xl text-center bg-rose-100 text-rose-800 border border-rose-300 block";
    }
  };
}

function loadSentenceBuilder(config) {
  currentSentenceConfig = config;
  userAssembledWords = [];
  document.getElementById("sentenceTargetVn").innerText = `"${config.targetVn}"`;
  document.getElementById("sentenceFeedback").classList.add("hidden");
  renderSentenceBuilderState();
}

function renderSentenceBuilderState() {
  const answerArea = document.getElementById("sentenceAnswerArea");
  const wordBank = document.getElementById("sentenceWordBank");
  const placeholder = document.getElementById("sentenceEmptyPlaceholder");

  answerArea.innerHTML = "";
  if (userAssembledWords.length === 0) {
    answerArea.appendChild(placeholder);
  } else {
    userAssembledWords.forEach((word, idx) => {
      const btn = document.createElement("button");
      btn.className = "word-tile bg-emerald-50 border-emerald-300 text-emerald-800";
      btn.innerText = word;
      btn.onclick = () => {
        userAssembledWords.splice(idx, 1);
        renderSentenceBuilderState();
      };
      answerArea.appendChild(btn);
    });
  }

  wordBank.innerHTML = "";
  currentSentenceConfig.scrambledWords.forEach(word => {
    const isUsed = userAssembledWords.includes(word);
    const tile = document.createElement("button");
    tile.className = `word-tile ${isUsed ? "disabled" : ""}`;
    tile.innerText = word;
    tile.onclick = () => {
      userAssembledWords.push(word);
      speakChineseText(word);
      renderSentenceBuilderState();
    };
    wordBank.appendChild(tile);
  });
}

// 8. BẢNG TẬP VIẾT CHỮ HÁN TRÊN CANVAS
let canvas, ctx, isDrawing = false;
let isGuideVisible = true;

function initHanziCanvasLogic() {
  canvas = document.getElementById("hanziCanvas");
  ctx = canvas.getContext("2d");
  ctx.lineWidth = 14;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#1F2937"; // Mực tàu đen đậm

  const startDraw = (e) => {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDraw = () => {
    isDrawing = false;
    ctx.closePath();
  };

  canvas.addEventListener("mousedown", startDraw);
  canvas.addEventListener("mousemove", draw);
  window.addEventListener("mouseup", stopDraw);

  canvas.addEventListener("touchstart", startDraw, { passive: false });
  canvas.addEventListener("touchmove", draw, { passive: false });
  window.addEventListener("touchend", stopDraw);

  document.getElementById("clearCanvasBtn").onclick = clearHanziCanvas;

  document.getElementById("toggleGuideBtn").onclick = () => {
    isGuideVisible = !isGuideVisible;
    const guide = document.getElementById("hanziGuideChar");
    guide.style.display = isGuideVisible ? "flex" : "none";
  };

  document.getElementById("speakHanziWriteBtn").onclick = () => {
    const sel = document.getElementById("selectHanziToWrite");
    speakChineseText(sel.value);
  };

  document.getElementById("selectHanziToWrite").onchange = (e) => {
    document.getElementById("hanziGuideChar").innerText = e.target.value;
    clearHanziCanvas();
    speakChineseText(e.target.value);
  };
}

function clearHanziCanvas() {
  if (ctx && canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function setupHanziWriterSelect(chars) {
  const sel = document.getElementById("selectHanziToWrite");
  sel.innerHTML = chars.map(c => `<option value="${c}">${c}</option>`).join("");
  document.getElementById("hanziGuideChar").innerText = chars[0];
  clearHanziCanvas();
}

// 9. LUYỆN NGHE & FLASHCARD
function renderListeningSection(listeningData) {
  document.getElementById("listeningQuestionTitle").innerText = listeningData.question;
  const feedback = document.getElementById("listeningFeedback");
  feedback.classList.add("hidden");

  document.getElementById("playListeningAudioBtn").onclick = () => {
    speakChineseText(listeningData.audioText);
  };

  const container = document.getElementById("listeningOptionsGrid");
  container.innerHTML = listeningData.options.map(opt => `
    <button onclick="handleListeningAnswer(this, '${opt}', '${listeningData.correct}')" 
            class="listening-opt-btn p-3 rounded-2xl border-2 border-stone-200 bg-white font-black text-xs text-stone-700 hover:bg-stone-50 transition-all">
      ${opt}
    </button>
  `).join("");
}

window.handleListeningAnswer = function(btn, chosen, correct) {
  const feedback = document.getElementById("listeningFeedback");
  feedback.classList.remove("hidden");
  document.querySelectorAll(".listening-opt-btn").forEach(b => b.disabled = true);

  if (chosen === correct) {
    btn.classList.add("bg-emerald-500", "text-white", "border-emerald-600");
    feedback.innerText = "Chính xác! Bạn nghe rất tốt 🎉 (+10 EXP)";
    feedback.className = "text-xs font-black mt-2 text-emerald-600 block";
    currentUser.exp += 10;
    saveUserProgress();
  } else {
    btn.classList.add("bg-rose-500", "text-white", "border-rose-600");
    feedback.innerText = `Chưa đúng! Đáp án đúng là: ${correct}`;
    feedback.className = "text-xs font-black mt-2 text-rose-600 block";
  }
};

function renderVocabCard() {
  const words = currentLesson.words;
  const card = words[currentCardIndex];
  document.getElementById("modalFlashcard").classList.remove("flipped");

  document.getElementById("modalHanzi").innerText = card.hanzi;
  document.getElementById("modalPinyin").innerText = card.pinyin;
  document.getElementById("modalHanViet").innerText = `Âm Hán Việt: ${card.han_viet}`;
  document.getElementById("modalMeaning").innerText = card.meaning;
  document.getElementById("modalExample").innerText = card.example || "";
  document.getElementById("modalCardCounter").innerText = `${currentCardIndex + 1} / ${words.length}`;
}

document.getElementById("modalFlashcard").addEventListener("click", (e) => {
  if (e.target.closest("button")) return;
  document.getElementById("modalFlashcard").classList.toggle("flipped");
});

document.getElementById("modalSpeechBtn").addEventListener("click", (e) => {
  e.stopPropagation();
  speakChineseText(currentLesson.words[currentCardIndex].hanzi);
});

document.getElementById("modalPrevCardBtn").addEventListener("click", () => {
  if (currentCardIndex > 0) {
    currentCardIndex--;
    renderVocabCard();
  }
});

document.getElementById("modalNextCardBtn").addEventListener("click", () => {
  if (currentCardIndex < currentLesson.words.length - 1) {
    currentCardIndex++;
    renderVocabCard();
  }
});

// Hoàn thành bài học
document.getElementById("completeLessonBtn").addEventListener("click", () => {
  if (!currentUser.completed_lessons.includes(currentLesson.id)) {
    currentUser.completed_lessons.push(currentLesson.id);
    currentUser.exp += 40;
    saveUserProgress();
  }
  document.getElementById("lessonModal").classList.add("hidden");
  renderLearningPath();
  alert("🎉 Xuất sắc! Bạn đã vượt qua trọn vẹn 6 hoạt động bài học và nhận +40 EXP!");
});

document.getElementById("closeLessonModalBtn").addEventListener("click", () => {
  document.getElementById("lessonModal").classList.add("hidden");
});

function setupLessonSubtabs() {
  document.querySelectorAll(".lesson-subtab").forEach(tab => {
    tab.addEventListener("click", () => {
      triggerSubTab(tab.getAttribute("data-section"));
    });
  });
}

function triggerSubTab(targetId) {
  document.querySelectorAll(".lesson-subtab").forEach(t => {
    if (t.getAttribute("data-section") === targetId) {
      t.classList.add("active", "border-[#58CC02]", "text-[#58CC02]");
      t.classList.remove("border-transparent", "text-stone-400");
    } else {
      t.classList.remove("active", "border-[#58CC02]", "text-[#58CC02]");
      t.classList.add("border-transparent", "text-stone-400");
    }
  });

  document.querySelectorAll(".lesson-section").forEach(s => s.classList.add("hidden"));
  document.getElementById(targetId)?.classList.remove("hidden");
}

// 10. THI VƯỢT CẤP HSK (EXAM)
let examQuestions = [];
let currentExamIdx = 0;
let examScore = 0;

function initLevelExam() {
  document.getElementById("examLevelTarget").innerText = `HSK ${currentUser.current_level} ➔ HSK ${currentUser.current_level + 1}`;
  examQuestions = [
    { q: "你好", p: "nǐ hǎo", c: "Xin chào", opts: ["Xin chào", "Tạm biệt", "Số ba"] },
    { q: "谢谢", p: "xiè xie", c: "Cảm ơn", opts: ["Cảm ơn", "Không sao", "Xin lỗi"] },
    { q: "对不起", p: "duì bu qǐ", c: "Xin lỗi", opts: ["Xin chào", "Xin lỗi", "Tạm biệt"] },
    { q: "吃", p: "chī", c: "Ăn", opts: ["Uống", "Ăn", "Ngủ"] },
    { q: "苹果", p: "píng guǒ", c: "Quả táo", opts: ["Quả chuối", "Quả táo", "Bát cơm"] }
  ];
  currentExamIdx = 0;
  examScore = 0;
  renderExamQuestion();
}

function renderExamQuestion() {
  const item = examQuestions[currentExamIdx];
  document.getElementById("examCounterText").innerText = `Câu ${currentExamIdx + 1} / ${examQuestions.length}`;
  document.getElementById("examQuestionHanzi").innerText = item.q;
  document.getElementById("examQuestionPinyin").innerText = item.p;

  const container = document.getElementById("examOptionsList");
  container.innerHTML = item.opts.map(opt => `
    <button onclick="handleExamAnswer(this, '${opt}', '${item.c}')" 
            class="p-3.5 rounded-2xl border-2 border-stone-200 font-extrabold text-sm text-stone-700 bg-white hover:bg-stone-50 transition-all text-center">
      ${opt}
    </button>
  `).join("");
}

window.handleExamAnswer = function(btn, chosen, correct) {
  if (chosen === correct) {
    btn.classList.add("bg-emerald-500", "text-white", "border-emerald-600");
    examScore++;
  } else {
    btn.classList.add("bg-rose-500", "text-white", "border-rose-600");
  }

  setTimeout(() => {
    currentExamIdx++;
    if (currentExamIdx < examQuestions.length) {
      renderExamQuestion();
    } else {
      const percent = (examScore / examQuestions.length) * 100;
      if (percent >= 80) {
        currentUser.current_level++;
        currentUser.exp += 100;
        saveUserProgress();
        alert(`🏆 ĐẠT! Bạn được ${percent}% điểm và đã chính thức mở khóa HSK ${currentUser.current_level}!`);
        activeViewingHskTier = currentUser.current_level;
        renderLearningPath();
      } else {
        alert(`Bạn đạt ${percent}% điểm. Cần tối thiểu 80% để mở khóa cấp tiếp theo.`);
      }
      initLevelExam();
    }
  }, 400);
};

// 11. TỪ ĐIỂN
function loadSampleDictionary() {
  const sample = [
    { hanzi: "你好", pinyin: "nǐ hǎo", meaning: "Xin chào", level: 1 },
    { hanzi: "谢谢", pinyin: "xiè xie", meaning: "Cảm ơn", level: 1 },
    { hanzi: "对不起", pinyin: "duì bu qǐ", meaning: "Xin lỗi", level: 1 },
    { hanzi: "苹果", pinyin: "píng guǒ", meaning: "Quả táo", level: 2 },
    { hanzi: "米饭", pinyin: "mǐ fàn", meaning: "Cơm", level: 2 },
    { hanzi: "会议", pinyin: "huì yì", meaning: "Cuộc họp", level: 3 }
  ];
  renderDictionaryList(sample);

  document.getElementById("dictSearchInput").addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase().trim();
    const filtered = sample.filter(w => w.hanzi.includes(q) || w.pinyin.includes(q) || w.meaning.includes(q));
    renderDictionaryList(filtered);
  });
}

function renderDictionaryList(list) {
  const container = document.getElementById("dictionaryTable");
  container.innerHTML = list.map(item => `
    <div class="py-2.5 px-2 flex items-center justify-between hover:bg-stone-50 rounded-xl">
      <div class="flex items-center gap-3">
        <span class="w-7 h-7 rounded-lg bg-stone-100 text-stone-600 font-black text-xs flex items-center justify-center">H${item.level}</span>
        <div>
          <span class="text-lg font-chinese font-black text-stone-900">${item.hanzi}</span>
          <span class="text-xs font-bold text-stone-400 ml-1.5">${item.pinyin}</span>
          <div class="text-xs font-bold text-stone-600">${item.meaning}</div>
        </div>
      </div>
      <button onclick="speakChineseText('${item.hanzi}')" class="p-2 text-stone-400 hover:text-[#58CC02]"><i data-lucide="volume-2" class="w-4 h-4"></i></button>
    </div>
  `).join("");
  if (window.lucide) lucide.createIcons();
}

// 12. NAVIGATION & SPEECH
function setupNavigationEvents() {
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".nav-btn").forEach(b => {
        b.classList.remove("active", "border-[#58CC02]", "bg-[#58CC02]/10", "text-[#58CC02]");
        b.classList.add("border-transparent", "text-stone-500");
      });
      btn.classList.add("active", "border-[#58CC02]", "bg-[#58CC02]/10", "text-[#58CC02]");
      btn.classList.remove("border-transparent", "text-stone-500");

      const tabId = btn.getAttribute("data-tab");
      document.querySelectorAll(".tab-pane").forEach(p => p.classList.add("hidden"));
      document.getElementById(tabId)?.classList.remove("hidden");
    });
  });

  const authModal = document.getElementById("authModal");
  document.getElementById("userAuthBtn").onclick = () => authModal.classList.remove("hidden");
  document.getElementById("closeAuthModalBtn").onclick = () => authModal.classList.add("hidden");
  document.getElementById("authForm").onsubmit = (e) => {
    e.preventDefault();
    currentUser.username = document.getElementById("authUsernameInput").value.trim();
    currentUser.email = document.getElementById("authEmailInput").value.trim();
    saveUserProgress();
    authModal.classList.add("hidden");
    alert("Đã cập nhật hồ sơ học tập!");
  };
}

function speakChineseText(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = APP_CONFIG.SPEECH_LANG;
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}
const registerForm = document.getElementById('registerForm');
const quizContainer = document.getElementById('quizContainer');
const alreadyParticipated = document.getElementById('alreadyParticipated');
const questionBox = document.getElementById('questionBox');
const optionsBox = document.getElementById('options');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');

let score = parseInt(localStorage.getItem('score')) || 0;
let currentQuestion = 0;
let timer;

const questions = [
    // 1 تا 3 — آسان
    { q: "پایتخت ایران چیست؟", o: ["تهران", "اصفهان", "شیراز", "مشهد"], a: 0 },
    { q: "معروف‌ترین تیم فوتبال ایران؟", o: ["استقلال", "سپاهان", "پرسپولیس", "تراکتور"], a: 2 },
    { q: "ساز ملی ایران چیست؟", o: ["پیانو", "تار", "ویولن", "گیتار"], a: 1 },
  
    // 4 تا 8 — متوسط
    { q: "اولین فیلم ایرانی؟", o: ["گاو", "قیصر", "آبی", "آبی و رابی"], a: 3 },
    { q: "دریای خزر در کدام سمت ایران است؟", o: ["شمال", "جنوب", "شرق", "غرب"], a: 0 },
    { q: "قدیمی‌ترین تیم ایران؟", o: ["استقلال", "شاهین", "پرسپولیس", "ذوب‌آهن"], a: 1 },
    { q: "بلندترین قله ایران؟", o: ["تفتان", "دماوند", "سبلان", "زاگرس"], a: 1 },
    { q: "خواننده معروف دهه 60 ایران؟", o: ["ابی", "معین", "داریوش", "فریدون"], a: 2 },
  
    // 9 تا 10 — شروع سخت‌ها
    { q: "فتح تهران در انقلاب مشروطه چند روز طول کشید؟", o: ["3", "7", "10", "13"], a: 1 },
    { q: "اولین مدال طلای ایران در المپیک توسط چه کسی بود؟", o: ["رضا زاده", "نامجو", "تختی", "توپچی‌لو"], a: 1 },
  
    // 11 تا 20 — سخت و نکته‌دار و رکب‌دار 😈
    { q: "در جام جهانی ۱۹۷۸ ایران با کدوم تیم گل اولش رو زد؟", o: ["اسکاتلند", "هلند", "پرو", "آرژانتین"], a: 0 },
    { q: "کدوم خواننده قبل انقلاب فقط یک بار با ارکستر ملی ایران اجرا داشت؟", o: ["معین", "هایده", "مهستی", "گوگوش"], a: 3 },
    { q: "کوهی در ایران که بهش لقب 'کوه بدون سایه' دادن کدومه؟", o: ["تفتان", "سهند", "دماوند", "بی‌بی شهربانو"], a: 0 },
    { q: "قدیمی‌ترین ساز پیدا شده در ایران متعلق به چه دوره‌ایه؟", o: ["ساسانی", "هخامنشی", "ایلامی", "اشکانی"], a: 2 },
    { q: "اولین فیلم ایرانی که در جشنواره کن اکران شد؟", o: ["خانه دوست کجاست", "گاو", "طلای سرخ", "باشو غریبه کوچک"], a: 1 },
    { q: "در کدام سال ایران دو بار قهرمان کشتی جهان شد؟", o: ["1998", "2012", "2002", "هیچ‌کدام"], a: 3 },
    { q: "کدوم شاعر ایرانی شعری داره که عملاً پنهانی درباره فوتبال نوشته؟", o: ["فروغ فرخزاد", "نیما یوشیج", "سهراب سپهری", "اخوان ثالث"], a: 3 },
    { q: "اسم واقعی استاد شجریان چی بود؟", o: ["محمدرضا", "سیدمحمد", "عباس", "حسین"], a: 0 },
    { q: "کدوم خواننده ایرانی یک بار تو مراسم سازمان ملل اجرا داشت؟", o: ["گوگوش", "داریوش", "سالار عقیلی", "هیچ‌کدام"], a: 3 },
    { q: "کدوم رود ایرانی هست که خلاف جریان زمین حرکت می‌کنه؟", o: ["کارون", "هیرمند", "زاب", "هیچ‌کدوم"], a: 3 }
  ];
  

function startTimer() {
  let t = 20;
  timeDisplay.textContent = t;
  timer = setInterval(() => {
    t--;
    timeDisplay.textContent = t;
    if (t <= 0) {
      clearInterval(timer);
      nextQuestion(-1); // زمان تموم شد
    }
  }, 1000);
}

function showQuestion(index) {
  const q = questions[index];
  questionBox.textContent = q.q;
  optionsBox.innerHTML = '';
  q.o.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => nextQuestion(i);
    optionsBox.appendChild(btn);
  });
  startTimer();
}

function nextQuestion(selectedIndex) {
  clearInterval(timer);
  const correctIndex = questions[currentQuestion].a;

  if (selectedIndex === correctIndex) score += 10;
  else if (selectedIndex !== -1) score -= 5;

  currentQuestion++;
  localStorage.setItem('score', score);
  scoreDisplay.textContent = `امتیاز: ${score}`;

  if (currentQuestion < questions.length) {
    showQuestion(currentQuestion);
  } else {
    endGame(); // پایان بازی
  }
}

function endGame() {
    questionBox.textContent = "پایان بازی!";
    optionsBox.innerHTML = "";
    timeDisplay.textContent = "";
  
    const message = document.createElement('div');
    message.className = "message";
  
    if (score >= 200) {
      message.textContent = "تبریک! تو پیروز شدی! ولی یادت نره غرور نگیرتت 😉";
  
      // ایجاد متن جایزه
      const rewardText = document.createElement('p');
      rewardText.className = "reward-text";
      rewardText.textContent = "برای گرفتن جایزه ۲۰۰ هزارتومانت به تلگرامم پیام بده:";
  
      // ایجاد دکمه تلگرام
      const telegramBtn = document.createElement('a');
      telegramBtn.href = "https://t.me/aqay_ghost"; // لینک به تلگرام شما
      telegramBtn.textContent = "تلگرامم";
      telegramBtn.className = "telegram-btn";
      telegramBtn.target = "_blank"; // باز کردن در تب جدید
  
      // افزودن پیام و دکمه به quizContainer
      quizContainer.appendChild(message);
      quizContainer.appendChild(rewardText);
      quizContainer.appendChild(telegramBtn);
  
    } else {
      message.textContent = "شکست آدمو می‌سازه! ایشالا دفعه بعد برنده می‌شی 💪";
      quizContainer.appendChild(message);
    }
  }
  

const fullname = document.getElementById('fullname');
const birthdate = document.getElementById('birthdate');
const phone = document.getElementById('phone');
const formError = document.getElementById('formError');

// چک کردن اینکه آیا اسم کاربر قبلاً ثبت شده یا نه
function checkUserParticipation() {
  const userName = localStorage.getItem('userName');
  if (userName) {
    alreadyParticipated.classList.remove('hidden');
    return true;
  }
  return false;
}

function isPersian(text) {
  const persianRegex = /^[\u0600-\u06FF\s]+$/;
  return persianRegex.test(text);
}

function isValidIranianDate(dateStr) {
  const dateRegex = /^(\d{4})[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
  return dateRegex.test(dateStr);
}

function isValidIranianPhone(phoneStr) {
  const phoneRegex = /^09\d{9}$/;
  return phoneRegex.test(phoneStr);
}

registerForm.addEventListener('submit', (e) => {
  e.preventDefault(); // جلوگیری از ارسال فرم پیش‌فرض
  
  let valid = true;  // پرچم برای چک کردن اینکه فرم درست پر شده
  
  // ولیدیشن اطلاعات فرم
  if (!isPersian(fullname.value.trim())) {
    formError.textContent = "نام و نام خانوادگی باید فقط فارسی باشد.";
    formError.style.display = 'block';
    valid = false;
  } else if (!isValidIranianDate(birthdate.value.trim())) {
    formError.textContent = "تاریخ تولد باید به فرمت شمسی مثل ۱۳۷۵/۰۲/۱۰ باشد.";
    formError.style.display = 'block';
    valid = false;
  } else if (!isValidIranianPhone(phone.value.trim())) {
    formError.textContent = "شماره موبایل معتبر نیست. باید با 09 شروع شود و 11 رقم باشد.";
    formError.style.display = 'block';
    valid = false;
  } else {
    formError.style.display = 'none'; // اگر همه شرایط درست بود، ارور رو پنهان میکنیم
  }

  // بررسی اینکه آیا کاربر قبلاً شرکت کرده یا نه
  if (checkUserParticipation()) {
    return; // کاربر قبلاً شرکت کرده است
  }

  // اگر همه شرایط درست بود، وارد بازی می‌شیم
  if (valid) {
    localStorage.setItem('userName', fullname.value.trim()); // ذخیره اسم کاربر
    registerForm.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    document.getElementById('tips').classList.add('hidden'); // نکات مخفی می‌شود
    scoreDisplay.textContent = `امتیاز: ${score}`;
    showQuestion(currentQuestion);
  }
});


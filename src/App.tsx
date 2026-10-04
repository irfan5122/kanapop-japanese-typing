import { useEffect, useMemo, useRef, useState } from "react";
import "./index.css";

type KanaMap = Record<string, string>;

type HiraganaMode =
  | "basic"
  | "dakuten"
  | "handakuten"
  | "all";

const HIRAGANA: KanaMap = {
  // Basic
  a: "あ",
  i: "い",
  u: "う",
  e: "え",
  o: "お",

  ka: "か",
  ki: "き",
  ku: "く",
  ke: "け",
  ko: "こ",

  sa: "さ",
  shi: "し",
  su: "す",
  se: "せ",
  so: "そ",

  ta: "た",
  chi: "ち",
  tsu: "つ",
  te: "て",
  to: "と",

  na: "な",
  ni: "に",
  nu: "ぬ",
  ne: "ね",
  no: "の",

  ha: "は",
  hi: "ひ",
  fu: "ふ",
  he: "へ",
  ho: "ほ",

  ma: "ま",
  mi: "み",
  mu: "む",
  me: "め",
  mo: "も",

  ya: "や",
  yu: "ゆ",
  yo: "よ",

  ra: "ら",
  ri: "り",
  ru: "る",
  re: "れ",
  ro: "ろ",

  wa: "わ",
  wo: "を",

  // Dakuten
  ga: "が",
  gi: "ぎ",
  gu: "ぐ",
  ge: "げ",
  go: "ご",

  za: "ざ",
  ji: "じ",
  zu: "ず",
  ze: "ぜ",
  zo: "ぞ",

  da: "だ",
  di: "ぢ",
  du: "づ",
  de: "で",
  do: "ど",

  ba: "ば",
  bi: "び",
  bu: "ぶ",
  be: "べ",
  bo: "ぼ",

  // Handakuten
  pa: "ぱ",
  pi: "ぴ",
  pu: "ぷ",
  pe: "ぺ",
  po: "ぽ",

  // Combinations
  kya: "きゃ",
  kyu: "きゅ",
  kyo: "きょ",

  sha: "しゃ",
  shu: "しゅ",
  sho: "しょ",

  cha: "ちゃ",
  chu: "ちゅ",
  cho: "ちょ",

  nya: "にゃ",
  nyu: "にゅ",
  nyo: "にょ",

  hya: "ひゃ",
  hyu: "ひゅ",
  hyo: "ひょ",

  mya: "みゃ",
  myu: "みゅ",
  myo: "みょ",

  rya: "りゃ",
  ryu: "りゅ",
  ryo: "りょ",

  gya: "ぎゃ",
  gyu: "ぎゅ",
  gyo: "ぎょ",

  ja: "じゃ",
  ju: "じゅ",
  jo: "じょ",

  bya: "びゃ",
  byu: "びゅ",
  byo: "びょ",

  pya: "ぴゃ",
  pyu: "ぴゅ",
  pyo: "ぴょ",
};

const ALIASES: KanaMap = {
  si: "し",
  ci: "ち",
  ti: "ち",
  tu: "つ",
  hu: "ふ",
  zi: "じ",
  di: "ぢ",
  du: "づ",
};

const ALL_ROMAJI: KanaMap = {
  ...HIRAGANA,
  ...ALIASES,
};

const BASIC_HIRAGANA = [
  "あ",
  "い",
  "う",
  "え",
  "お",

  "か",
  "き",
  "く",
  "け",
  "こ",

  "さ",
  "し",
  "す",
  "せ",
  "そ",

  "た",
  "ち",
  "つ",
  "て",
  "と",

  "な",
  "に",
  "ぬ",
  "ね",
  "の",

  "は",
  "ひ",
  "ふ",
  "へ",
  "ほ",

  "ま",
  "み",
  "む",
  "め",
  "も",

  "や",
  "ゆ",
  "よ",

  "ら",
  "り",
  "る",
  "れ",
  "ろ",

  "わ",
  "を",
];

const DAKUTEN_HIRAGANA = [
  "が",
  "ぎ",
  "ぐ",
  "げ",
  "ご",

  "ざ",
  "じ",
  "ず",
  "ぜ",
  "ぞ",

  "だ",
  "ぢ",
  "づ",
  "で",
  "ど",

  "ば",
  "び",
  "ぶ",
  "べ",
  "ぼ",
];

const HANDAKUTEN_HIRAGANA = [
  "ぱ",
  "ぴ",
  "ぷ",
  "ぺ",
  "ぽ",
];

const COMBINATION_HIRAGANA = [
  "きゃ",
  "きゅ",
  "きょ",

  "しゃ",
  "しゅ",
  "しょ",

  "ちゃ",
  "ちゅ",
  "ちょ",

  "にゃ",
  "にゅ",
  "にょ",

  "ひゃ",
  "ひゅ",
  "ひょ",

  "みゃ",
  "みゅ",
  "みょ",

  "りゃ",
  "りゅ",
  "りょ",

  "ぎゃ",
  "ぎゅ",
  "ぎょ",

  "じゃ",
  "じゅ",
  "じょ",

  "びゃ",
  "びゅ",
  "びょ",

  "ぴゃ",
  "ぴゅ",
  "ぴょ",
];

const BASIC_WORDS = [
  "あい",
  "あお",
  "いえ",
  "うえ",
  "かお",
  "ここ",
  "さけ",
  "すし",
  "たこ",
  "ちち",
  "つき",
  "とけ",
  "なに",
  "ねこ",
  "はな",
  "ひと",
  "ふね",
  "ほし",
  "まめ",
  "みみ",
  "むし",
  "もも",
  "やま",
  "ゆめ",
  "よる",
  "らく",
  "りす",
  "るす",
  "れき",
  "ろく",
  "わに",
];

const DAKUTEN_WORDS = [
  "がく",
  "ぎん",
  "ぐち",
  "ごま",
  "ざる",
  "じか",
  "ずる",
  "ぞう",
  "だれ",
  "でん",
  "どこ",
  "ばら",
  "びん",
  "ぶた",
  "べん",
  "ぼく",
];

const HANDAKUTEN_WORDS = [
  "ぱぱ",
  "ぴあ",
  "ぷり",
  "ぺこ",
  "ぽぽ",
];

const ALL_WORDS = [
  ...BASIC_WORDS,
  ...DAKUTEN_WORDS,
  ...HANDAKUTEN_WORDS,

  "ありがとう",
  "おはよう",
  "こんにちは",
  "さようなら",
  "たまご",
  "ともだち",
  "にほん",
  "にほんご",
  "せんせい",
  "がくせい",
  "おんな",
  "おとこ",
  "くだもの",
  "やさい",
  "すいか",
  "りんご",
  "ねこさん",
];

function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function tokenizeRomaji(text: string): string[] {
  const result: string[] = [];

  let i = 0;

  const keys = Object.keys(ALL_ROMAJI).sort(
    (a, b) => b.length - a.length
  );

  while (i < text.length) {
    /*
     * Double consonant:
     *
     * kk -> っ
     * tt -> っ
     * pp -> っ
     */
    if (
      i + 1 < text.length &&
      text[i] === text[i + 1] &&
      /[bcdfghjklmpqrstvwxyz]/.test(text[i])
    ) {
      result.push("っ");
      i++;
      continue;
    }

    /*
     * Japanese "n"
     *
     * n -> ん
     * nn -> ん
     */
    if (text[i] === "n") {
      const next = text[i + 1];

      if (!next || !/[aeiouy]/.test(next)) {
        result.push("ん");
        i++;
        continue;
      }
    }

    let matched = false;

    for (const key of keys) {
      if (text.startsWith(key, i)) {
        result.push(ALL_ROMAJI[key]);

        i += key.length;

        matched = true;

        break;
      }
    }

    if (!matched) {
      result.push(text[i]);

      i++;
    }
  }

  return result;
}

function romajiToHiragana(text: string): string {
  return tokenizeRomaji(text).join("");
}

function hiraganaToRomaji(text: string): string {
  const reverse = new Map<string, string>();

  /*
   * Prefer standard spellings.
   */
  Object.entries(HIRAGANA).forEach(
    ([romaji, kana]) => {
      if (!reverse.has(kana)) {
        reverse.set(kana, romaji);
      }
    }
  );

  reverse.set("ん", "n");

  let result = "";

  let i = 0;

  while (i < text.length) {
    const pair = text.slice(i, i + 2);

    if (reverse.has(pair)) {
      result += reverse.get(pair);

      i += 2;

      continue;
    }

    const char = text[i];

    result += reverse.get(char) ?? char;

    i++;
  }

  return result;
}

function createQuestion(
  mode: HiraganaMode
): string {
  let pool: string[];

  switch (mode) {
    case "basic":
      pool = BASIC_HIRAGANA;
      break;

    case "dakuten":
      pool = DAKUTEN_HIRAGANA;
      break;

    case "handakuten":
      pool = HANDAKUTEN_HIRAGANA;
      break;

    case "all":
      pool = [
        ...BASIC_HIRAGANA,
        ...DAKUTEN_HIRAGANA,
        ...HANDAKUTEN_HIRAGANA,
        ...COMBINATION_HIRAGANA,
      ];
      break;

    default:
      pool = BASIC_HIRAGANA;
  }

  /*
   * Mostly two-character questions.
   */
  if (
    Math.random() < 0.68 &&
    pool.length >= 2
  ) {
    const first = randomItem(pool);

    let second = randomItem(pool);

    while (
      second === first &&
      pool.length > 1
    ) {
      second = randomItem(pool);
    }

    return first + second;
  }

  /*
   * Occasionally use a real word.
   */
  if (Math.random() < 0.18) {
    let words: string[];

    switch (mode) {
      case "basic":
        words = BASIC_WORDS;
        break;

      case "dakuten":
        words = DAKUTEN_WORDS;
        break;

      case "handakuten":
        words = HANDAKUTEN_WORDS;
        break;

      case "all":
        words = ALL_WORDS;
        break;

      default:
        words = BASIC_WORDS;
    }

    return randomItem(words);
  }

  return randomItem(pool);
}

function playSound(correct: boolean) {
  try {
    const AudioContext =
      window.AudioContext ||
      // @ts-expect-error WebKit browser support
      window.webkitAudioContext;

    if (!AudioContext) {
      return;
    }

    const ctx = new AudioContext();

    const oscillator = ctx.createOscillator();

    const gain = ctx.createGain();

    oscillator.connect(gain);

    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (correct) {
      oscillator.frequency.setValueAtTime(
        520,
        now
      );

      oscillator.frequency.setValueAtTime(
        700,
        now + 0.09
      );

      oscillator.frequency.setValueAtTime(
        900,
        now + 0.18
      );
    } else {
      oscillator.frequency.setValueAtTime(
        230,
        now
      );

      oscillator.frequency.setValueAtTime(
        160,
        now + 0.12
      );
    }

    gain.gain.setValueAtTime(
      0.001,
      now
    );

    gain.gain.exponentialRampToValueAtTime(
      0.15,
      now + 0.02
    );

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      now + 0.3
    );

    oscillator.start(now);

    oscillator.stop(now + 0.32);

    oscillator.onended = () => {
      void ctx.close();
    };
  } catch {
    // Sound is optional.
  }
}

function App() {
  const [mode, setMode] =
    useState<HiraganaMode>("basic");

  const [question, setQuestion] =
    useState(() =>
      createQuestion("basic")
    );

  const [input, setInput] =
    useState("");

  const [result, setResult] =
    useState<
      "idle" | "correct" | "wrong"
    >("idle");

  const [streak, setStreak] =
    useState(0);

  const [correctCount, setCorrectCount] =
    useState(0);

  const [totalCount, setTotalCount] =
    useState(0);

  const [shake, setShake] =
    useState(false);

  const inputRef =
    useRef<HTMLInputElement>(null);

  const converted = useMemo(
    () =>
      romajiToHiragana(
        input.toLowerCase()
      ),
    [input]
  );

  const expectedRomaji = useMemo(
    () =>
      hiraganaToRomaji(question),
    [question]
  );

  const accuracy =
    totalCount === 0
      ? 0
      : Math.round(
          (correctCount /
            totalCount) *
            100
        );

  useEffect(() => {
    inputRef.current?.focus();
  }, [question]);

  function changeMode(
    newMode: HiraganaMode
  ) {
    setMode(newMode);

    setQuestion(
      createQuestion(newMode)
    );

    setInput("");

    setResult("idle");

    setShake(false);

    /*
     * Changing lessons starts a
     * fresh streak.
     */
    setStreak(0);

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }

  function nextQuestion() {
    setQuestion(
      createQuestion(mode)
    );

    setInput("");

    setResult("idle");

    setShake(false);

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }

  function submit() {
    if (!input.trim()) {
      return;
    }

    const correct =
      converted === question;

    setTotalCount(
      (value) => value + 1
    );

    if (correct) {
      setResult("correct");

      setCorrectCount(
        (value) => value + 1
      );

      setStreak(
        (value) => value + 1
      );

      playSound(true);
    } else {
      setResult("wrong");

      setStreak(0);

      setShake(true);

      playSound(false);

      window.setTimeout(() => {
        setShake(false);
      }, 450);
    }
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();

    if (result === "idle") {
      submit();
    } else {
      nextQuestion();
    }
  }

  return (
    <div className="app">
      {/* HEADER */}

      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">
            あ
          </div>

          <div>
            <div className="brand-name">
              KanaPop
            </div>

            <div className="brand-subtitle">
              Japanese typing
            </div>
          </div>
        </div>

        <div className="stats">
          <div className="stat">
            <span className="stat-icon">
              🔥
            </span>

            <strong>
              {streak}
            </strong>
          </div>

          <div className="stat">
            <span className="stat-icon">
              🎯
            </span>

            <strong>
              {accuracy}%
            </strong>
          </div>
        </div>
      </header>

      {/* MAIN */}

      <main className="main">
        {/* LESSON SELECTOR */}

        <div className="lesson-selector">
          <select
            className="language-button"
            value={mode}
            onChange={(event) =>
              changeMode(
                event.target.value as HiraganaMode
              )
            }
            aria-label="Hiragana mode"
          >
            <option value="basic">
              あ Basic Hiragana
            </option>

            <option value="dakuten">
              が Dakuten
            </option>

            <option value="handakuten">
              ぱ Handakuten
            </option>

            <option value="all">
              あ All Hiragana
            </option>
          </select>
        </div>

        {/* LESSON CARD */}

        <section
          className={`lesson-card ${
            shake ? "shake" : ""
          } ${result}`}
        >
          {/* PROGRESS */}

          <div className="progress-row">
            <span>
              {mode === "basic" &&
                "Basic Hiragana"}

              {mode === "dakuten" &&
                "Dakuten"}

              {mode === "handakuten" &&
                "Handakuten"}

              {mode === "all" &&
                "All Hiragana"}{" "}
              practice
            </span>

            <span className="question-count">
              {totalCount + 1}
            </span>
          </div>

          <div className="progress-track">
            <div
              className="progress-value"
              style={{
                width: `${
                  ((totalCount % 10) + 1) *
                  10
                }%`,
              }}
            />
          </div>

          {/* QUESTION */}

          <div className="question-area">
            <div className="small-label">
              TYPE THIS
            </div>

            <div
              key={question}
              className="japanese-question"
            >
              {question}
            </div>

            <div className="hint">
              Type the Japanese using
              romaji
            </div>
          </div>

          {/* INPUT */}

          <div className="typing-area">
            <label htmlFor="romaji-input">
              Your answer
            </label>

            <div className="input-wrapper">
              <input
                ref={inputRef}
                id="romaji-input"
                value={input}
                onChange={(event) => {
                  setInput(
                    event.target.value
                      .toLowerCase()
                      .replace(
                        /[^a-z]/g,
                        ""
                      )
                  );

                  if (
                    result !== "idle"
                  ) {
                    setResult("idle");
                  }
                }}
                onKeyDown={
                  handleKeyDown
                }
                placeholder="Type here..."
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                inputMode="latin"
              />

              {input && (
                <button
                  className="clear-button"
                  type="button"
                  onClick={() =>
                    setInput("")
                  }
                  aria-label="Clear"
                >
                  ×
                </button>
              )}
            </div>

            {/* LIVE JAPANESE */}

            <div className="conversion-preview">
              <span className="preview-label">
                Japanese
              </span>

              <span className="preview-value">
                {converted || "—"}
              </span>
            </div>
          </div>

          {/* CORRECT */}

          {result === "correct" && (
            <div className="feedback correct-feedback">
              <div className="feedback-icon">
                ✓
              </div>

              <div>
                <strong>
                  Great job!
                </strong>

                <span>
                  You typed {question}{" "}
                  correctly.
                </span>
              </div>
            </div>
          )}

          {/* WRONG */}

          {result === "wrong" && (
            <div className="feedback wrong-feedback">
              <div className="feedback-icon">
                !
              </div>

              <div>
                <strong>
                  Not quite!
                </strong>

                <span>
                  Correct answer:{" "}
                  <b>
                    {expectedRomaji}
                  </b>
                </span>
              </div>
            </div>
          )}

          {/* BUTTON */}

          <button
            className={`submit-button ${
              result === "correct"
                ? "success"
                : result === "wrong"
                  ? "retry"
                  : ""
            }`}
            onClick={
              result === "idle"
                ? submit
                : nextQuestion
            }
            type="button"
          >
            {result === "idle"
              ? "CHECK"
              : result === "correct"
                ? "NEXT"
                : "TRY AGAIN"}

            <span>→</span>
          </button>
        </section>

        {/* TIP */}

        <div className="tip">
          <span>💡</span>

          <span>
            Tip: <b>tsu</b> becomes{" "}
            <b>つ</b> as you type.
          </span>
        </div>
      </main>

      {/* FOOTER */}

      <footer>
        <span>あ</span>

        Keep practicing — small
        steps every day.
      </footer>
    </div>
  );
}

export default App;
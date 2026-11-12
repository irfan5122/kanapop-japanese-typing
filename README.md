# KanaPop

A modern Japanese Hiragana typing practice app inspired by the interactive learning experience of Duolingo.

KanaPop helps learners practice Hiragana by displaying Japanese characters and requiring them to type the corresponding pronunciation using Romaji. The conversion happens instantly as the user types.

## Features

- Live Romaji to Hiragana conversion
- Hiragana typing practice
- Basic Hiragana practice mode
- Dakuten practice mode
- Handakuten practice mode
- All Hiragana practice mode
- Randomized questions
- Mostly short two-character questions
- Occasional longer words and combinations
- Instant answer feedback
- Correct and incorrect answer animations
- Streak tracking
- Accuracy tracking
- Keyboard support with Enter to submit
- Mobile-first responsive design
- Touch-friendly interface
- Built-in sound feedback
- Smooth UI animations
- No backend required

## Practice Modes

KanaPop currently provides four Hiragana practice modes.

### Basic Hiragana

Practices the standard Hiragana characters.

Examples:

```text
あ い う え お
か き く け こ
さ し す せ そ
た ち つ て と
```

### Dakuten

Practices Hiragana modified with Dakuten.

Examples:

```text
が ぎ ぐ げ ご
ざ じ ず ぜ ぞ
だ ぢ づ で ど
ば び ぶ べ ぼ
```

### Handakuten

Practices Hiragana modified with Handakuten.

```text
ぱ ぴ ぷ ぺ ぽ
```

### All Hiragana

Combines basic Hiragana, Dakuten, Handakuten, and Hiragana combinations.

Examples:

```text
きゃ きゅ きょ
しゃ しゅ しょ
ちゃ ちゅ ちょ
```

## How It Works

When a Japanese character or word is displayed, the learner types its pronunciation using Romaji.

For example:

```text
Japanese:
つき

User types:
tsuki

Live conversion:
つき
```

The conversion happens directly in the input interface without requiring an external API.

KanaPop also supports common alternative Romaji spellings.

```text
shi / si   → し
chi / ti   → ち
tsu / tu   → つ
fu / hu    → ふ
ji / zi    → じ
```

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- HTML
- Web Audio API

## Project Structure

```text
japanese-typing/
├── public/
├── src/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed.

Check your versions:

```bash
node --version
npm --version
```

### Installation

Clone the repository:

```bash
git clone https://github.com/irfan5122/kanapop-japanese-typing.git
```

Move into the project directory:

```bash
cd kanapop-japanese-typing
```

Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Vite will provide a local development URL, usually:

```text
http://localhost:5173
```

### Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Example

A typical exercise looks like this:

```text
TYPE THIS

つき

Your answer

tsuki

Japanese

つき
```

After submitting:

```text
Correct

Great job!
You typed つき correctly.
```

If the answer is incorrect, KanaPop displays the correct Romaji answer so the learner can try again.

## Design

KanaPop is designed with a mobile-first approach.

The interface focuses on:

- Large Japanese characters
- Clear typing areas
- Touch-friendly controls
- Responsive layouts
- Short practice sessions
- Immediate visual feedback
- Simple navigation
- Minimal distractions

The visual language is inspired by modern language-learning applications while maintaining its own identity.

## Roadmap

Planned improvements include:

- Katakana practice
- Hiragana combinations
- Small っ practice
- Japanese ん rules
- More comprehensive Romaji conversion
- Difficulty levels
- More Japanese vocabulary
- Custom practice sets
- Progress tracking
- XP and leveling system
- Daily goals
- Learning statistics
- Review of incorrectly answered characters
- Keyboard shortcuts
- PWA support
- Offline support
- Mobile app version

## Community Contributions

Suggestions, bug reports, and pull requests are welcome. Feel free to help improve
KanaPop, add features, fix bugs, and share your improvements for noncommercial
purposes.

By submitting a pull request, you confirm that you have the rights to contribute
the submitted work and agree to make that contribution available under the same
license as this project: PolyForm Noncommercial License 1.0.0.

## Use and License

KanaPop is source-available under the
[PolyForm Noncommercial License 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0).

You may use, modify, and share the project for noncommercial purposes under that
license. Commercial use is not permitted without separate prior written
permission from the copyright holder. This includes selling copies or modified
versions, or using the project as part of a commercial offering.

This is a noncommercial source-available project, not an OSI-approved open-source
project: the license restricts commercial use. See [LICENSE](./LICENSE) for the
full license text.

Third-party dependencies, fonts, and assets remain subject to their own licenses
and terms.
## Author

**Ahmed Irfan N.**

GitHub: [irfan5122](https://github.com/irfan5122)

---

KanaPop is a learning project focused on making Japanese character practice more interactive, visual, and enjoyable.

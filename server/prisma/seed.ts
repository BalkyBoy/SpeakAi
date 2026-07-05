import { PrismaClient, Level } from '@prisma/client';

const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// Seed data
// ---------------------------------------------------------------------------

const lessons = [
  // ── AMHARIC ──────────────────────────────────────────────────────────────
  {
    title: 'Your First Words in Amharic',
    description:
      'Dive straight into Amharic with the words you\'ll actually need on day one — hello, thank you, yes, no, and how much. No alphabet required yet, just sounds.',
    language: 'Amharic',
    level: Level.BEGINNER,
    duration: 12,
    rating: 4.7,
    studentCount: 3120,
    isPublished: true,
    categories: ['Greetings', 'Survival Phrases'],
    words: [
      { word: 'ሰላም', phonetic: 'se-lam', difficulty: 'easy', tips: 'Think of "shalom" — they share the same root.', order: 1 },
      { word: 'አመሰግናለሁ', phonetic: 'a-me-se-gna-le-hu', difficulty: 'hard', tips: 'Break it into five small chunks and say them slowly.', order: 2 },
      { word: 'አዎ', phonetic: 'a-wo', difficulty: 'easy', tips: 'Short and punchy — just two syllables.', order: 3 },
      { word: 'አይ', phonetic: 'ay', difficulty: 'easy', tips: 'Sounds almost like the English letter "I".', order: 4 },
      { word: 'ስንት ነው', phonetic: 'sint neh', difficulty: 'medium', tips: 'Useful in every market — ask the price of anything.', order: 5 },
    ],
  },
  {
    title: 'Amharic Numbers & Counting',
    description:
      'Learn to count from 1 to 20 and pick up the numbers for everyday situations — telling the time, haggling at a stall, or catching the right bus.',
    language: 'Amharic',
    level: Level.BEGINNER,
    duration: 15,
    rating: 4.5,
    studentCount: 2740,
    isPublished: true,
    categories: ['Numbers', 'Daily Life'],
    words: [
      { word: 'አንድ', phonetic: 'and', difficulty: 'easy', tips: 'The "d" is soft, almost like a "t" at the end.', order: 1 },
      { word: 'ሁለት', phonetic: 'hu-let', difficulty: 'easy', tips: 'Stress the first syllable.', order: 2 },
      { word: 'ሶስት', phonetic: 'sost', difficulty: 'easy', tips: 'Rhymes with the English word "host" roughly.', order: 3 },
      { word: 'አስር', phonetic: 'a-sir', difficulty: 'medium', tips: 'The "r" is slightly rolled.', order: 4 },
      { word: 'ሃያ', phonetic: 'ha-ya', difficulty: 'medium', tips: 'Two clear syllables — ha then ya.', order: 5 },
    ],
  },

  // ── SWAHILI ──────────────────────────────────────────────────────────────
  {
    title: 'Swahili Greetings Done Right',
    description:
      'Swahili greetings go deeper than a simple hello — the time of day matters, and how you reply shows respect. This lesson walks you through the most common exchanges.',
    language: 'Swahili',
    level: Level.BEGINNER,
    duration: 10,
    rating: 4.9,
    studentCount: 5810,
    isPublished: true,
    categories: ['Greetings', 'Culture'],
    words: [
      { word: 'Habari', phonetic: 'ha-ba-ri', difficulty: 'easy', tips: 'Literally means "news" — you\'re asking how things are going.', order: 1 },
      { word: 'Karibu', phonetic: 'ka-ri-bu', difficulty: 'easy', tips: 'Used for welcome AND you\'re welcome — double duty word.', order: 2 },
      { word: 'Asante', phonetic: 'a-san-te', difficulty: 'easy', tips: 'Clean three syllables, equal stress on each.', order: 3 },
      { word: 'Jambo', phonetic: 'jam-bo', difficulty: 'easy', tips: 'The tourist-friendly greeting — locals use Habari more.', order: 4 },
      { word: 'Shikamoo', phonetic: 'shi-ka-moo', difficulty: 'medium', tips: 'Show respect to elders — they\'ll love you for using this.', order: 5 },
    ],
  },
  {
    title: 'Swahili at the Market',
    description:
      'East African markets are loud, busy, and brilliant. This lesson gives you the vocabulary to shop, negotiate, and make friends at any duka or market stall.',
    language: 'Swahili',
    level: Level.INTERMEDIATE,
    duration: 18,
    rating: 4.6,
    studentCount: 3290,
    isPublished: true,
    categories: ['Shopping', 'Daily Life'],
    words: [
      { word: 'Bei gani', phonetic: 'be-i ga-ni', difficulty: 'medium', tips: '"How much?" — probably the most useful phrase in any market.', order: 1 },
      { word: 'Ghali sana', phonetic: 'gha-li sa-na', difficulty: 'medium', tips: '"Too expensive" — say it with a little shake of the head.', order: 2 },
      { word: 'Punguza', phonetic: 'pun-gu-za', difficulty: 'hard', tips: '"Reduce the price" — the magic word for bargaining.', order: 3 },
      { word: 'Nataka', phonetic: 'na-ta-ka', difficulty: 'easy', tips: '"I want" — straightforward and direct.', order: 4 },
      { word: 'Tafadhali', phonetic: 'ta-fa-dha-li', difficulty: 'hard', tips: 'Please — four syllables, watch that "dh" sound.', order: 5 },
    ],
  },

  // ── YORUBA ───────────────────────────────────────────────────────────────
  {
    title: 'Yoruba Tones: The Basics',
    description:
      'Yoruba is a tonal language, and this lesson breaks down the three tones in a way that actually makes sense. Get the tones right early and everything else gets easier.',
    language: 'Yoruba',
    level: Level.BEGINNER,
    duration: 14,
    rating: 4.8,
    studentCount: 4450,
    isPublished: true,
    categories: ['Pronunciation', 'Foundations'],
    words: [
      { word: 'Ẹ káàárọ̀', phonetic: 'eh kah-ah-ro', difficulty: 'medium', tips: 'Good morning — notice the falling tone on the last syllable.', order: 1 },
      { word: 'Ẹ káàbọ̀', phonetic: 'eh kah-boh', difficulty: 'medium', tips: 'Welcome — the tones drop at the end.', order: 2 },
      { word: 'Ẹ ṣeun', phonetic: 'eh shey-un', difficulty: 'easy', tips: 'Thank you — short and warm.', order: 3 },
      { word: 'Báwo ni', phonetic: 'bah-wo ni', difficulty: 'easy', tips: '"How are you?" — the "ni" is light and unstressed.', order: 4 },
      { word: 'Odàbọ̀', phonetic: 'oh-dah-boh', difficulty: 'medium', tips: 'Goodbye — tone rises then falls.', order: 5 },
    ],
  },
  {
    title: 'Yoruba Family & Relationships',
    description:
      'Family is everything in Yoruba culture. This lesson covers relatives, terms of address, and how to talk about the people closest to you.',
    language: 'Yoruba',
    level: Level.INTERMEDIATE,
    duration: 16,
    rating: 4.5,
    studentCount: 2100,
    isPublished: true,
    categories: ['Family', 'Culture'],
    words: [
      { word: 'Ìyá', phonetic: 'ee-yah', difficulty: 'easy', tips: 'Mother — rising tone on both syllables.', order: 1 },
      { word: 'Bàbá', phonetic: 'bah-bah', difficulty: 'easy', tips: 'Father — low tone throughout.', order: 2 },
      { word: 'Ẹgbọ́n', phonetic: 'eh-gbohn', difficulty: 'hard', tips: 'Older sibling — the "gb" is a unique Yoruba sound, lips and back of throat together.', order: 3 },
      { word: 'Àbúrò', phonetic: 'ah-boo-roh', difficulty: 'medium', tips: 'Younger sibling — tones fall then rise.', order: 4 },
      { word: 'Ọkọ', phonetic: 'oh-koh', difficulty: 'easy', tips: 'Husband — watch the open "ọ" vowel sound.', order: 5 },
    ],
  },

  // ── IGBO ─────────────────────────────────────────────────────────────────
  {
    title: 'Say Hello in Igbo',
    description:
      'Your very first steps into Igbo — a language spoken by over 45 million people. We start with greetings and basic phrases that get you into conversations fast.',
    language: 'Igbo',
    level: Level.BEGINNER,
    duration: 11,
    rating: 4.7,
    studentCount: 3800,
    isPublished: true,
    categories: ['Greetings', 'Survival Phrases'],
    words: [
      { word: 'Nnọọ', phonetic: 'nnoh-oh', difficulty: 'medium', tips: 'Welcome — the double "n" is nasal, push air through your nose.', order: 1 },
      { word: 'Daalu', phonetic: 'dah-ah-loo', difficulty: 'easy', tips: 'Thank you — flows naturally once you relax the vowels.', order: 2 },
      { word: 'Kedu', phonetic: 'ke-du', difficulty: 'easy', tips: '"How are you?" — simple and direct.', order: 3 },
      { word: 'Ọ dị mma', phonetic: 'oh dee mah', difficulty: 'medium', tips: '"I\'m fine" — the open "ọ" sounds like the "o" in "hot".', order: 4 },
      { word: 'Biko', phonetic: 'bi-koh', difficulty: 'easy', tips: 'Please — also used softly to get someone\'s attention.', order: 5 },
    ],
  },
  {
    title: 'Igbo Proverbs & Their Meanings',
    description:
      'Proverbs are the heartbeat of Igbo communication. This advanced lesson unpacks five powerful proverbs, their literal words, and what they really mean in context.',
    language: 'Igbo',
    level: Level.ADVANCED,
    duration: 22,
    rating: 4.9,
    studentCount: 1340,
    isPublished: true,
    categories: ['Culture', 'Advanced Expression'],
    words: [
      { word: 'Onye wetara oji', phonetic: 'on-ye we-ta-ra oh-ji', difficulty: 'hard', tips: '"He who brings kola brings life" — said at the start of gatherings.', order: 1 },
      { word: 'Egbe bere ugo bere', phonetic: 'eg-be be-re oo-go be-re', difficulty: 'hard', tips: '"Let the hawk perch and the eagle perch" — live and let live.', order: 2 },
      { word: 'Oji onye n\'acha', phonetic: 'oh-ji on-ye nach-ah', difficulty: 'hard', tips: 'Context matters — who is doing the cleaning tells the whole story.', order: 3 },
      { word: 'Ihe onye metara ya', phonetic: 'i-he on-ye me-ta-ra ya', difficulty: 'hard', tips: 'What you do follows you — accountability proverb.', order: 4 },
      { word: 'Nwa bu eze n\'ulo ya', phonetic: 'nwa boo eh-ze noo-lo ya', difficulty: 'hard', tips: '"A child is king in their own home" — about belonging.', order: 5 },
    ],
  },

  // ── HAUSA ────────────────────────────────────────────────────────────────
  {
    title: 'Hausa Greetings by Time of Day',
    description:
      'In Hausa culture, greetings change depending on the time and situation. This lesson covers morning, afternoon, and evening greetings plus how to respond correctly.',
    language: 'Hausa',
    level: Level.BEGINNER,
    duration: 13,
    rating: 4.6,
    studentCount: 4200,
    isPublished: true,
    categories: ['Greetings', 'Culture'],
    words: [
      { word: 'Sannu', phonetic: 'san-noo', difficulty: 'easy', tips: 'The everyday hello — works anytime, anywhere.', order: 1 },
      { word: 'Ina kwana', phonetic: 'ee-nah kwa-nah', difficulty: 'medium', tips: 'Good morning — literally "how was the night?"', order: 2 },
      { word: 'Ina wuni', phonetic: 'ee-nah woo-ni', difficulty: 'medium', tips: 'Good afternoon — now you\'re asking about the day.', order: 3 },
      { word: 'Ina yini', phonetic: 'ee-nah yee-ni', difficulty: 'medium', tips: 'Good evening — the pattern is easy once you spot it.', order: 4 },
      { word: 'Na gode', phonetic: 'nah go-de', difficulty: 'easy', tips: 'Thank you — simple and warm.', order: 5 },
    ],
  },
  {
    title: 'Hausa Numbers & Money Talk',
    description:
      'Numbers in Hausa are surprisingly logical once you know the pattern. We cover 1–10 and the phrases you need to buy, sell, and count change.',
    language: 'Hausa',
    level: Level.BEGINNER,
    duration: 14,
    rating: 4.4,
    studentCount: 2890,
    isPublished: true,
    categories: ['Numbers', 'Daily Life'],
    words: [
      { word: 'Ɗaya', phonetic: 'dya-yah', difficulty: 'medium', tips: 'One — the "ɗ" is an implosive, pull the air inward slightly.', order: 1 },
      { word: 'Biyu', phonetic: 'bi-yoo', difficulty: 'easy', tips: 'Two — short and clean.', order: 2 },
      { word: 'Uku', phonetic: 'oo-koo', difficulty: 'easy', tips: 'Three — stress the first syllable.', order: 3 },
      { word: 'Goma', phonetic: 'go-mah', difficulty: 'easy', tips: 'Ten — the base for building bigger numbers.', order: 4 },
      { word: 'Nawa ne', phonetic: 'na-wah ne', difficulty: 'medium', tips: '"How much is it?" — your essential shopping question.', order: 5 },
    ],
  },

  // ── SOMALI ───────────────────────────────────────────────────────────────
  {
    title: 'Somali Basics: Greetings & Introductions',
    description:
      'Somali is a beautifully rhythmic language. Start here with the phrases people use when they first meet — including the Islamic greetings that are central to daily life.',
    language: 'Somali',
    level: Level.BEGINNER,
    duration: 12,
    rating: 4.7,
    studentCount: 3560,
    isPublished: true,
    categories: ['Greetings', 'Culture'],
    words: [
      { word: 'As-salāmu ʿalaykum', phonetic: 'as-sa-laa-mu a-lay-kum', difficulty: 'hard', tips: 'The standard greeting — even a rough attempt gets a warm response.', order: 1 },
      { word: 'Wa alaykum salaam', phonetic: 'wa a-lay-kum sa-laam', difficulty: 'hard', tips: 'The reply — say it confidently and you\'ll fit right in.', order: 2 },
      { word: 'Magacaygu waa', phonetic: 'ma-ga-cay-goo wah', difficulty: 'hard', tips: '"My name is" — the long phrase is worth learning in full.', order: 3 },
      { word: 'Mahadsanid', phonetic: 'ma-had-sa-nid', difficulty: 'medium', tips: 'Thank you — a bit of a mouthful at first, but it flows quickly.', order: 4 },
      { word: 'Haa', phonetic: 'haah', difficulty: 'easy', tips: 'Yes — drawn out slightly, not clipped like English "ha".', order: 5 },
    ],
  },

  // ── OROMO ────────────────────────────────────────────────────────────────
  {
    title: 'Oromo Pronunciation & Vowel Lengths',
    description:
      'Oromo has short and long vowel sounds that actually change word meaning — this lesson trains your ear to hear the difference and your mouth to produce it.',
    language: 'Oromo',
    level: Level.BEGINNER,
    duration: 16,
    rating: 4.5,
    studentCount: 2430,
    isPublished: true,
    categories: ['Pronunciation', 'Foundations'],
    words: [
      { word: 'Akkam', phonetic: 'ak-kam', difficulty: 'easy', tips: '"How are you?" — a great conversation opener.', order: 1 },
      { word: 'Galatoomaa', phonetic: 'ga-la-too-mah', difficulty: 'medium', tips: 'Thank you — note the long "oo" vowel in the middle.', order: 2 },
      { word: 'Nagaa', phonetic: 'na-gah', difficulty: 'easy', tips: 'Peace/hello — the double "a" is held a beat longer.', order: 3 },
      { word: 'Eyyee', phonetic: 'ey-yeh', difficulty: 'easy', tips: 'Yes — stretch the first vowel.', order: 4 },
      { word: 'Maqaan koo', phonetic: 'ma-qan koh', difficulty: 'medium', tips: '"My name is" — the "q" is a back-of-throat click.', order: 5 },
    ],
  },

  // ── TIGRINYA ─────────────────────────────────────────────────────────────
  {
    title: 'Tigrinya: First Conversations',
    description:
      'Spoken in Eritrea and northern Ethiopia, Tigrinya uses the Ge\'ez script. This lesson focuses on spoken phrases while introducing the script for the curious.',
    language: 'Tigrinya',
    level: Level.BEGINNER,
    duration: 14,
    rating: 4.6,
    studentCount: 1980,
    isPublished: true,
    categories: ['Greetings', 'Foundations'],
    words: [
      { word: 'ሰላም', phonetic: 'se-lam', difficulty: 'easy', tips: 'Hello/peace — shared with Amharic and Arabic roots.', order: 1 },
      { word: 'ከመይ ኣለኻ', phonetic: 'ke-mey a-le-kha', difficulty: 'hard', tips: '"How are you?" (to a male) — the "kh" is a soft, breathy sound.', order: 2 },
      { word: 'የቐንየለይ', phonetic: 'ye-qen-ye-ley', difficulty: 'hard', tips: 'Thank you — seven letters that flow once you know them.', order: 3 },
      { word: 'እወ', phonetic: 'i-we', difficulty: 'easy', tips: 'Yes — quick and light.', order: 4 },
      { word: 'ኣይፋሉን', phonetic: 'ay-fa-lun', difficulty: 'medium', tips: 'No — clear and direct, no ambiguity.', order: 5 },
    ],
  },

  // ── ZULU ─────────────────────────────────────────────────────────────────
  {
    title: 'Zulu Click Sounds: A Starter Guide',
    description:
      'Zulu\'s click consonants are one of the most fascinating sounds in any language. This lesson demystifies the three main clicks and gives you real words to practise them.',
    language: 'Zulu',
    level: Level.BEGINNER,
    duration: 20,
    rating: 4.9,
    studentCount: 6120,
    isPublished: true,
    categories: ['Pronunciation', 'Foundations'],
    words: [
      { word: 'Sawubona', phonetic: 'sa-woo-bo-na', difficulty: 'easy', tips: '"I see you" — the Zulu way of saying hello. No click here, great warm-up.', order: 1 },
      { word: 'Ngikhona', phonetic: 'ngi-kho-na', difficulty: 'medium', tips: '"I am here" — the reply to sawubona. The "kh" is breathy.', order: 2 },
      { word: 'Inkosi', phonetic: 'in-ko-si', difficulty: 'medium', tips: 'Chief/king — also used respectfully like "sir" or "boss".', order: 3 },
      { word: 'Ngiyabonga', phonetic: 'ngi-ya-bo-nga', difficulty: 'medium', tips: 'Thank you — the "ng" at the start is nasal, like "singing".', order: 4 },
      { word: 'Uxolo', phonetic: 'oo-kso-lo', difficulty: 'hard', tips: 'Sorry/excuse me — the "x" is a lateral click made on the side of the mouth.', order: 5 },
    ],
  },

  // ── XHOSA ────────────────────────────────────────────────────────────────
  {
    title: 'Xhosa Clicks in Context',
    description:
      'Xhosa has three distinct click sounds, and this lesson puts them inside real words so you\'re practising pronunciation AND vocabulary at the same time.',
    language: 'Xhosa',
    level: Level.INTERMEDIATE,
    duration: 18,
    rating: 4.8,
    studentCount: 3410,
    isPublished: true,
    categories: ['Pronunciation', 'Daily Life'],
    words: [
      { word: 'Molo', phonetic: 'mo-lo', difficulty: 'easy', tips: 'Hello (to one person) — no clicks, perfect entry point.', order: 1 },
      { word: 'Molweni', phonetic: 'mol-we-ni', difficulty: 'easy', tips: 'Hello (to a group) — just add "-ni" to molo.', order: 2 },
      { word: 'Enkosi', phonetic: 'en-ko-si', difficulty: 'medium', tips: 'Thank you — similar to the Zulu word for chief, different meaning here.', order: 3 },
      { word: 'Uxolo', phonetic: 'oo-kso-lo', difficulty: 'hard', tips: 'Sorry — that lateral click "x" takes real practice. Slow down.', order: 4 },
      { word: 'Ndiyakuthanda', phonetic: 'ndi-ya-koo-than-da', difficulty: 'hard', tips: 'I love you — long but worth every syllable.', order: 5 },
    ],
  },

  // ── AFRIKAANS ────────────────────────────────────────────────────────────
  {
    title: 'Afrikaans for Absolute Beginners',
    description:
      'If you speak any English, Dutch, or German you\'ll pick up Afrikaans fast. This lesson shows you why — and builds your first 20 words.',
    language: 'Afrikaans',
    level: Level.BEGINNER,
    duration: 10,
    rating: 4.5,
    studentCount: 4780,
    isPublished: true,
    categories: ['Greetings', 'Foundations'],
    words: [
      { word: 'Hallo', phonetic: 'ha-loh', difficulty: 'easy', tips: 'Exactly like the English "hello" — easy win.', order: 1 },
      { word: 'Dankie', phonetic: 'dank-i', difficulty: 'easy', tips: 'Thank you — similar to the Dutch "dankje".', order: 2 },
      { word: 'Asseblief', phonetic: 'a-se-bleef', difficulty: 'medium', tips: 'Please — three syllables, stress on the last.', order: 3 },
      { word: 'Totsiens', phonetic: 'tot-seens', difficulty: 'medium', tips: 'Goodbye — literally "till we see each other".', order: 4 },
      { word: 'Hoe gaan dit', phonetic: 'hoo khaan dit', difficulty: 'medium', tips: '"How are you?" — the "g" is a guttural, back-of-throat sound.', order: 5 },
    ],
  },
  {
    title: 'Afrikaans: Describing People & Things',
    description:
      'Adjectives in Afrikaans often don\'t change form much — good news for learners. This lesson covers the most useful describing words with real sentence examples.',
    language: 'Afrikaans',
    level: Level.INTERMEDIATE,
    duration: 15,
    rating: 4.4,
    studentCount: 2210,
    isPublished: true,
    categories: ['Vocabulary', 'Grammar'],
    words: [
      { word: 'Groot', phonetic: 'khroht', difficulty: 'easy', tips: 'Big — same root as English "great".', order: 1 },
      { word: 'Klein', phonetic: 'klayn', difficulty: 'easy', tips: 'Small — sounds like the English name "Clyne".', order: 2 },
      { word: 'Mooi', phonetic: 'moy', difficulty: 'easy', tips: 'Beautiful/nice — one of the most used words in Afrikaans.', order: 3 },
      { word: 'Vinnig', phonetic: 'fi-nikh', difficulty: 'medium', tips: 'Fast — the "g" at the end is guttural, not silent.', order: 4 },
      { word: 'Gevaarlik', phonetic: 'khe-faar-lik', difficulty: 'hard', tips: 'Dangerous — related to "Gefahr" in German.', order: 5 },
    ],
  },

  // ── SESOTHO ──────────────────────────────────────────────────────────────
  {
    title: 'Sesotho Greetings & Respect',
    description:
      'Greeting someone properly in Sesotho shows you understand the culture. This lesson covers how to greet by age group and time of day — little details that go a long way.',
    language: 'Sesotho',
    level: Level.BEGINNER,
    duration: 12,
    rating: 4.6,
    studentCount: 2670,
    isPublished: true,
    categories: ['Greetings', 'Culture'],
    words: [
      { word: 'Dumela', phonetic: 'doo-me-la', difficulty: 'easy', tips: 'Hello (to one person) — warm and open, stress the middle syllable.', order: 1 },
      { word: 'Dumelang', phonetic: 'doo-me-lang', difficulty: 'easy', tips: 'Hello (to a group) — add "-ng" and you\'ve got the plural.', order: 2 },
      { word: 'Kea leboha', phonetic: 'ke-ah le-bo-ha', difficulty: 'medium', tips: 'Thank you — four syllables, roll smoothly through them.', order: 3 },
      { word: 'O kae', phonetic: 'oh ka-e', difficulty: 'easy', tips: '"Where are you?" / "How are you?" — used both ways.', order: 4 },
      { word: 'Ke teng', phonetic: 'ke teng', difficulty: 'easy', tips: '"I\'m here/fine" — the standard friendly reply.', order: 5 },
    ],
  },

  // ── SETSWANA ─────────────────────────────────────────────────────────────
  {
    title: 'Setswana: Hello & The Basics',
    description:
      'Setswana is the national language of Botswana and widely spoken in South Africa. Start with greetings, short phrases, and the polite patterns that make a great first impression.',
    language: 'Setswana',
    level: Level.BEGINNER,
    duration: 11,
    rating: 4.5,
    studentCount: 2340,
    isPublished: true,
    categories: ['Greetings', 'Survival Phrases'],
    words: [
      { word: 'Dumelang', phonetic: 'doo-me-lang', difficulty: 'easy', tips: 'Hello to a group — very close to Sesotho, easy crossover.', order: 1 },
      { word: 'Ke a leboga', phonetic: 'ke ah le-bo-gah', difficulty: 'medium', tips: 'Thank you — similar root to Sesotho, slightly different form.', order: 2 },
      { word: 'Jang', phonetic: 'yang', difficulty: 'easy', tips: '"How?" — often tagged onto greetings.', order: 3 },
      { word: 'Ke tshela sentle', phonetic: 'ke-tshe-la sen-tle', difficulty: 'hard', tips: '"I\'m doing well" — your reply to "how are you?".', order: 4 },
      { word: 'Sala sentle', phonetic: 'sa-la sen-tle', difficulty: 'medium', tips: 'Goodbye — literally "stay well".', order: 5 },
    ],
  },

  // ── SHONA ────────────────────────────────────────────────────────────────
  {
    title: 'Shona for Visitors to Zimbabwe',
    description:
      'Even a few words of Shona will get you huge smiles in Zimbabwe. This lesson covers tourist-friendly phrases plus a few surprises that go beyond the guidebook.',
    language: 'Shona',
    level: Level.BEGINNER,
    duration: 13,
    rating: 4.7,
    studentCount: 2980,
    isPublished: true,
    categories: ['Greetings', 'Travel'],
    words: [
      { word: 'Mhoro', phonetic: 'mhoh-ro', difficulty: 'medium', tips: 'Hello — the "mh" is a voiced bilabial sound, lips together then release.', order: 1 },
      { word: 'Maswera sei', phonetic: 'ma-swe-ra sey', difficulty: 'medium', tips: '"How has your day been?" — the afternoon greeting.', order: 2 },
      { word: 'Ndatenda', phonetic: 'nda-ten-da', difficulty: 'medium', tips: 'Thank you — the "nd" cluster is slightly nasal.', order: 3 },
      { word: 'Hongu', phonetic: 'hon-goo', difficulty: 'easy', tips: 'Yes — short and affirmative.', order: 4 },
      { word: 'Chisarai', phonetic: 'chi-sa-ray', difficulty: 'hard', tips: 'Goodbye (stay well) — said to the person staying behind.', order: 5 },
    ],
  },

  // ── NYANJA ───────────────────────────────────────────────────────────────
  {
    title: 'Nyanja: Language of Zambia & Malawi',
    description:
      'Nyanja (also called Chewa) connects millions of people across Zambia, Malawi, and Mozambique. This lesson gives you the phrases to get started in any of those countries.',
    language: 'Nyanja',
    level: Level.BEGINNER,
    duration: 12,
    rating: 4.4,
    studentCount: 2050,
    isPublished: true,
    categories: ['Greetings', 'Survival Phrases'],
    words: [
      { word: 'Moni', phonetic: 'moh-ni', difficulty: 'easy', tips: 'Hello — clean and simple, works any time of day.', order: 1 },
      { word: 'Zikomo', phonetic: 'zi-ko-mo', difficulty: 'easy', tips: 'Thank you — one of the most important words you\'ll learn.', order: 2 },
      { word: 'Muli bwanji', phonetic: 'moo-li bwahn-ji', difficulty: 'medium', tips: '"How are you?" — the "bw" cluster is a quick, rounded sound.', order: 3 },
      { word: 'Ndili bwino', phonetic: 'ndi-li bwee-no', difficulty: 'medium', tips: '"I\'m fine" — "bwino" means good/well, a very useful adjective.', order: 4 },
      { word: 'Pepani', phonetic: 'pe-pa-ni', difficulty: 'easy', tips: 'Sorry/excuse me — the polite catch-all apology.', order: 5 },
    ],
  },

  // ── LUGANDA ──────────────────────────────────────────────────────────────
  {
    title: 'Luganda: Uganda\'s Heart Language',
    description:
      'Luganda is the most widely spoken Bantu language in Uganda. This lesson covers essential greetings and shows you the respectful forms that Ugandans use with guests.',
    language: 'Luganda',
    level: Level.BEGINNER,
    duration: 14,
    rating: 4.8,
    studentCount: 3340,
    isPublished: true,
    categories: ['Greetings', 'Culture'],
    words: [
      { word: 'Oli otya', phonetic: 'oh-li oh-tya', difficulty: 'medium', tips: '"How are you?" — the standard casual greeting.', order: 1 },
      { word: 'Bulungi', phonetic: 'boo-lun-gi', difficulty: 'medium', tips: '"Fine/well" — your reply. The "ng" is nasal like "singing".', order: 2 },
      { word: 'Webale', phonetic: 'we-ba-le', difficulty: 'easy', tips: 'Thank you — short form, very commonly used.', order: 3 },
      { word: 'Ssebo', phonetic: 'sse-boh', difficulty: 'medium', tips: 'Sir — the double "ss" gives it a slightly hissed start.', order: 4 },
      { word: 'Nnyabo', phonetic: 'nnya-boh', difficulty: 'medium', tips: 'Ma\'am — the nasal "nn" start is key to the correct pronunciation.', order: 5 },
    ],
  },

  // ── KINYARWANDA ──────────────────────────────────────────────────────────
  {
    title: 'Kinyarwanda: Speak with Rwandans',
    description:
      'Rwanda is one of Africa\'s fastest-growing economies and tourism destinations. A little Kinyarwanda goes a very long way — start here.',
    language: 'Kinyarwanda',
    level: Level.BEGINNER,
    duration: 13,
    rating: 4.7,
    studentCount: 2870,
    isPublished: true,
    categories: ['Greetings', 'Travel'],
    words: [
      { word: 'Muraho', phonetic: 'moo-ra-ho', difficulty: 'easy', tips: 'Hello (to a group or formal) — the polite standard greeting.', order: 1 },
      { word: 'Amakuru', phonetic: 'a-ma-koo-roo', difficulty: 'medium', tips: '"How are you?" — literally asks about your news.', order: 2 },
      { word: 'Ni meza', phonetic: 'ni me-za', difficulty: 'easy', tips: '"Things are good" — the natural reply to amakuru.', order: 3 },
      { word: 'Murakoze', phonetic: 'moo-ra-ko-ze', difficulty: 'medium', tips: 'Thank you — five clean syllables, stress on the second.', order: 4 },
      { word: 'Murakaza neza', phonetic: 'moo-ra-ka-za ne-za', difficulty: 'hard', tips: 'Welcome — a warm phrase for guests, used formally.', order: 5 },
    ],
  },

  // ── MALAGASY ─────────────────────────────────────────────────────────────
  {
    title: 'Malagasy: The Island Language',
    description:
      'Malagasy is unlike any other African language — it\'s Austronesian, closer to languages spoken in Borneo than to Swahili. This lesson introduces that uniqueness while keeping things practical.',
    language: 'Malagasy',
    level: Level.BEGINNER,
    duration: 15,
    rating: 4.6,
    studentCount: 1890,
    isPublished: true,
    categories: ['Greetings', 'Foundations'],
    words: [
      { word: 'Manao ahoana', phonetic: 'ma-nao a-hoo-na', difficulty: 'medium', tips: '"How are you?" — the formal greeting, great for first meetings.', order: 1 },
      { word: 'Salama', phonetic: 'sa-la-ma', difficulty: 'easy', tips: 'Hi/hello — the casual version, widely used among friends.', order: 2 },
      { word: 'Misaotra', phonetic: 'mi-sow-tra', difficulty: 'medium', tips: 'Thank you — the "ow" sounds like the "ow" in "cow".', order: 3 },
      { word: 'Eny', phonetic: 'en-ee', difficulty: 'easy', tips: 'Yes — short and clear.', order: 4 },
      { word: 'Tsia', phonetic: 'tsee-ah', difficulty: 'medium', tips: 'No — the "ts" is an affricate, like "tsar".', order: 5 },
    ],
  },

  // ── WOLOF ────────────────────────────────────────────────────────────────
  {
    title: 'Wolof Street Phrases: Senegal & Gambia',
    description:
      'Wolof is the language of the streets in Dakar and Banjul. It\'s energetic, expressive, and once you start speaking it, people absolutely love it.',
    language: 'Wolof',
    level: Level.BEGINNER,
    duration: 13,
    rating: 4.8,
    studentCount: 3120,
    isPublished: true,
    categories: ['Greetings', 'Culture'],
    words: [
      { word: 'Na nga def', phonetic: 'na nga def', difficulty: 'medium', tips: '"How are you?" — the most common opener in Dakar.', order: 1 },
      { word: 'Maangi fi', phonetic: 'maan-gi fi', difficulty: 'medium', tips: '"I\'m here/I\'m fine" — the laid-back reply.', order: 2 },
      { word: 'Jërejëf', phonetic: 'je-re-jef', difficulty: 'hard', tips: 'Thank you — the double "ë" is a neutral schwa sound.', order: 3 },
      { word: 'Waaw', phonetic: 'waow', difficulty: 'easy', tips: 'Yes — sounds almost like "wow" in English.', order: 4 },
      { word: 'Deedeet', phonetic: 'deh-deht', difficulty: 'medium', tips: 'No — repeated syllable makes it emphatic and clear.', order: 5 },
    ],
  },
  {
    title: 'Wolof Colours & Descriptions',
    description:
      'Describe the world around you in Wolof. This lesson covers colours and common adjectives used in everyday conversation across Senegal.',
    language: 'Wolof',
    level: Level.INTERMEDIATE,
    duration: 17,
    rating: 4.5,
    studentCount: 1560,
    isPublished: true,
    categories: ['Vocabulary', 'Daily Life'],
    words: [
      { word: 'Weex', phonetic: 'wehks', difficulty: 'easy', tips: 'White — short and crisp.', order: 1 },
      { word: 'Ñuul', phonetic: 'nyool', difficulty: 'medium', tips: 'Black — the "ñ" is a palatal nasal like Spanish "ñ".', order: 2 },
      { word: 'Wudd', phonetic: 'wood', difficulty: 'easy', tips: 'Red — sounds exactly like "wood" in English.', order: 3 },
      { word: 'Jàpp', phonetic: 'jahp', difficulty: 'medium', tips: 'Catch/grab — used to describe something eye-catching.', order: 4 },
      { word: 'Baax na', phonetic: 'baakh na', difficulty: 'medium', tips: '"It\'s good" — your go-to expression of approval.', order: 5 },
    ],
  },

  // ── AKAN ─────────────────────────────────────────────────────────────────
  {
    title: 'Akan (Twi): Greetings Every Ghanaian Knows',
    description:
      'Twi is the most spoken dialect of Akan and you\'ll hear it constantly in Ghana. This lesson starts with the phrases everyone uses — from taxi drivers to market sellers.',
    language: 'Akan',
    level: Level.BEGINNER,
    duration: 12,
    rating: 4.9,
    studentCount: 5430,
    isPublished: true,
    categories: ['Greetings', 'Culture'],
    words: [
      { word: 'Akwaaba', phonetic: 'a-kwah-bah', difficulty: 'easy', tips: 'Welcome — you\'ll see this word everywhere in Ghana.', order: 1 },
      { word: 'Ete sen', phonetic: 'e-te sen', difficulty: 'easy', tips: '"How are you?" — the casual daily opener.', order: 2 },
      { word: 'Medaase', phonetic: 'me-dah-se', difficulty: 'medium', tips: 'Thank you — stress on the first syllable.', order: 3 },
      { word: 'Yoo', phonetic: 'yoh', difficulty: 'easy', tips: 'OK/fine — super versatile, used in agreement and as "alright".', order: 4 },
      { word: 'Mema wo akye', phonetic: 'me-mah woh ah-che', difficulty: 'hard', tips: 'Good morning — the full formal version worth learning.', order: 5 },
    ],
  },
  {
    title: 'Akan (Twi): Food, Markets & Everyday Life',
    description:
      'Ghana\'s food culture is rich and social. This lesson builds the vocabulary to navigate markets, order food, and have real conversations about daily life.',
    language: 'Akan',
    level: Level.INTERMEDIATE,
    duration: 19,
    rating: 4.7,
    studentCount: 2890,
    isPublished: true,
    categories: ['Food', 'Daily Life'],
    words: [
      { word: 'Aduan', phonetic: 'a-doo-an', difficulty: 'medium', tips: 'Food — the basic noun you\'ll combine with everything else.', order: 1 },
      { word: 'Me pere aduan', phonetic: 'me pe-re a-doo-an', difficulty: 'hard', tips: '"I want food" — essential when you\'re hungry.', order: 2 },
      { word: 'Bofroto', phonetic: 'bo-fro-toh', difficulty: 'medium', tips: 'Fried plantain — a beloved street food, and the word sounds as good as it tastes.', order: 3 },
      { word: 'Wo ho te sen', phonetic: 'woh hoh te sen', difficulty: 'hard', tips: '"How are you feeling?" — more personal than the casual greeting.', order: 4 },
      { word: 'Nipa pa', phonetic: 'ni-pah pah', difficulty: 'medium', tips: 'Good person — a warm compliment anyone\'ll appreciate.', order: 5 },
    ],
  },
];

// ---------------------------------------------------------------------------
// Runner
// ---------------------------------------------------------------------------

async function main() {
  console.log('Seeding lessons…');

  // Collect every unique category name across all lessons
  const allCategoryNames = [...new Set(lessons.flatMap((l) => l.categories))];

  // Upsert categories so re-running the seed is safe
  for (const name of allCategoryNames) {
    await prisma.category.upsert({
      where: { slug: name.toLowerCase().replace(/\s+/g, '-') },
      update: {},
      create: {
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
      },
    });
  }

  const categoryMap = new Map(
    (await prisma.category.findMany()).map((c) => [c.name, c.id]),
  );

  for (const lesson of lessons) {
    const { categories, words, ...lessonData } = lesson;

    const created = await prisma.lesson.create({
      data: {
        ...lessonData,
        words: {
          create: words.map((w) => ({
            word: w.word,
            phonetic: w.phonetic,
            difficulty: w.difficulty,
            tips: w.tips,
            order: w.order,
          })),
        },
        categories: {
          create: categories.map((name) => ({
            category: { connect: { id: categoryMap.get(name)! } },
          })),
        },
      },
    });

    console.log(`  ✓ ${created.language} — "${created.title}"`);
  }

  console.log(`\nDone. Seeded ${lessons.length} lessons.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

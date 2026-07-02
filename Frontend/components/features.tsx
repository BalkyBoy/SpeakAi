const FEATURES = [
  {
    icon: "🎵",
    title: "Learn through music",
    desc: "Discover vocabulary and expressions directly from songs. Every lyric becomes a lesson with cultural weight behind it.",
    delay: "",
  },
  {
    icon: "💬",
    title: "Real conversations",
    desc: "Understand how people actually speak — slang, idioms, and everyday expressions beyond what a textbook covers.",
    delay: "d1",
  },
  {
    icon: "🎙️",
    title: "Podcasts & stories",
    desc: "Learn naturally through authentic African podcasts, folktales, and oral storytelling traditions.",
    delay: "d2",
  },
  {
    icon: "🌍",
    title: "Cultural context",
    desc: "Go beyond translation. Understand the meaning, history, and weight behind every phrase.",
    delay: "",
  },
  {
    icon: "📚",
    title: "Smart vocabulary",
    desc: "Words and phrases are saved automatically as you learn, building your personal lexicon over time.",
    delay: "d1",
  },
  {
    icon: "🤖",
    title: "AI language tutor",
    desc: "Ask questions, get instant explanations, and practice conversation with an AI tuned for African languages.",
    delay: "d2",
  },
];

export default function Features() {
  return (
    <section className="section" id="features">
      <div className="container">
        <div className="eyebrow">How it works</div>
        <h2 className="section-heading">
          Learn through content
          <br />
          you already <em>love</em>
        </h2>
        <p className="section-body">
          Traditional apps teach isolated words. Speak teaches through music,
          storytelling, podcasts, and real cultural experiences.
        </p>
        <div className="feature-grid">
          {FEATURES.map((f) => (
            <div className={`feat-card reveal ${f.delay}`} key={f.title}>
              <div className="feat-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
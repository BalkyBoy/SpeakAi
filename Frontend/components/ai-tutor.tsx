const TUTOR_CARDS = [
  {
    icon: "🎤",
    title: "Speech recognition",
    desc: "Pronunciation feedback tuned for tonal and click languages.",
    delay: "",
  },
  {
    icon: "💬",
    title: "Conversational practice",
    desc: "Talk naturally with AI in your target language at any time.",
    delay: "d1",
  },
  {
    icon: "🎯",
    title: "Adaptive lessons",
    desc: "Lessons that evolve based on your pace, mistakes, and goals.",
    delay: "d2",
  },
  {
    icon: "⚡",
    title: "Smart corrections",
    desc: "Learn why something is wrong, not just that it is wrong.",
    delay: "",
  },
  {
    icon: "📈",
    title: "Progress tracking",
    desc: "Visual growth across vocabulary, grammar, and fluency.",
    delay: "d1",
  },
  {
    icon: "🏆",
    title: "Achievements",
    desc: "Milestones and streaks that make learning feel rewarding.",
    delay: "d2",
  },
];

export default function AiTutor() {
  return (
    <section className="section">
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto" }}>
          <div className="eyebrow" style={{ justifyContent: "center" }}>
            AI learning
          </div>
          <h2 className="section-heading">
            Your personal African
            <br />
            language <em>tutor</em>
          </h2>
          <p
            className="section-body"
            style={{ margin: "0 auto", textAlign: "center" }}
          >
            Practice speaking, improve pronunciation, and receive instant
            feedback from AI designed for African languages.
          </p>
        </div>
        <div className="tutor-grid">
          {TUTOR_CARDS.map((c) => (
            <div className={`tutor-card reveal ${c.delay}`} key={c.title}>
              <div className="t-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
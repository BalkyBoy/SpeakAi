const STEPS = [
  { num: 1, title: "Upload audio or paste a recording link", desc: "Drop a song, voice note, podcast clip, or paste a YouTube URL.", delay: "" },
  { num: 2, title: "AI identifies the language", desc: "Recognises over 30 African languages with high accuracy.", delay: "d1" },
  { num: 3, title: "Generate transcription and lyrics", desc: "Full text output with timestamps and speaker identification.", delay: "d2" },
  { num: 4, title: "Translate into your chosen language", desc: "Side-by-side original and translated text.", delay: "" },
  { num: 5, title: "Explore meanings and cultural context", desc: "Deep explanations of idioms, proverbs, and references.", delay: "d1" },
  { num: 6, title: "Save words and keep learning", desc: "One tap adds vocabulary to your personal flashcard deck.", delay: "d2" },
];

export default function HowItWorks() {
  return (
    <section className="section">
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "start",
          }}
        >
          <div>
            <div className="eyebrow">Process</div>
            <h2 className="section-heading">
              From audio to understanding
              <br />
              in <em>minutes</em>
            </h2>
            <div className="timeline">
              {STEPS.map((s) => (
                <div className={`step reveal ${s.delay}`} key={s.num}>
                  <div className="step-num">{s.num}</div>
                  <div className="step-text">
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="status-card reveal">
              <div className="card-section-label" style={{ marginBottom: "16px" }}>
                🔄 Processing your file
              </div>
              <div className="status-item status-done">
                <span className="status-icon">✅</span> Audio uploaded successfully
              </div>
              <div className="status-item status-done">
                <span className="status-icon">✅</span> Language detected — Igbo
              </div>
              <div className="status-item status-done">
                <span className="status-icon">✅</span> Transcript generated (47 lines)
              </div>
              <div className="status-item status-doing">
                <span className="status-icon">⏳</span> Translating to English…
              </div>
              <div className="status-item status-wait">
                <span className="status-icon">◻</span> Cultural analysis pending
              </div>
              <div className="status-item status-wait">
                <span className="status-icon">◻</span> Vocabulary extraction pending
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
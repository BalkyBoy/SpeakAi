export default function AltFeatures() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="eyebrow">Feature showcase</div>
        <h2 className="section-heading" style={{ marginBottom: "72px" }}>
          Built for every part
          <br />
          of the <em>journey</em>
        </h2>

        {/* Language detection */}
        <div className="alt-section">
          <div className="split reveal">
            <div className="alt-visual top-denim">
              <div className="card-section-label" style={{ marginBottom: "12px" }}>
                Language detected
              </div>
              <div className="det-flags">
                <span className="det-pill on">Swahili</span>
                <span className="det-pill off">Yoruba</span>
                <span className="det-pill off">Zulu</span>
                <span className="det-pill off">Hausa</span>
                <span className="det-pill off">Igbo</span>
                <span className="det-pill off">Amharic</span>
              </div>
              <div style={{ marginTop: "18px" }}>
                <div className="conf-row">
                  <span className="conf-name">Swahili</span>
                  <div className="conf-track">
                    <div className="conf-bar" style={{ width: "96%" }}></div>
                  </div>
                  <span className="conf-pct">96%</span>
                </div>
                <div className="conf-row">
                  <span className="conf-name">Luganda</span>
                  <div className="conf-track">
                    <div className="conf-bar" style={{ width: "42%", opacity: 0.3 }}></div>
                  </div>
                  <span className="conf-pct">42%</span>
                </div>
                <div className="conf-row">
                  <span className="conf-name">Kikuyu</span>
                  <div className="conf-track">
                    <div className="conf-bar" style={{ width: "18%", opacity: 0.2 }}></div>
                  </div>
                  <span className="conf-pct">18%</span>
                </div>
              </div>
            </div>
            <div>
              <div className="eyebrow">Language detection</div>
              <h2 className="section-heading" style={{ fontSize: "clamp(1.6rem,3vw,2.3rem)" }}>
                Instantly identify any African language from recordings
              </h2>
              <p className="section-body">
                Our AI recognises over 30 African languages — from Swahili and
                Yoruba to Zulu, Amharic, and beyond. Even mixed-language audio
                is handled gracefully.
              </p>
              <p
                style={{
                  marginTop: "20px",
                  fontSize: "0.88rem",
                  color: "var(--denim)",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Explore supported languages →
              </p>
            </div>
          </div>
        </div>

        {/* Vocabulary builder */}
        <div className="alt-section">
          <div className="split flip reveal">
            <div className="alt-visual top-seashell">
              <div className="card-section-label" style={{ marginBottom: "16px" }}>
                Your vocabulary deck
              </div>
              <div className="fc-stack">
                <div className="fc">
                  <div className="fc-tag">Yoruba</div>
                  <div className="fc-word">Àárọ̀</div>
                  <div className="fc-trans">Morning / Dawn</div>
                  <div className="fc-ctx">&quot;Ìmọlẹ àárọ̀&quot; — the light of morning</div>
                </div>
                <div className="fc">
                  <div className="fc-tag">Swahili</div>
                  <div className="fc-word">Upendo</div>
                  <div className="fc-trans">Love / Affection</div>
                  <div className="fc-ctx">Used in songs, poetry, and everyday speech</div>
                </div>
                <div className="fc">
                  <div className="fc-tag">Hausa</div>
                  <div className="fc-word">Ƙarfi</div>
                  <div className="fc-trans">Strength / Power</div>
                  <div className="fc-ctx">&quot;Ka nuna ƙarfin ka&quot; — show your strength</div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "14px",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "0.75rem", color: "var(--obsidian-40)" }}>
                  48 words saved this week
                </span>
                <button
                  style={{
                    background: "var(--seashell)",
                    border: "1px solid var(--obsidian-12)",
                    color: "var(--obsidian)",
                    borderRadius: "50px",
                    padding: "5px 14px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Practice all
                </button>
              </div>
            </div>
            <div>
              <div className="eyebrow">Vocabulary builder</div>
              <h2 className="section-heading" style={{ fontSize: "clamp(1.6rem,3vw,2.3rem)" }}>
                Flashcards built automatically from everything you hear
              </h2>
              <p className="section-body">
                Every word you encounter is saved with pronunciation, context,
                and example sentences. Spaced repetition ensures you actually
                remember what you learn.
              </p>
              <p
                style={{
                  marginTop: "20px",
                  fontSize: "0.88rem",
                  color: "var(--denim)",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                See how it works →
              </p>
            </div>
          </div>
        </div>

        {/* Mobile learning */}
        <div className="alt-section">
          <div className="split reveal">
            <div className="alt-visual top-denim">
              <div className="phone">
                <div className="phone-screen">
                  <div className="phone-top">
                    <span className="phone-day">Day 42</span>
                    <span className="phone-streak">🔥 42 streak</span>
                  </div>
                  <div className="phone-pct">78%</div>
                  <div className="phone-label">Weekly goal progress</div>
                  <div className="phone-item">
                    <h5>Next lesson</h5>
                    <p>Swahili greetings &amp; introductions</p>
                  </div>
                  <div
                    className="phone-item"
                    style={{ background: "var(--denim-light)", border: "1px solid var(--denim-mid)" }}
                  >
                    <h5 style={{ color: "var(--denim)" }}>🎵 New song unlocked</h5>
                    <p>Asa — Bibanke (Yoruba)</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="eyebrow">Mobile learning</div>
              <h2 className="section-heading" style={{ fontSize: "clamp(1.6rem,3vw,2.3rem)" }}>
                Learn anywhere, on any device, at your own pace
              </h2>
              <p className="section-body">
                The full Speak experience on iOS and Android. Practice during
                your commute, review flashcards before bed, or analyse a song
                you just heard on the radio.
              </p>
              <p
                style={{
                  marginTop: "20px",
                  fontSize: "0.88rem",
                  color: "var(--denim)",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Get the mobile app →
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
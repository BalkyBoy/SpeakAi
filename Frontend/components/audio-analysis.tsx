export default function AudioAnalysis() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="split">
          <div className="reveal">
            <div className="analysis-card">
              <div className="audio-row">
                <div className="audio-thumb">🎵</div>
                <div>
                  <div className="audio-title">Makeba — Jain</div>
                  <div className="audio-meta-text">
                    Analysing Swahili content
                  </div>
                </div>
              </div>
              <div className="progress-track">
                <div className="progress-fill"></div>
              </div>
              <div className="detected-row">
                <span className="detected-label">Language detected</span>
                <span className="detected-value">🇰🇪 Swahili</span>
              </div>
              <div className="transcript">
                <div className="tr-row">
                  <span className="tr-orig">Nakupenda sana</span>
                  <span className="tr-trans">I love you very much</span>
                </div>
                <div className="tr-row">
                  <span className="tr-orig">Wewe ni moyo wangu</span>
                  <span className="tr-trans">You are my heart</span>
                </div>
                <div className="tr-row">
                  <span className="tr-orig">Pamoja daima</span>
                  <span className="tr-trans">Together always</span>
                </div>
              </div>
              <div className="vocab-chips">
                <span className="chip">Nakupenda</span>
                <span className="chip">Moyo → Heart</span>
                <span className="chip">Pamoja → Together</span>
              </div>
            </div>
          </div>
          <div className="reveal d1">
            <div className="eyebrow">Audio analysis</div>
            <h2 className="section-heading">
              Love a song but don&apos;t know what it&apos;s <em>saying?</em>
            </h2>
            <p className="section-body" style={{ marginBottom: "32px" }}>
              Upload audio and let AI uncover the language, lyrics,
              translation, and deeper meaning behind every line.
            </p>
            <ul className="benefits">
              <li>
                <div className="bcheck">✓</div>Detect spoken or sung language
                automatically
              </li>
              <li>
                <div className="bcheck">✓</div>Generate lyrics from audio
                where possible
              </li>
              <li>
                <div className="bcheck">✓</div>Translate into your preferred
                language
              </li>
              <li>
                <div className="bcheck">✓</div>Explain slang, idioms, and
                proverbs in context
              </li>
              <li>
                <div className="bcheck">✓</div>Understand deep cultural
                references
              </li>
              <li>
                <div className="bcheck">✓</div>Build vocabulary directly from
                music
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
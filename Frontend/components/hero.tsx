import Image from "next/image";

export default function Hero() {
  const bars = [10, 20, 14, 26, 18, 28, 12, 24, 20, 30, 16, 22, 28, 12, 24, 18];

  return (
    <section className="hero">
      <div className="hero-ambient"></div>

      <div className="hero-tag">
        <span className="hero-tag-dot"></span>
        AI-powered African language learning
      </div>

      <h1>
        Learn African languages through <em>culture,</em>
        <br />
        music, and AI
      </h1>

      <p className="hero-sub">
        Master Swahili, Yoruba, Zulu, Hausa, and more. Upload songs,
        conversations, or recordings and instantly discover lyrics, meanings,
        and cultural depth.
      </p>

      <div className="hero-ctas">
        <button className="btn-primary-lg">Start learning free</button>
        <button className="btn-outline-lg">Try audio analysis →</button>
      </div>

      <div className="hero-card reveal">
        <div className="card-topbar">
          <div className="card-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="card-url">speak.ai — Audio Analysis</div>
        </div>
        <div className="card-body">
          <div className="card-left">
            <div className="card-section-label">Upload audio</div>
            <div className="upload-area">
              <div className="file-emoji">
                <Image
                  src="/music.svg"
                  alt=""
                  width={10}
                  height={10}
                  className="w-fit justify-center items-center"
                />
              </div>
              <div className="file-name">Burna Boy — Ye.mp3</div>
              <div className="file-meta">Analysing language &amp; lyrics…</div>
            </div>
            <div className="waveform">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className="wb"
                  style={
                    {
                      "--h": `${h}px`,
                      animationDelay: `${i * 0.1}s`,
                    } as React.CSSProperties
                  }
                ></div>
              ))}
            </div>
            <div className="lang-pill">🇳🇬 Yoruba — 96% confidence</div>
            <div>
              <div className="lyric-row">
                <div className="lyric-original">Ìjẹ ko kọ mi</div>
                <div className="lyric-translation">
                  Hardship hasn&apos;t taught me
                </div>
              </div>
              <div className="lyric-row">
                <div className="lyric-original">Wewe ni moyo wangu</div>
                <div className="lyric-translation">You are my heart</div>
              </div>
              <div className="lyric-row">
                <div className="lyric-original">Mo jẹ́ olówó</div>
                <div className="lyric-translation">I am wealthy in spirit</div>
              </div>
            </div>
          </div>
          <div className="card-right">
            <div className="card-section-label">Cultural insights</div>
            <div className="insight-box">
              <strong>Context</strong>
              &quot;Ye&quot; is Yoruba for &quot;to survive.&quot; The song
              reflects on resilience — a deeply rooted philosophy across West
              African traditions.
            </div>
            <div className="card-section-label">Vocabulary saved</div>
            <div className="chip-row">
              <span className="chip">Ìjẹ → Hardship</span>
              <span className="chip">Olówó → Wealthy</span>
              <span className="chip">Ìmọ̀ → Knowledge</span>
              <span className="chip">Àárọ̀ → Morning</span>
            </div>
            <button
              style={{
                width: "100%",
                marginTop: "18px",
                background: "var(--denim)",
                color: "white",
                border: "none",
                padding: "11px",
                borderRadius: "10px",
                fontSize: "0.83rem",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Add 4 words to flashcards
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

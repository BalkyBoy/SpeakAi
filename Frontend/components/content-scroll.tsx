const CONTENT_TILES = [
  { bg: "#FDF6EC", icon: "🎵", title: "Music", desc: "Afrobeats, Highlife, Afro-soul", delay: "" },
  { bg: "#EEF4FB", icon: "🎙️", title: "Podcasts", desc: "News, culture, comedy", delay: "d1" },
  { bg: "#F0F3F9", icon: "💬", title: "Conversations", desc: "Real speech patterns", delay: "d2" },
  { bg: "#FDF6EC", icon: "📖", title: "Storytelling", desc: "Folklore & oral tradition", delay: "" },
  { bg: "#F0F7F2", icon: "🌍", title: "Cultural content", desc: "Ceremonies & traditions", delay: "d1" },
  { bg: "#FDF6EC", icon: "🗣️", title: "Everyday speech", desc: "Markets, greetings, life", delay: "d2" },
];

export default function ContentScroll() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="eyebrow">Content types</div>
        <h2 className="section-heading">
          Every piece of content
          <br />
          becomes a <em>lesson</em>
        </h2>
        <div className="content-scroll">
          {CONTENT_TILES.map((t) => (
            <div className={`content-tile reveal ${t.delay}`} key={t.title}>
              <div className="tile-top" style={{ background: t.bg }}>
                {t.icon}
              </div>
              <div className="tile-body">
                <h4>{t.title}</h4>
                <p>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
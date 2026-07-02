export default function Pricing () {
    return (
        <section className="section">
  <div className="container">
    <div className='text-center max-w-3xl mx-auto'>
      <div className="eyebrow justify-center">Pricing</div>
      <h2 className="section-heading">Simple pricing for<br/>curious <em>learners</em></h2>
    </div>
    <div className="pricing-grid">
      <div className="price-card reveal">
        <div className="plan-name">Free</div>
        <div className="plan-price">$0</div>
        <div className="plan-period">Forever free</div>
        <ul className="plan-features">
          <li>Basic lessons in 5 languages</li>
          <li>5 audio analyses per month</li>
          <li>Vocabulary tracking (100 words)</li>
          <li>Community access</li>
        </ul>
        <div className="plan-btn-wrap"><button className="btn-ghost w-full p-3.5">Get started free</button></div>
      </div>
      <div className="price-card featured reveal d1">
        <div className="featured-badge">Most popular</div>
        <div className="plan-name">Pro</div>
        <div className="plan-price">$12</div>
        <div className="plan-period">per month</div>
        <ul className="plan-features">
          <li>Unlimited lessons, all languages</li>
          <li>Unlimited audio analysis</li>
          <li>Full AI language tutor</li>
          <li>Advanced cultural insights</li>
          <li>Unlimited vocabulary builder</li>
          <li>Progress analytics</li>
          <li>Offline mode</li>
        </ul>
        <div className="plan-btn-wrap"><button className="btn-denim w-full p-3.5 rounded-2xl">Start free trial</button></div>
      </div>
      <div className="price-card reveal d2">
        <div className="plan-name">Education</div>
        <div className="plan-price text-[2.2rem]">Custom</div>
        <div className="plan-period">Contact us for pricing</div>
        <ul className="plan-features">
          <li>Classroom &amp; group access</li>
          <li>Educator dashboard</li>
          <li>Group analytics &amp; reporting</li>
          <li>Custom lesson paths</li>
          <li>Priority support</li>
        </ul>
        <div className="plan-btn-wrap"><button className="btn-ghost w-full p-3.5">Contact sales</button></div>
      </div>
    </div>
  </div>
</section>
    )
}
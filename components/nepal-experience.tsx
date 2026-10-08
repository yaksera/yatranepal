'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ArrowDown, ArrowLeft, ArrowRight, Mountain, Menu, X, Compass, MapPin, Check, Download, Plus, Minus } from 'lucide-react';
import { destinations, experiences, type Destination } from '@/lib/destinations';

const nav = [{ text: 'Destinations', href: '#destinations' }, { text: 'Experiences', href: '#experiences' }, { text: 'Our story', href: '#our-story' }];
const faqs = [
  ['Can I explore Nepal without trekking?', 'Absolutely. Lakeside time in Pokhara, the living heritage of Bhaktapur and walks around Kathmandu Valley make a rewarding journey without a multi-day trek.'],
  ['How should I choose a journey?', 'Start with the kind of days you enjoy: mountain trails, lakeside pauses or culture and food. Use the trip planner to build a simple outline you can refine with a local travel professional.'],
  ['Does the planner make a booking?', 'No. It creates a downloadable personal outline. Transport, accommodation, guides, permits and availability must be arranged separately.'],
];

function Brand({ dark = false }: { dark?: boolean }) {
  return <a href="#home" aria-label="Yatra Nepal home" className={`brand ${dark ? 'brand-dark' : ''}`}><span className="brand-icon"><Mountain size={25} strokeWidth={1.7} /></span><span>yatra<span className="brand-dot">.</span><small>NEPAL</small></span></a>;
}

export default function NepalExperience() {
  const root = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [menu, setMenu] = useState(false);
  const [spotlight, setSpotlight] = useState(1);
  const [filter, setFilter] = useState('All places');
  const [activeExperience, setActiveExperience] = useState(0);
  const [modal, setModal] = useState<'plan' | 'destination' | null>(null);
  const [selected, setSelected] = useState<Destination>(destinations[0]);
  const [interest, setInterest] = useState('Culture & lakes');
  const [duration, setDuration] = useState('7 days');
  const [travelers, setTravelers] = useState('2');
  const [plan, setPlan] = useState<string | null>(null);
  const experience = experiences[activeExperience];
  const featured = destinations[spotlight];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.timeline({ defaults: { ease: 'power3.out' } })
          .from('.hero-nav', { y: -16, opacity: 0, duration: 0.8 })
          .from('.hero-title span', { yPercent: 40, opacity: 0, duration: 1.3, stagger: 0.08 }, '-=0.6')
          .from('.hero-caption, .hero-bottom', { y: 25, opacity: 0, duration: 1, stagger: 0.12 }, '-=0.8');
        gsap.to('.hero-landscape', { y: 65, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
        gsap.to('.hero-title', { y: -40, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => gsap.from(el, { y: 32, opacity: 0, duration: 0.85, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } }));
        gsap.to('.reading-progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: true } });
      }, root);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  useEffect(() => {
    if (modal) {
      dialog.current?.showModal();
      const previous = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = previous; };
    }
    dialog.current?.close();
  }, [modal]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenu(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [filter]);

  const rememberTrigger = () => { if (!modal) triggerRef.current = document.activeElement as HTMLElement; };
  const openPlan = () => { rememberTrigger(); setPlan(null); setModal('plan'); setMenu(false); };
  const openDestination = (destination: Destination) => { rememberTrigger(); setSelected(destination); setModal('destination'); };
  const closeModal = () => { setModal(null); triggerRef.current?.focus(); };
  const changeSpotlight = (direction: number) => setSpotlight(current => (current + direction + destinations.length) % destinations.length);

  function createPlan(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const route = interest === 'Mountain trails' ? 'Kathmandu Valley → a locally guided mountain route → Kathmandu' : interest === 'Culture & lakes' ? 'Kathmandu → Bhaktapur → Pokhara → Kathmandu' : 'Kathmandu → Pokhara → unhurried days by Phewa Lake → Kathmandu';
    const outline = interest === 'Mountain trails'
      ? 'Begin with time in Kathmandu. Discuss a route matched to your experience and the available days with a qualified local guide. Keep flexibility for conditions, travel and acclimatisation; use the remaining time for a gentle return.'
      : interest === 'Culture & lakes'
      ? 'Begin with Kathmandu Valley and Bhaktapur’s courtyards, food and crafts. Continue to Pokhara for lake time and nearby walks. Leave a flexible final day for the return journey.'
      : 'Begin with an easy arrival day, then continue to Pokhara. Set aside unhurried mornings for Phewa Lake, cafés and short walks. Reserve time for the return journey.';
    setPlan(`YOUR NEPAL JOURNEY\n\nStyle: ${interest}\nTime available: ${duration}\nTravellers: ${travelers}\n\nSuggested route\n${route}\n\nYour rhythm\n${outline}\n\nBefore you go\nThis is an inspiration outline, not a booking or confirmed itinerary. Check current transport, local conditions and any required permits. Arrange accommodation and guides separately. Mountain routes need an individual assessment of timing and altitude.\n\nCreated with Yatra Nepal.`);
  }

  function downloadPlan() {
    if (!plan) return;
    const url = URL.createObjectURL(new Blob([plan], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'my-nepal-journey.txt'; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return <div ref={root}>
    <a className="skip-link" href="#destinations">Skip to destinations</a>
    <div className="reading-progress" aria-hidden="true" />
    <main>
      <section id="home" className="hero" aria-label="Discover Nepal">
        <div className="hero-landscape" aria-hidden="true"><img className="hero-photo" src="/images/himalaya.jpg" alt="" fetchPriority="high" /></div>
        <div className="hero-sky-tint" />
        <header className="hero-nav flex items-center justify-between gap-6">
          <Brand />
          <nav aria-label="Main navigation" className="desktop-nav items-center gap-7">{nav.map(link => <a key={link.href} href={link.href}>{link.text}</a>)}</nav>
          <div className="flex items-center gap-3"><button onClick={openPlan} className="button button-white nav-cta">Plan your trip <ArrowUpRight size={17}/></button><button className="mobile-toggle" onClick={() => setMenu(!menu)} aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} aria-controls="mobile-navigation">{menu ? <X/> : <Menu/>}</button></div>
        </header>
        {menu && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{nav.map(link => <a key={link.href} href={link.href} onClick={() => setMenu(false)}>{link.text}</a>)}<button onClick={openPlan}>Plan your trip</button></nav>}
        <p className="hero-caption">A LITTLE CLOSER TO EXTRAORDINARY</p>
        <h1 className="hero-title" aria-label="Nepal">{'NEPAL'.split('').map((letter, index) => <span aria-hidden="true" key={index}>{letter}</span>)}</h1>
        <svg className="hero-foreground hero-landscape" viewBox="0 0 1773 1407" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs><clipPath id="mountain-edge"><path d="M0 643 28 654 51 655 89 665 118 655 161 637 184 649 206 635 230 623 249 605 268 629 278 613 303 595 328 589 350 567 369 535 395 507 421 488 432 461 460 452 484 438 509 416 523 400 548 390 577 351 597 338 608 335 628 362 649 391 673 422 696 449 717 483 739 490 762 493 780 510 803 519 817 529 833 519 848 528 865 555 883 596 907 600 921 628 945 642 975 650 1000 670 1035 682 1076 686 1101 694 1140 692 1170 682 1195 696 1223 690 1255 677 1282 652 1311 614 1333 608 1352 602 1373 628 1405 670 1439 699 1465 684 1492 653 1518 628 1532 634 1554 657 1585 673 1626 686 1647 680 1667 671 1695 695 1712 704 1729 696 1755 714 1773 708V1407H0Z"/></clipPath></defs>
          <image href="/images/himalaya.jpg" width="1773" height="1407" clipPath="url(#mountain-edge)" />
        </svg>
        <div className="hero-shade" />
        <div className="hero-side-note"><span className="tiny-cross">+</span> KHUMBU, NEPAL <span>THE HIMALAYAN STATE OF MIND</span></div>
        <div className="hero-bottom">
          <div className="hero-copy"><div className="eyebrow light"><span/> NAMASTE, WANDERER</div><h2>Some places you visit.<br/>Others <em>stay with you.</em></h2><p>From Himalayan trails to timeless courtyards.<br className="desktop-break"/> Find the Nepal that feels like you.</p><a href="#destinations" className="button button-white">Explore Nepal <ArrowUpRight size={18}/></a></div>
          <div className="hero-right"><div className="preview-top"><span>NEXT ON YOUR HORIZON</span><span>0{spotlight + 1} / 03</span></div><button className="destination-preview" onClick={() => openDestination(featured)} aria-label={`Explore ${featured.name}`}><img src={featured.image} alt={featured.alt}/><span className="preview-label"><span>{featured.name}</span><ArrowUpRight size={20}/></span></button><div className="preview-controls"><span className="flex gap-2">{destinations.map((d, index) => <button key={d.id} className={`slide-dot ${index === spotlight ? 'active' : ''}`} aria-label={`Preview ${d.name}`} aria-pressed={index === spotlight} onClick={() => setSpotlight(index)}/>)}</span><div className="flex gap-2"><button aria-label="Previous destination" onClick={() => changeSpotlight(-1)}><ArrowLeft size={17}/></button><button aria-label="Next destination" onClick={() => changeSpotlight(1)}><ArrowRight size={17}/></button></div></div></div>
        </div>
        <a className="scroll-cue" href="#destinations"><ArrowDown size={15}/> SCROLL TO WANDER</a>
      </section>

      <div className="intro-strip"><span>Small country. <em>Endless possibilities.</em></span><div><span><Mountain size={17}/> Himalayan trails</span><span><Compass size={17}/> Living culture</span><span><MapPin size={17}/> Local discoveries</span></div><span className="strip-nepali" lang="ne">नमस्ते</span></div>

      <section id="destinations" className="section-shell destination-section">
        <div className="section-heading" data-reveal><div><p className="eyebrow"><span/> FIND YOUR SOMEWHERE</p><h2>Different places.<br/><em>One extraordinary Nepal.</em></h2></div><p className="section-description">Follow the mountains. Stay for the people.<br/>Your next chapter starts somewhere here.</p></div>
        <div className="filter-row" role="group" aria-label="Filter destinations">{['All places', 'Mountains', 'Lakes & valleys', 'Culture'].map(item => <button key={item} aria-pressed={filter === item} className={filter === item ? 'selected' : ''} onClick={() => setFilter(item)}>{item}</button>)}<span className="filter-count">0{destinations.filter(d => filter === 'All places' || d.category === filter).length} PLACES TO BEGIN</span></div>
        <div className="destination-grid">{destinations.filter(d => filter === 'All places' || d.category === filter).map((d) => <button className="destination-card group text-left" key={d.id} onClick={() => openDestination(d)}><div className="card-image"><img src={d.image} alt={d.alt} loading="lazy"/><span className="card-tag">{d.category}</span><span className="card-arrow"><ArrowUpRight size={23}/></span><div className="card-caption"><span>{d.eyebrow}</span><h3>{d.name}</h3></div></div><p>{d.rhythm}<span>Explore</span></p></button>)}</div>
      </section>

      <section id="experiences" className="experience-section section-shell">
        <div className="experience-photo" data-reveal><img key={experience.image} src={experience.image} alt={experience.alt} loading="lazy"/><div className="photo-stamp"><Compass size={28} strokeWidth={1}/><span>LESS ITINERARY.<br/>MORE POSSIBILITY.</span></div><span className="photo-footnote">NEPAL, AT YOUR OWN PACE.</span></div>
        <div className="experience-content" data-reveal><p className="eyebrow"><span/> COLLECT MOMENTS, NOT MILES</p><h2>How will you<br/><em>feel Nepal?</em></h2><div className="experience-tabs" role="tablist" aria-label="Choose an experience">{['Adventure', 'Slow travel', 'Culture'].map((tab,index) => <button key={tab} id={`experience-tab-${index}`} role="tab" aria-selected={activeExperience === index} aria-controls="experience-panel" tabIndex={activeExperience === index ? 0 : -1} onKeyDown={event => { if (['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) { event.preventDefault(); const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (activeExperience + (event.key === 'ArrowRight' ? 1 : 2)) % 3; setActiveExperience(next); document.getElementById(`experience-tab-${next}`)?.focus(); } }} onClick={() => setActiveExperience(index)}>{tab}</button>)}</div><div id="experience-panel" role="tabpanel" aria-labelledby={`experience-tab-${activeExperience}`} tabIndex={0} key={activeExperience} className="experience-panel"><span className="mini-label">{experience.kicker}</span><h3>{experience.title}</h3><p>{experience.text}</p><button className="text-link" onClick={() => openDestination(destinations[experience.destination])}>Find your experience <ArrowUpRight size={20}/></button></div><p className="experience-tag"><span/> {experience.tag}</p></div>
      </section>

      <section id="our-story" className="story-section section-shell"><div data-reveal><p className="eyebrow"><span/> THE WAY WE SEE IT</p><h2>A journey is better<br/>when you <em>feel part of it.</em></h2></div><div className="story-copy" data-reveal><p>Nepal is more than the view from the summit. It’s the extra cup of tea. The greeting on a quiet trail. The courtyard you find when you take the long way home.</p><p>Yatra means journey. Our idea is simple: explore with curiosity, take your time, and leave room for the unexpected.</p><span className="story-signature">Go gently. Look closer. Stay curious.</span></div></section>

      <section className="cta-section" aria-labelledby="cta-title"><img src="/images/pokhara.jpg" alt="" loading="lazy"/><div className="cta-overlay"/><div className="cta-content" data-reveal><p className="eyebrow light">YOUR STORY STARTS HERE</p><h2 id="cta-title">A little less someday.<br/><em>A little more Nepal.</em></h2><button className="button button-white" onClick={openPlan}>Create your journey <ArrowUpRight size={18}/></button><span>No fixed route. Just your kind of adventure.</span></div></section>

      <section className="faq-section section-shell"><div data-reveal><p className="eyebrow"><span/> BEFORE YOU WANDER</p><h2>A few things<br/><em>you might wonder.</em></h2></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<Plus size={19} className="faq-plus"/><Minus size={19} className="faq-minus"/></summary><p>{answer}</p></details>)}</div></section>
    </main>
    <footer className="footer section-shell"><div className="footer-top"><Brand dark/><p>Extraordinary places.<br/>A more personal way to explore.</p><nav aria-label="Footer navigation">{nav.map(link => <a href={link.href} key={link.href}>{link.text}</a>)}<button onClick={openPlan}>Plan your trip</button></nav></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Yatra Nepal.</span><span>Made with a little Himalayan heart.</span><a href="/CREDITS.txt" target="_blank" rel="noopener noreferrer">Photo credits</a></div></footer>

    <dialog ref={dialog} className="journey-dialog" aria-labelledby="dialog-title" onCancel={closeModal} onClose={() => setModal(null)} onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeModal(); } }}>
      <button className="dialog-close" onClick={closeModal} aria-label="Close dialog"><X size={22}/></button>
      {modal === 'destination' ? <><img className="dialog-image" src={selected.image} alt={selected.alt}/><div className="dialog-body"><p className="eyebrow">{selected.eyebrow}</p><h2 id="dialog-title">{selected.name}</h2><p>{selected.description}</p><ul className="highlight-list">{selected.highlights.map(h => <li key={h}><Check size={17}/>{h}</li>)}</ul><button className="button button-dark" onClick={openPlan}>Make it your journey <ArrowUpRight size={18}/></button></div></> : <div className="dialog-body planner-body"><p className="eyebrow"><span/> YOUR NEPAL, YOUR WAY</p><h2 id="dialog-title">A journey<br/><em>with your name on it.</em></h2>{plan ? <div className="plan-result" aria-live="polite"><p className="plan-ready"><Check size={19}/> Your journey outline is ready.</p><p>Save it, make it your own, and use it to start planning with a local travel professional.</p><div className="plan-preview">{plan.split('\n\n').slice(1,4).map((p,i) => <p key={i}>{p}</p>)}</div><button className="button button-dark" onClick={downloadPlan}><Download size={18}/> Download your outline</button><button className="edit-plan" onClick={() => setPlan(null)}>Adjust my choices</button></div> : <form onSubmit={createPlan}><p className="planner-intro">Tell us what you love. We’ll give you a simple starting point.</p><fieldset><legend>What brings you here?</legend><div className="interest-options">{['Mountain trails','Culture & lakes','Slow travel'].map(item => <label className={interest === item ? 'checked' : ''} key={item}><input type="radio" name="interest" value={item} checked={interest === item} onChange={() => setInterest(item)}/>{item}</label>)}</div></fieldset><div className="form-grid"><label>Time to explore<select value={duration} onChange={e => setDuration(e.target.value)}><option>5 days</option><option>7 days</option><option>10 days</option><option>14 days</option></select></label><label>Travellers<select value={travelers} onChange={e => setTravelers(e.target.value)}><option value="1">Just me</option><option value="2">Two of us</option><option value="3–5">3–5 people</option><option value="6+">6 or more</option></select></label></div><button type="submit" className="button button-dark w-full">Create my journey <ArrowUpRight size={18}/></button><p className="form-note">An inspiration outline, not a booking. Your choices stay in this browser session.</p></form>}</div>}
    </dialog>
  </div>;
}

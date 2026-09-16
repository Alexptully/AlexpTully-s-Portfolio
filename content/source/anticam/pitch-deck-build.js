// AntiCam pitch deck — pptxgenjs generator
const pptxgen = require('pptxgenjs');
const path = require('path');

const A = (f) => path.join(__dirname, 'assets', f);
const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE'; // 13.333 x 7.5 in
pres.author = 'Alexander Tully';
pres.company = 'Tully Tech';
pres.title = 'AntiCam — Pitch Deck';

// ---------- design system ----------
const C = {
  bg: '0B0E13', surface: '151A22', surface2: '1C232D', border: '27303B',
  ink: 'F3EFE7', muted: '9AA4AF', dim: '6E7883', accent: 'FF3B6F', accentInk: 'FFB3C6', white: 'FFFFFF',
};
const F = 'Arial';
const W = 13.333, H = 7.5, M = 0.6;
const CW = W - 2 * M; // 12.133

let slideNo = 0;

function newSlide(bgImage) {
  const s = pres.addSlide();
  slideNo += 1;
  if (bgImage) s.background = { path: A(bgImage) };
  else s.background = { color: C.bg };
  return s;
}

function text(s, str, x, y, w, h, o = {}) {
  const opt = Object.assign({
    x, y, w, h, fontFace: F, fontSize: 14, color: C.ink, margin: 0, isTextBox: true,
    valign: 'top', align: 'left', lineSpacingMultiple: 1.15,
  }, o);
  s.addText(str, opt);
}

function footer(s) {
  text(s, 'AntiCam  ·  Tully Tech', M, H - 0.45, 4, 0.25, { fontSize: 9, color: C.dim });
  text(s, String(slideNo), W - M - 1, H - 0.45, 1, 0.25, { fontSize: 9, color: C.dim, align: 'right' });
}

function dot(s, x, y, size = 0.11, color = C.accent, glow = true) {
  if (glow) s.addShape(pres.ShapeType.ellipse, { x: x - size * 0.9, y: y - size * 0.9, w: size * 2.8, h: size * 2.8, fill: { color, transparency: 82 }, line: { color, transparency: 100 } });
  s.addShape(pres.ShapeType.ellipse, { x, y, w: size, h: size, fill: { color }, line: { color, transparency: 100 } });
}

function eyebrow(s, label, x = M, y = 0.62) {
  dot(s, x, y + 0.05, 0.11);
  text(s, label.toUpperCase(), x + 0.3, y - 0.02, 6, 0.28, { fontSize: 10, bold: true, color: C.accentInk, charSpacing: 3 });
}

function headline(s, str, x = M, y = 0.98, w = 8.6, size = 32, h = 1.4) {
  text(s, str, x, y, w, h, { fontSize: size, bold: true, color: C.ink, lineSpacingMultiple: 1.05 });
}

function card(s, x, y, w, h, o = {}) {
  s.addShape(pres.ShapeType.roundRect, Object.assign({
    x, y, w, h, rectRadius: 0.14,
    fill: { color: C.surface }, line: { color: C.border, width: 0.75 },
  }, o));
}

function chip(s, str, x, y, w, o = {}) {
  const h = o.h || 0.36;
  s.addShape(pres.ShapeType.roundRect, { x, y, w, h, rectRadius: h / 2, fill: { color: o.fill || C.surface2 }, line: { color: o.line || C.border, width: 0.75 } });
  text(s, str, x, y, w, h, { fontSize: o.fontSize || 10, bold: true, color: o.color || C.ink, align: 'center', valign: 'middle', charSpacing: 0.5 });
}

// rounded image: altText marker "rr:<adj>" is post-processed into roundRect geometry
function img(s, file, x, y, w, h, o = {}) {
  const opt = { path: A(file), x, y, w, h };
  if (o.cover) opt.sizing = { type: 'cover', w, h };
  if (o.round !== false) {
    const r = o.radius || 0.14;
    const adj = Math.round(100000 * r / Math.min(w, h));
    opt.altText = `rr:${adj}`;
  }
  s.addImage(opt);
}

function stat(s, num, label, source, x, y, w, h) {
  card(s, x, y, w, h);
  text(s, num, x + 0.32, y + 0.22, w - 0.6, 0.7, { fontSize: 40, bold: true, color: C.ink, charSpacing: -1 });
  text(s, label, x + 0.32, y + 0.95, w - 0.6, 0.62, { fontSize: 11.5, color: C.ink, lineSpacingMultiple: 1.12 });
  text(s, source, x + 0.32, y + h - 0.42, w - 0.6, 0.3, { fontSize: 9, color: C.muted });
}

function bulletRow(s, title, desc, x, y, w, o = {}) {
  dot(s, x, y + 0.09, 0.11);
  text(s, title, x + 0.32, y - 0.02, w - 0.32, 0.32, { fontSize: o.titleSize || 15, bold: true, color: C.ink });
  text(s, desc, x + 0.32, y + 0.32, w - 0.32, o.descH || 0.7, { fontSize: o.descSize || 12.5, color: C.muted, lineSpacingMultiple: 1.18 });
}

// =====================================================================
// 1. TITLE
// =====================================================================
{
  const s = newSlide('bg_title.jpg');
  dot(s, 0.82, 1.98, 0.13);
  text(s, 'TULLY TECH', 1.15, 1.9, 4, 0.3, { fontSize: 11, bold: true, color: C.accentInk, charSpacing: 4 });
  text(s, 'AntiCam', 0.78, 2.2, 7, 1.5, { fontSize: 92, bold: true, color: C.white, charSpacing: -3 });
  text(s, 'Control when you’re seen.', 0.82, 3.78, 7, 0.6, { fontSize: 28, color: C.ink });
  text(s, 'A wearable that makes you invisible to cameras — without breaking a single one.', 0.82, 4.5, 5.9, 0.9, { fontSize: 15, color: C.muted, lineSpacingMultiple: 1.3 });
  text(s, 'Alexander Tully  ·  Founder, Tully Tech', 0.82, 6.3, 7, 0.3, { fontSize: 12, color: C.ink });
  text(s, 'TroyLabs BUILD application  ·  Fall 2026  ·  tullytech.com', 0.82, 6.62, 7, 0.3, { fontSize: 11, color: C.muted });
  img(s, 'pin_v2_cut.png', 7.75, 1.3, 5.0, 4.62, { round: false });
  s.addNotes('AntiCam is a wearable privacy device from Tully Tech. It uses infrared light and retro-reflective material to keep cameras from capturing a clear image of the wearer, without damaging the camera or interfering with any network. This deck is prepared for the TroyLabs BUILD application; the appendix covers what a first raise would fund.');
}

// =====================================================================
// 2. PROBLEM
// =====================================================================
{
  const s = newSlide('bg_plain.jpg');
  eyebrow(s, 'The problem');
  headline(s, 'Privacy is disappearing one camera at a time.', M, 0.98, 6.6, 32, 1.5);
  text(s, 'AntiCam started when a friend’s private moment was posted online without consent. Today cameras sit in rentals, on doorbells and in every pocket — and once an image exists, AI can put it anywhere and make it say anything.',
    M, 2.62, 6.2, 1.6, { fontSize: 14, color: C.muted, lineSpacingMultiple: 1.32 });
  text(s, 'What people can’t control today', M, 4.45, 6, 0.3, { fontSize: 11, bold: true, color: C.accentInk, charSpacing: 2 });
  const rows = [
    'Hidden cameras where they sleep and change',
    'Flash photography they never agreed to',
    'Faces harvested by every doorbell and storefront',
  ];
  rows.forEach((r, i) => {
    dot(s, M + 0.02, 4.98 + i * 0.5, 0.1);
    text(s, r, M + 0.34, 4.87 + i * 0.5, 6, 0.36, { fontSize: 13.5, color: C.ink, valign: 'middle' });
  });
  const sx = 7.6, sw = W - M - 7.6;
  stat(s, '47%', 'of Americans have found a camera at a vacation rental — up from 25% in 2023', 'IPX1031 survey, June 2025 (n = 1,050)', sx, 0.95, sw, 1.85);
  stat(s, '58%', 'worry about hidden cameras where they stay; 64% wouldn’t know how to find one', 'IPX1031, 2025', sx, 2.95, sw, 1.85);
  stat(s, '70,882', 'surveillance cameras in New York City alone — 11 per 1,000 people across the 50 largest U.S. cities', 'Comparitech, updated Jan 2024', sx, 4.95, sw, 1.85);
  footer(s);
  s.addNotes('Open with the human story: a peer’s private moment posted online is what started AntiCam. Then quantify. The IPX1031 survey of 1,050 Americans (June 2025) found 47% have discovered a camera at a rental, nearly double the 25% in 2023, and 58% worry about it. Comparitech counts roughly 537,000 surveillance cameras across the 50 largest US cities, about 11 per 1,000 people, before counting doorbells and phones.');
}

// =====================================================================
// 3. STATUS QUO
// =====================================================================
{
  const s = newSlide();
  eyebrow(s, 'Why it isn’t solved');
  headline(s, 'Today’s options are illegal, passive, or partial.', M, 0.98, 11.5, 32, 0.9);
  const cw = (CW - 0.8) / 3, cy = 2.15, ch = 3.85;
  const cards = [
    { tag: 'ILLEGAL', title: 'RF camera jammers', body: 'Drown out the Wi-Fi and cellular bands cameras use. They disable the camera — and everything else nearby, from phones to emergency calls.', foot: 'Using, selling or marketing a jammer is a federal offense (Communications Act §302(b), §333 — FCC). Typically hundreds to thousands of dollars.' },
    { tag: 'PASSIVE', title: 'Hidden-camera detectors', body: '$20–200 handhelds that help you find a lens after you’ve already arrived. They locate; they don’t protect.', foot: '64% of Americans say they wouldn’t know how to detect a hidden camera (IPX1031, 2025).' },
    { tag: 'PARTIAL', title: 'Anti-surveillance eyewear & apparel', body: 'IR-blocking glasses and adversarial-pattern clothing hide part of a face from some recognition models — until the models change.', foot: 'Reflectacles eyewear $48–228; adversarial patterns lose effectiveness as algorithms evolve (Reason, Jul 2026).' },
  ];
  cards.forEach((c, i) => {
    const x = M + i * (cw + 0.4);
    card(s, x, cy, cw, ch);
    chip(s, c.tag, x + 0.3, cy + 0.3, 1.15, { fill: i === 0 ? C.accent : C.surface2, color: i === 0 ? C.white : C.accentInk, line: i === 0 ? C.accent : C.border, fontSize: 9 });
    text(s, c.title, x + 0.3, cy + 0.85, cw - 0.6, 0.7, { fontSize: 18, bold: true, color: C.ink, lineSpacingMultiple: 1.05 });
    text(s, c.body, x + 0.3, cy + 1.6, cw - 0.6, 1.3, { fontSize: 12.5, color: C.ink, lineSpacingMultiple: 1.22 });
    text(s, c.foot, x + 0.3, cy + 2.95, cw - 0.6, 0.8, { fontSize: 9.5, color: C.muted, lineSpacingMultiple: 1.2 });
  });
  dot(s, M + 0.02, 6.47, 0.11);
  text(s, 'Nothing legal actually stops a camera from seeing you.', M + 0.34, 6.34, 9, 0.36, { fontSize: 16, bold: true, color: C.ink, valign: 'middle' });
  footer(s);
  s.addNotes('Jammers work by drowning out radio frequencies — they take down the camera and everything around it, and the FCC treats operating, selling or marketing one as a federal offense. Detectors are legal but passive: they only find a lens after you’re already in the room. Eyewear and adversarial clothing are legal but partial, and Reason’s July 2026 review notes adversarial patterns stop working as recognition algorithms change. So the honest summary: nothing legal actually stops a camera from seeing you.');
}

// =====================================================================
// 4. SOLUTION
// =====================================================================
{
  const s = newSlide('bg_plain.jpg');
  eyebrow(s, 'The solution');
  headline(s, 'AntiCam blinds the camera — not the network.', M, 0.98, 11.5, 32, 0.9);
  img(s, 'cap_front_cut.png', 0.35, 2.45, 5.7, 4.09, { round: false });
  const rx = 6.85, rw = W - M - rx;
  bulletRow(s, 'Infrared array', 'Floods the near-infrared band that camera sensors see and human eyes can’t. To the camera, the wearer becomes a bright blur.', rx, 2.25, rw);
  bulletRow(s, 'Retro-reflective lining', 'Bounces a paparazzi flash straight back into the lens, so flash photography returns a washed-out frame.', rx, 3.55, rw);
  bulletRow(s, 'Wearable and harmless', 'A cap, a clip-on pin or a room unit. Light only — no radio interference, no damage, nothing to unplug.', rx, 4.85, rw);
  chip(s, 'Under $100', rx, 6.15, 1.5);
  chip(s, 'Rechargeable', rx + 1.65, 6.15, 1.6);
  chip(s, 'Invisible to the eye', rx + 3.4, 6.15, 2.0);
  footer(s);
  s.addNotes('AntiCam does one thing: it makes the wearer unreadable to cameras. A high-output infrared array saturates any sensor that can see near-infrared — which is most security, doorbell and phone cameras at night — and a retro-reflective lining throws a flash straight back at the lens. It emits light, not radio, so it neither jams nor damages anything. It ships as a cap, a pin, or a room unit, all under $100.');
}

// =====================================================================
// 5. HOW IT WORKS
// =====================================================================
{
  const s = newSlide();
  eyebrow(s, 'How it works');
  headline(s, 'Cameras see infrared. People don’t. AntiCam lives in that gap.', M, 0.98, 10.5, 30, 0.95);
  const steps = [
    ['The sensor sees IR', 'Most cameras use night-vision-capable sensors that respond to near-infrared light.'],
    ['AntiCam emits IR', 'A high-output LED array projects invisible light toward any lens facing the wearer.'],
    ['The sensor saturates', 'Auto-exposure fights the flood and loses: the wearer washes out into glare.'],
    ['Flash is thrown back', 'A light sensor spikes the array on a flash; retro-reflective fabric returns it to the source.'],
  ];
  const cw = (CW - 3 * 0.25) / 4, cy = 2.5, ch = 2.25;
  // connector behind the number badges
  s.addShape(pres.ShapeType.line, { x: M + 0.55, y: cy + 0.5, w: CW - 1.1, h: 0, line: { color: C.border, width: 1 } });
  steps.forEach((st, i) => {
    const x = M + i * (cw + 0.25);
    card(s, x, cy, cw, ch);
    s.addShape(pres.ShapeType.ellipse, { x: x + 0.3, y: cy + 0.25, w: 0.5, h: 0.5, fill: { color: C.accent }, line: { color: C.accent, transparency: 100 } });
    text(s, String(i + 1), x + 0.3, cy + 0.25, 0.5, 0.5, { fontSize: 14, bold: true, color: C.white, align: 'center', valign: 'middle' });
    text(s, st[0], x + 0.3, cy + 0.95, cw - 0.6, 0.35, { fontSize: 15, bold: true, color: C.ink });
    text(s, st[1], x + 0.3, cy + 1.32, cw - 0.6, 0.95, { fontSize: 12, color: C.muted, lineSpacingMultiple: 1.2 });
  });
  img(s, 'ir_glow.jpg', M, 5.1, 1.7, 1.7, { cover: true });
  text(s, 'Through a phone camera the emitter glows magenta. To the eye it is dark — the same light, seen by a sensor instead of a retina.', M + 1.9, 5.2, 3.9, 1.5, { fontSize: 12, color: C.muted, lineSpacingMultiple: 1.25 });
  img(s, 'cap_under_cut.png', 7.05, 4.95, 1.95, 1.95, { round: false });
  text(s, 'Cap V2: the emitters sit under the brim, aimed where cameras look — at your face — with retro-reflective lining behind them.', 9.2, 5.2, 3.5, 1.5, { fontSize: 12, color: C.muted, lineSpacingMultiple: 1.25 });
  footer(s);
  s.addNotes('The physics is simple and the reason it is defensible. Night-capable sensors respond to near-infrared light (roughly 700 to 1,000 nanometers) that the human eye cannot see. AntiCam projects a strong beam in that band toward any lens facing the wearer; the camera’s auto-exposure cannot compensate and the wearer washes out. For flash photography, a light sensor triggers a burst and the retro-reflective lining returns the flash to its source. The lower-left photo is a phone camera seeing the emitter as a magenta glow; the lower-right is the Cap V2 underside with the emitter array.');
}

// =====================================================================
// 6. PROOF
// =====================================================================
{
  const s = newSlide();
  eyebrow(s, 'Proof');
  headline(s, 'Tested on a live doorbell camera.', M, 0.98, 9, 32, 0.9);
  const iw = (CW - 0.35) / 2, ih = iw * 9 / 16, iy = 2.1;
  img(s, 'ring_off.jpg', M, iy, iw, ih, { cover: true });
  img(s, 'ring_on.jpg', M + iw + 0.35, iy, iw, ih, { cover: true });
  const x2 = M + iw + 0.35;
  chip(s, 'ANTICAM OFF', M + iw - 1.45 - 0.25, iy + 0.25, 1.45, { fill: C.bg, color: C.ink, line: C.border, fontSize: 9 });
  chip(s, 'ANTICAM ON', x2 + iw - 1.45 - 0.25, iy + 0.25, 1.45, { fill: C.accent, color: C.white, line: C.accent, fontSize: 9 });
  // highlight the person in the "on" frame and show a zoomed inset
  s.addShape(pres.ShapeType.roundRect, { x: x2 + 0.35 * iw, y: iy + 0.49 * ih, w: 0.21 * iw, h: 0.50 * ih, rectRadius: 0.08, fill: { color: C.accent, transparency: 100 }, line: { color: C.accent, width: 1.25 } });
  const zw = 1.55, zh = zw * 470 / 340;
  s.addShape(pres.ShapeType.roundRect, { x: x2 + iw - zw - 0.28, y: iy + ih - zh - 0.28, w: zw + 0.08, h: zh + 0.08, rectRadius: 0.12, fill: { color: C.bg }, line: { color: C.accent, width: 1.25 } });
  img(s, 'ring_on_zoom.jpg', x2 + iw - zw - 0.24, iy + ih - zh - 0.24, zw, zh, { cover: true, radius: 0.1 });
  text(s, 'Same Ring doorbell camera, same street, night mode. Right: a person wearing the pin prototype walks up the steps — the sensor records a glowing orb where the face should be. The camera itself is untouched and keeps recording.', M, iy + ih + 0.3, 8.9, 0.95, { fontSize: 13, color: C.ink, lineSpacingMultiple: 1.28 });
  text(s, 'Pin prototype V2  ·  June 2023  ·  frames captured from the camera’s own app', W - M - 3.0, iy + ih + 0.34, 3.0, 0.7, { fontSize: 9.5, color: C.muted, align: 'right', lineSpacingMultiple: 1.25 });
  footer(s);
  s.addNotes('This is the frame that matters. Both images come from the same Ring doorbell camera on the same street at night, captured from the camera’s own app. Left: the camera’s normal view. Right: someone wearing the pin prototype walks up the steps and the night-vision sensor records a glowing orb where the face should be — the person is unidentifiable while the camera keeps running normally. Nothing was jammed, disconnected or damaged.');
}

// =====================================================================
// 7. WHY NOW
// =====================================================================
{
  const s = newSlide('bg_plain.jpg');
  eyebrow(s, 'Why now');
  headline(s, 'Three shifts make wearable privacy inevitable.', M, 0.98, 11.5, 32, 0.9);
  const cols = [
    ['Cameras everywhere', '11 per 1,000', 'Surveillance cameras per 1,000 residents across the 50 largest U.S. cities — before counting doorbells and phones.', 'Comparitech, 2024'],
    ['AI changed what a photo can do', '10×', 'Growth in deepfake fraud from 2022 to 2023. Every captured face is now raw material for synthetic media.', 'Sumsub, via Security.org'],
    ['Rules exist; enforcement doesn’t', '55%', 'of hosts surveyed admit to indoor cameras — a year after Airbnb banned them (Apr 30, 2024).', 'IPX1031, 2025; Airbnb Help Center'],
  ];
  const cw = (CW - 0.8) / 3, cy = 2.15, ch = 4.15;
  cols.forEach((c, i) => {
    const x = M + i * (cw + 0.4);
    card(s, x, cy, cw, ch);
    text(s, c[0], x + 0.3, cy + 0.3, cw - 0.6, 0.7, { fontSize: 17, bold: true, color: C.ink, lineSpacingMultiple: 1.05 });
    text(s, c[1], x + 0.3, cy + 1.15, cw - 0.6, 0.8, { fontSize: 40, bold: true, color: C.accent, charSpacing: -1 });
    text(s, c[2], x + 0.3, cy + 2.05, cw - 0.6, 1.4, { fontSize: 12.5, color: C.ink, lineSpacingMultiple: 1.22 });
    text(s, c[3], x + 0.3, cy + ch - 0.55, cw - 0.6, 0.3, { fontSize: 9.5, color: C.muted });
  });
  footer(s);
  s.addNotes('Three things changed. First, density: 11 cameras per 1,000 residents across the 50 largest US cities, and that count excludes doorbells and phones. Second, AI: Sumsub reports deepfake fraud grew more than tenfold from 2022 to 2023, which turns any captured face into raw material. Third, regulation without enforcement: Airbnb banned indoor cameras in April 2024, yet a year later 55% of hosts in the IPX1031 survey admit to still using them. People need something that works regardless of who is following the rules.');
}

// =====================================================================
// 8. MARKET
// =====================================================================
{
  const s = newSlide();
  eyebrow(s, 'Market');
  headline(s, 'Sized bottom-up: 61M travelers, 35M of them worried.', M, 0.98, 11.8, 30, 0.9);
  const bars = [
    { label: 'TAM  ·  61M people', w: 7.3, fill: C.surface2, desc: 'Americans who stay in short-term rentals each year → $3.4B at a $55 device' },
    { label: 'SAM  ·  35M people', w: 4.9, fill: C.surface2, desc: 'The 58% who worry about hidden cameras where they stay → $1.9B' },
    { label: 'SOM  ·  35K units', w: 2.75, fill: C.accent, desc: '1 in 1,000 of them over three years → ~$1.9M in first sales' },
  ];
  bars.forEach((b, i) => {
    const y = 2.2 + i * 1.42;
    s.addShape(pres.ShapeType.roundRect, { x: M, y, w: b.w, h: 0.78, rectRadius: 0.12, fill: { color: b.fill }, line: { color: i === 2 ? C.accent : C.border, width: 0.75 } });
    text(s, b.label, M + 0.3, y, b.w - 0.4, 0.78, { fontSize: 14, bold: true, color: C.white, valign: 'middle' });
    text(s, b.desc, M, y + 0.86, 7.4, 0.45, { fontSize: 11.5, color: C.muted, lineSpacingMultiple: 1.15 });
  });
  text(s, 'Sources: AirDNA via ConsumerAffairs (60.9M U.S. short-term-rental users, 2022); IPX1031 2025 survey; $55 = midpoint of the cap price range. Bars not to scale.', M, 6.45, 7.4, 0.5, { fontSize: 9, color: C.dim, lineSpacingMultiple: 1.2 });
  const rx = 8.55, rw = W - M - rx;
  card(s, rx, 2.15, rw, 4.55);
  text(s, 'Beyond travelers', rx + 0.3, 2.42, rw - 0.6, 0.35, { fontSize: 15, bold: true, color: C.ink });
  ['Parents keeping their kids’ faces off the internet', 'Creators and public figures facing paparazzi', 'Journalists and activists under surveillance'].forEach((t, i) => {
    dot(s, rx + 0.32, 2.98 + i * 0.5, 0.09, C.accent, false);
    text(s, t, rx + 0.6, 2.87 + i * 0.5, rw - 0.9, 0.36, { fontSize: 12, color: C.ink, valign: 'middle' });
  });
  text(s, 'Adjacent spend today', rx + 0.3, 4.62, rw - 0.6, 0.35, { fontSize: 15, bold: true, color: C.ink });
  text(s, 'Hidden-camera detectors: $190M (2025) → $487M (2033), 12.5% CAGR. People already pay to find cameras; AntiCam lets them stop caring where the camera is.', rx + 0.3, 5.02, rw - 0.6, 1.2, { fontSize: 11.5, color: C.muted, lineSpacingMultiple: 1.22 });
  text(s, 'Cognitive Market Research, 2025', rx + 0.3, 6.28, rw - 0.6, 0.3, { fontSize: 9, color: C.dim });
  footer(s);
  s.addNotes('We size from the bottom up. About 61 million Americans stay in short-term rentals in a year (AirDNA, 2022). 58% of them say they worry about hidden cameras — that is roughly 35 million people who already feel the problem, worth about $1.9 billion at a $55 device. Our obtainable goal is one in a thousand of them over three years: about 35,000 units and $1.9 million. Parents, public figures, journalists and activists sit beyond the beachhead. And people already spend on this problem: the hidden-camera detector market is about $190 million and growing 12.5% a year.');
}

// =====================================================================
// 8b. MARKET MAP — every segment with a reason
// =====================================================================
{
  const s = newSlide('bg_plain.jpg');
  eyebrow(s, 'Market map');
  headline(s, 'Six markets share one need: control when you’re seen.', M, 0.98, 11.8, 32, 0.9);
  const cw = (CW - 0.8) / 3, ch = 2.15, y0 = 2.0, gap = 0.25;
  const segs = [
    { name: 'Short-term-rental travelers', why: 'Hidden cameras in bedrooms and bathrooms.', size: '61M Americans a year (AirDNA, 2022)', prod: 'Pin · Cap', pri: 'NOW', now: true },
    { name: 'Parents', why: 'Strangers’ phones, school events, kids’ faces harvested online.', size: '33.6M families with children under 18 (Census, 2025)', prod: 'Cap', pri: 'NEXT' },
    { name: 'Creators & public figures', why: 'Paparazzi, fans and stalkers — the flash problem.', size: '1.5M full-time U.S. creators (IAB, 2025), plus celebrities and athletes', prod: 'Cap · Pin', pri: 'NEXT' },
    { name: 'Journalists & activists', why: 'Surveillance while reporting or protesting.', size: 'Reached through press-freedom and advocacy organizations', prod: 'Pin · Cap', pri: 'LATER' },
    { name: 'Hosts, hotels & venues', why: '“Camera-free room” guarantee; no-photo zones for shows and private events.', size: '2.5M U.S. rental listings (AirDNA, 2023), plus hotels, clubs and clinics', prod: 'Room unit', pri: 'LATER' },
    { name: 'Executive protection', why: 'Executives and high-net-worth families who already pay for physical security.', size: 'Sold through security firms and family offices', prod: 'Cap · Pin · Room', pri: 'LATER' },
  ];
  segs.forEach((g, i) => {
    const x = M + (i % 3) * (cw + 0.4), y = y0 + Math.floor(i / 3) * (ch + gap);
    card(s, x, y, cw, ch, g.now ? { fill: { color: C.surface2 }, line: { color: C.accent, width: 1 } } : {});
    text(s, g.name, x + 0.28, y + 0.22, cw - 1.3, 0.32, { fontSize: 14, bold: true, color: C.ink });
    chip(s, g.pri, x + cw - 0.95, y + 0.22, 0.7, { h: 0.28, fontSize: 8, fill: g.now ? C.accent : C.surface2, color: g.now ? C.white : C.accentInk, line: g.now ? C.accent : C.border });
    text(s, g.why, x + 0.28, y + 0.58, cw - 0.56, 0.55, { fontSize: 10.5, color: C.muted, lineSpacingMultiple: 1.15 });
    text(s, g.size, x + 0.28, y + 1.12, cw - 0.56, 0.5, { fontSize: 10, color: C.ink, lineSpacingMultiple: 1.15 });
    chip(s, g.prod, x + 0.28, y + ch - 0.46, 1.45, { h: 0.28, fontSize: 8.5 });
  });
  text(s, 'Priority reflects pain, reach, willingness to pay, fit with today’s prototype, and ethical clarity — scored on the next slide.', M, 6.68, 11, 0.3, { fontSize: 9.5, color: C.dim });
  footer(s);
  s.addNotes('AntiCam is not a one-market product: anyone with a face has a reason to control when they are seen. Six segments matter. Short-term-rental travelers, 61 million Americans a year, facing hidden cameras. Parents, 33.6 million families, worried about strangers’ phones and their kids’ faces online. Creators and public figures, including 1.5 million full-time US creators, who deal with paparazzi, fans and the flash problem. Journalists and activists under surveillance, reached through press-freedom groups. Hosts, hotels and venues who could sell a camera-free guarantee with the room unit. And executive protection, sold through security firms. The pin and cap serve the first four; the room unit opens the last two.');
}

// =====================================================================
// 8c. PRIORITIZATION — why travelers first
// =====================================================================
{
  const s = newSlide();
  eyebrow(s, 'Go-to-market priority');
  headline(s, 'Travelers first — sharpest pain, easiest reach, best fit.', M, 0.98, 11.8, 32, 0.9);
  // scoring table
  const cols = ['Pain', 'Reach', 'Pays', 'Fit today', 'Ethics'];
  const rows = [
    ['Rental travelers', [3, 3, 2, 3, 3], true],
    ['Creators & public figures', [3, 2, 3, 2, 2], false],
    ['Parents', [2, 2, 2, 2, 3], false],
    ['Hosts, hotels & venues', [2, 2, 3, 1, 2], false],
    ['Executive protection', [2, 1, 3, 2, 2], false],
    ['Journalists & activists', [3, 1, 1, 2, 2], false],
  ];
  const tx = M, segW = 2.55, colW = 0.86, rowH = 0.56, hy = 2.12, ty = 2.5;
  const scoreX = tx + segW + cols.length * colW + 0.1;
  text(s, 'SEGMENT', tx + 0.2, hy, segW, 0.3, { fontSize: 8.5, bold: true, color: C.muted, charSpacing: 1.5 });
  cols.forEach((c, j) => text(s, c.toUpperCase(), tx + segW + j * colW, hy, colW, 0.3, { fontSize: 8.5, bold: true, color: C.muted, charSpacing: 1, align: 'center' }));
  text(s, 'SCORE', scoreX, hy, 0.7, 0.3, { fontSize: 8.5, bold: true, color: C.muted, charSpacing: 1, align: 'center' });
  rows.forEach((r, i) => {
    const y = ty + i * rowH;
    const tot = r[1].reduce((a, b) => a + b, 0);
    s.addShape(pres.ShapeType.roundRect, { x: tx, y: y + 0.03, w: scoreX + 0.7 - tx, h: rowH - 0.06, rectRadius: 0.1, fill: { color: r[2] ? C.surface2 : C.surface }, line: { color: r[2] ? C.accent : C.border, width: r[2] ? 1 : 0.75 } });
    text(s, r[0], tx + 0.2, y, segW - 0.2, rowH, { fontSize: 11.5, bold: r[2], color: C.ink, valign: 'middle' });
    r[1].forEach((v, j) => {
      const cx0 = tx + segW + j * colW + colW / 2 - 0.24;
      for (let k = 0; k < 3; k++) {
        s.addShape(pres.ShapeType.ellipse, { x: cx0 + k * 0.19, y: y + rowH / 2 - 0.055, w: 0.11, h: 0.11, fill: { color: k < v ? C.accent : C.border }, line: { color: C.bg, transparency: 100 } });
      }
    });
    text(s, `${tot}/15`, scoreX, y, 0.7, rowH, { fontSize: 11.5, bold: true, color: r[2] ? C.accent : C.ink, valign: 'middle', align: 'center' });
  });
  text(s, 'Founder’s assessment, 0–3 per criterion; to be re-scored after BUILD customer interviews.', tx, ty + rows.length * rowH + 0.08, 7.6, 0.3, { fontSize: 9, color: C.dim });
  // why travelers first
  const rx = 8.65, rw = W - M - rx;
  card(s, rx, hy, rw, 3.95);
  text(s, 'Why travelers first', rx + 0.28, hy + 0.22, rw - 0.56, 0.32, { fontSize: 14, bold: true, color: C.ink });
  const why = [
    ['Quantified pain', '47% have found a camera; 58% worry (IPX1031, 2025).'],
    ['Fit today', 'Dim, indoor rooms are where infrared saturation is strongest — the pin already works there.'],
    ['Reach', 'Travel forums and “hidden camera” videos are dense, searchable channels.'],
    ['Ethical clarity', 'Your own rented bedroom is the least controversial place to be invisible.'],
  ];
  why.forEach((w, i) => {
    const y = hy + 0.68 + i * 0.82;
    dot(s, rx + 0.3, y + 0.07, 0.09, C.accent, false);
    text(s, w[0], rx + 0.55, y - 0.03, rw - 0.85, 0.28, { fontSize: 11, bold: true, color: C.ink });
    text(s, w[1], rx + 0.55, y + 0.24, rw - 0.85, 0.58, { fontSize: 9.5, color: C.muted, lineSpacingMultiple: 1.15 });
  });
  // sequence
  const seq = [['NOW', 'Rental travelers  ·  pin + cap'], ['NEXT', 'Parents, creators & public figures  ·  cap'], ['LATER', 'Hosts, venues, security firms  ·  room unit']];
  const sw = (CW - 2 * 0.3) / 3, sy = 6.3;
  seq.forEach((q, i) => {
    const x = M + i * (sw + 0.3);
    s.addShape(pres.ShapeType.roundRect, { x, y: sy, w: sw, h: 0.46, rectRadius: 0.23, fill: { color: i === 0 ? C.accent : C.surface2 }, line: { color: i === 0 ? C.accent : C.border, width: 0.75 } });
    text(s, q[0], x + 0.25, sy, 0.75, 0.46, { fontSize: 9.5, bold: true, color: i === 0 ? C.white : C.accentInk, charSpacing: 1.5, valign: 'middle' });
    text(s, q[1], x + 0.9, sy, sw - 1.0, 0.46, { fontSize: 10, bold: i === 0, color: i === 0 ? C.white : C.ink, valign: 'middle' });
  });
  footer(s);
  s.addNotes('We scored every segment on five criteria: how sharp the pain is, how easy the buyers are to reach, willingness to pay, how well today’s prototype fits their situation, and how ethically clear the use is. Rental travelers score highest on almost everything: the pain is quantified, dim indoor rooms are exactly where infrared saturation works best, the buyers gather in searchable travel communities and already buy hidden-camera detectors, and nobody questions the right to privacy in your own rented bedroom. So the sequence is: travelers now with the pin and cap; parents, creators and public figures next with the cap; hosts, venues and security firms later once the room unit exists. These scores are my assessment and get re-scored after the BUILD interviews.');
}

// =====================================================================
// 9. PRODUCT LINE & BUSINESS MODEL
// =====================================================================
{
  const s = newSlide('bg_plain.jpg');
  eyebrow(s, 'Product & business model');
  headline(s, 'Three products, one platform — all under $100.', M, 0.98, 11.5, 32, 0.9);
  const cw = (CW - 0.8) / 3, cy = 2.05, ch = 3.25;
  const prods = [
    { name: 'Clip-on Pin', price: '$30–45', desc: 'Entry product. One-direction coverage; clips to a strap, lapel or bag.', im: 'pin_v2_cut.png', iw: 1.9, ih: 1.76 },
    { name: 'Cap', price: '$40–65', desc: 'Flagship. 360° coverage, retro-reflective lining, flash detection.', im: 'cap_side_cut.png', iw: 2.0, ih: 1.92 },
    { name: 'Room Unit', price: '$100+', desc: 'Whole-room coverage for rentals and hotel rooms. Next in line.', im: null },
  ];
  prods.forEach((p, i) => {
    const x = M + i * (cw + 0.4);
    card(s, x, cy, cw, ch);
    if (p.im) img(s, p.im, x + (cw - p.iw) / 2, cy + 0.15, p.iw, p.ih, { round: false });
    else {
      // LED-grid glyph for the planned room unit
      const gx = x + cw / 2 - 0.75, gy = cy + 0.35;
      s.addShape(pres.ShapeType.roundRect, { x: gx, y: gy, w: 1.5, h: 1.5, rectRadius: 0.2, fill: { color: C.surface2 }, line: { color: C.border, width: 0.75 } });
      for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
        const on = !(r === 1 && c === 1);
        s.addShape(pres.ShapeType.ellipse, { x: gx + 0.33 + c * 0.42, y: gy + 0.33 + r * 0.42, w: 0.16, h: 0.16, fill: { color: on ? C.accent : C.border }, line: { color: C.bg, transparency: 100 } });
      }
    }
    text(s, p.name, x + 0.3, cy + 2.05, cw - 1.5, 0.35, { fontSize: 16, bold: true, color: C.ink });
    text(s, p.price, x + cw - 1.5, cy + 2.05, 1.2, 0.35, { fontSize: 16, bold: true, color: C.accent, align: 'right' });
    text(s, p.desc, x + 0.3, cy + 2.45, cw - 0.6, 0.7, { fontSize: 11.5, color: C.muted, lineSpacingMultiple: 1.2 });
  });
  const by = 5.55, bw = (CW - 0.8) / 3;
  const econ = [
    ['Est. bill of materials', '$15–25 per unit at low volume: IR LED array, Li-ion cell + USB-C charging, light sensor + microcontroller, retro-reflective fabric, enclosure.'],
    ['Gross margin', '~55–65% at a $55 average price; improves with contract manufacturing and volume LED pricing.'],
    ['Channels', 'Direct at tullytech.com → Amazon & Etsy → creator and travel-community partnerships.'],
  ];
  econ.forEach((e, i) => {
    const x = M + i * (bw + 0.4);
    text(s, e[0], x, by, bw, 0.3, { fontSize: 11, bold: true, color: C.accentInk, charSpacing: 1 });
    text(s, e[1], x, by + 0.33, bw, 0.95, { fontSize: 10.5, color: C.muted, lineSpacingMultiple: 1.2 });
  });
  text(s, 'Prices from the Tully Tech product plan; BOM and margin are founder estimates to be validated with the BUILD finance team.', M, 6.68, 10, 0.3, { fontSize: 9, color: C.dim });
  footer(s);
  s.addNotes('Three products share the same emitter, driver and battery platform. The pin is the entry product at $30 to $45; the cap is the flagship at $40 to $65 with full coverage, retro-reflective lining and flash detection; a room unit at $100-plus is next. Estimated bill of materials is $15 to $25 at low volume, which supports roughly 55 to 65% gross margin at a $55 average price — these are founder estimates to be validated with real supplier quotes during BUILD. Distribution starts direct on tullytech.com, then Amazon and Etsy, then creator and travel-community partnerships.');
}

// =====================================================================
// 10. TRACTION
// =====================================================================
{
  const s = newSlide();
  eyebrow(s, 'Traction');
  headline(s, 'Two years, 30+ prototypes, four major versions.', M, 0.98, 11.5, 32, 0.9);
  const cw = (CW - 3 * 0.25) / 4, iy = 2.05, ih = 2.25;
  const vs = [
    ['V1', 'Proof of physics', 'Single IR module and coin cells. Confirmed: cameras see it, eyes don’t.', 'proto_v1.jpg'],
    ['V2', 'First enclosure', 'Laser-cut housing turns the module into something you can carry.', 'proto_v2.jpg'],
    ['V3', 'Clip-on device', 'Branded enclosure with a charging port; tested against real cameras.', 'proto_v3.jpg'],
    ['V4', 'Pin V2 + Cap V2', 'Clear pin and under-brim cap array; passed the doorbell-camera test.', 'proto_v4.jpg'],
  ];
  vs.forEach((v, i) => {
    const x = M + i * (cw + 0.25);
    img(s, v[3], x, iy, cw, ih, { cover: true });
    chip(s, v[0], x + 0.2, iy + 0.2, 0.7, { fill: C.bg, color: C.ink, line: C.border, fontSize: 9 });
    text(s, v[1], x, iy + ih + 0.22, cw, 0.32, { fontSize: 14.5, bold: true, color: C.ink });
    text(s, v[2], x, iy + ih + 0.56, cw, 0.9, { fontSize: 11.5, color: C.muted, lineSpacingMultiple: 1.2 });
  });
  const chips = ['Website & launch strategy built', 'Ethics & legality research, 2025', 'Faculty-sponsored Mastery project: optics & engineering', 'Doorbell-camera test passed'];
  const widths = [2.55, 2.5, 4.35, 2.25];
  let cx = M;
  chips.forEach((c, i) => { chip(s, c, cx, 6.2, widths[i], { fontSize: 9.5 }); cx += widths[i] + 0.14; });
  footer(s);
  s.addNotes('This is not a concept. Over two years and more than 30 prototypes, AntiCam has gone through four major versions: a bare IR module proving that cameras see it and eyes don’t; a laser-cut enclosure; a branded, rechargeable clip-on; and the current generation — a clear pin and a cap with the array under the brim — which passed the doorbell-camera test. Alongside the hardware: a website and launch strategy, a full ethics and legality analysis, and a faculty-sponsored Mastery project covering the optics, the engineering and the global implications.');
}

// =====================================================================
// 11. COMPETITION 2x2
// =====================================================================
{
  const s = newSlide('bg_plain.jpg');
  eyebrow(s, 'Competition');
  headline(s, 'The only option that is both legal and active.', M, 0.98, 9.5, 32, 0.9);
  const mx = 1.05, my = 2.05, mw = 6.9, mh = 4.5;
  // quadrants
  const q = [[mx, my], [mx + mw / 2 + 0.06, my], [mx, my + mh / 2 + 0.06], [mx + mw / 2 + 0.06, my + mh / 2 + 0.06]];
  q.forEach((p, i) => s.addShape(pres.ShapeType.roundRect, { x: p[0], y: p[1], w: mw / 2 - 0.06, h: mh / 2 - 0.06, rectRadius: 0.12, fill: { color: i === 1 ? C.surface2 : C.surface }, line: { color: i === 1 ? C.accent : C.border, width: i === 1 ? 1 : 0.75 } }));
  // axis labels
  text(s, 'ACTIVE PROTECTION  ↑', mx - 1.35, my + mh / 2 - 0.15, 2.2, 0.3, { fontSize: 8.5, bold: true, color: C.muted, rotate: 270, charSpacing: 1.5, align: 'center', valign: 'middle' });
  text(s, 'LEGAL & HARMLESS  →', mx, my + mh + 0.12, mw, 0.3, { fontSize: 8.5, bold: true, color: C.muted, align: 'center', charSpacing: 1.5 });
  // points: [x frac, y frac (0 = top), label, isUs]
  const pts = [
    [0.22, 0.22, 'RF jammers\nactive, illegal, $$$', false],
    [0.72, 0.84, 'Hidden-camera detectors\nfind, don’t block · $20–200', false],
    [0.62, 0.60, 'IR-blocking eyewear\nface only · $48–228', false],
    [0.75, 0.72, 'Adversarial apparel\nalgorithm-dependent', false],
    [0.65, 0.17, 'AntiCam\nactive · legal · under $100', true],
  ];
  pts.forEach((p) => {
    const px = mx + p[0] * mw, py = my + p[1] * mh;
    if (p[3]) { dot(s, px - 0.11, py - 0.11, 0.22); }
    else s.addShape(pres.ShapeType.ellipse, { x: px - 0.08, y: py - 0.08, w: 0.16, h: 0.16, fill: { color: C.muted }, line: { color: C.muted, transparency: 100 } });
    text(s, p[2], px + 0.2, py - 0.2, 2.3, 0.5, { fontSize: p[3] ? 11 : 9.5, bold: p[3], color: p[3] ? C.ink : C.muted, lineSpacingMultiple: 1.15 });
  });
  const rx = 8.55, rw = W - M - rx;
  card(s, rx, my, rw, mh);
  text(s, 'Why it holds', rx + 0.3, my + 0.28, rw - 0.6, 0.35, { fontSize: 15, bold: true, color: C.ink });
  const why = [
    ['Physics, not patterns', 'Sensor saturation doesn’t care which recognition model is running.'],
    ['Legal by design', 'Light, not radio — outside the FCC’s jammer rules.'],
    ['Price', 'A cap for less than a pair of privacy glasses.'],
    ['What we watch', 'Daylight performance, IR-cut filters, copycats. Our edge is speed and design, not a patent — yet.'],
  ];
  why.forEach((w, i) => {
    const y = my + 0.78 + i * 0.9;
    dot(s, rx + 0.32, y + 0.08, 0.09, C.accent, false);
    text(s, w[0], rx + 0.6, y - 0.03, rw - 0.9, 0.3, { fontSize: 12, bold: true, color: C.ink });
    text(s, w[1], rx + 0.6, y + 0.27, rw - 0.9, 0.6, { fontSize: 10.5, color: C.muted, lineSpacingMultiple: 1.18 });
  });
  footer(s);
  s.addNotes('Two axes matter to a buyer: is it legal and harmless, and does it actively stop the camera. Jammers are active but illegal. Detectors and adversarial clothing are legal but passive or partial. IR-blocking eyewear covers the eyes only, at $48 to $228. AntiCam is the only option in the top-right quadrant. We are honest about what we watch: bright daylight, cameras with IR-cut filters, and copycats — our defense today is execution speed and design, not a patent.');
}

// =====================================================================
// 12. RESPONSIBLE DESIGN
// =====================================================================
{
  const s = newSlide();
  eyebrow(s, 'Responsible design');
  headline(s, 'Built to protect people, not to hide crimes.', M, 0.98, 9.5, 32, 0.9);
  const lw = 6.4;
  bulletRow(s, 'Harmless by physics', 'Infrared light only. No radio interference, no damage to cameras or networks — nothing a jammer does.', M, 2.3, lw, { descH: 0.8 });
  bulletRow(s, 'Honest about limits', 'Weaker in bright daylight. Not for evading traffic or law-enforcement cameras, and not for use in restricted areas.', M, 3.65, lw, { descH: 0.8 });
  bulletRow(s, 'Intended use, stated up front', 'Clear terms at checkout and in manufacturing partnerships. Misuse is a choice we design and communicate against.', M, 5.0, lw, { descH: 0.8 });
  const rx = 7.8, rw = W - M - rx;
  card(s, rx, 2.15, rw, 3.75, { fill: { color: C.surface2 } });
  text(s, '“', rx + 0.35, 2.2, 1, 0.9, { fontSize: 60, bold: true, color: C.accent });
  text(s, 'Camera jammers already give this capability to people willing to break the law. AntiCam gives it to everyone else — the traveler, the parent, the reporter.', rx + 0.4, 3.05, rw - 0.8, 2.2, { fontSize: 15, color: C.ink, lineSpacingMultiple: 1.3 });
  text(s, 'Alex Tully, Ethics of Tully Tech (2025)', rx + 0.4, 5.3, rw - 0.8, 0.3, { fontSize: 10, color: C.muted });
  footer(s);
  s.addNotes('Every judge will ask about misuse, so we answer first. AntiCam is harmless by physics: it emits light, not radio, so it cannot jam a network or damage a camera. We are honest about limits — it is weaker in bright daylight and it is not for evading traffic or law-enforcement cameras or restricted areas — and intended use is stated at checkout and in every manufacturing partnership. The core argument from the 2025 ethics analysis: jammers already give this capability to people willing to break the law; AntiCam gives it to everyone else.');
}

// =====================================================================
// 13. FOUNDER
// =====================================================================
{
  const s = newSlide('bg_plain.jpg');
  eyebrow(s, 'Founder');
  headline(s, 'A hardware founder who ships.', M, 0.98, 9, 32, 0.9);
  const lx = M, lw = 4.1, ly = 2.05, lh = 4.25;
  card(s, lx, ly, lw, lh);
  s.addShape(pres.ShapeType.ellipse, { x: lx + 0.35, y: ly + 0.3, w: 1.0, h: 1.0, fill: { color: C.surface2 }, line: { color: C.accent, width: 1.25 } });
  text(s, 'AT', lx + 0.35, ly + 0.3, 1.0, 1.0, { fontSize: 22, bold: true, color: C.accent, align: 'center', valign: 'middle' });
  text(s, 'Alexander Tully', lx + 0.35, ly + 1.45, lw - 0.7, 0.4, { fontSize: 20, bold: true, color: C.ink });
  text(s, 'Founder, Tully Tech\nUSC Iovine and Young Academy, Class of 2030', lx + 0.35, ly + 1.9, lw - 0.7, 0.72, { fontSize: 12, color: C.muted, lineSpacingMultiple: 1.25 });
  text(s, 'Hardware and product designer: CAD, embedded systems, fabrication. Two years on AntiCam; a decade of building things that ship.', lx + 0.35, ly + 2.8, lw - 0.7, 1.1, { fontSize: 11.5, color: C.ink, lineSpacingMultiple: 1.25 });
  text(s, 'alexptully@gmail.com  ·  tullytech.com', lx + 0.35, ly + lh - 0.5, lw - 0.7, 0.3, { fontSize: 10, color: C.muted });
  const rx = 5.15, rw = W - M - rx, colw = (rw - 0.35) / 2;
  const creds = [
    ['Research-grade fabrication software', 'Research intern, Cornell Tech × Technion: developed CeraPiper, CAD-to-clay fabrication software from an ACM SCF 2025 research project.'],
    ['90+ prosthetic prototypes', 'Stevens Institute research: a digitally-resizable prosthetic arm buildable for under $100.'],
    ['Championship robotics', 'FTC captain & electrical lead: 2× NYC champion (Inspire Award), 2nd-place Think Award at Worlds.'],
    ['Startup operations', 'Octura (fintech startup) intern: market analysis, CLO models, investor calls and site visits.'],
    ['Design & fabrication', 'SolidWorks, Fusion 360, Onshape; 3D printing and laser cutting; Python, Arduino, C++.'],
    ['Built and sold before', 'Eight commercial websites coded; four small businesses started before high school.'],
  ];
  creds.forEach((c, i) => {
    const x = rx + (i % 2) * (colw + 0.35), y = 2.15 + Math.floor(i / 2) * 1.45;
    dot(s, x + 0.02, y + 0.09, 0.1, C.accent, false);
    text(s, c[0], x + 0.3, y - 0.02, colw - 0.3, 0.3, { fontSize: 13, bold: true, color: C.ink });
    text(s, c[1], x + 0.3, y + 0.3, colw - 0.3, 0.95, { fontSize: 11, color: C.muted, lineSpacingMultiple: 1.2 });
  });
  s.addShape(pres.ShapeType.roundRect, { x: M, y: 6.48, w: CW, h: 0.42, rectRadius: 0.1, fill: { color: C.surface2 }, line: { color: C.border, width: 0.75 } });
  dot(s, M + 0.28, 6.64, 0.1, C.accent, false);
  text(s, 'Missing today: industrial design, brand & marketing, finance — exactly the roles a BUILD team fills.', M + 0.55, 6.48, CW - 0.8, 0.42, { fontSize: 11, bold: true, color: C.accentInk, valign: 'middle' });
  footer(s);
  s.addNotes('I am a hardware and product designer who has shipped before. At Cornell Tech with Technion I developed CeraPiper, CAD-to-clay fabrication software that grew out of an ACM SCF 2025 research project. At Stevens I iterated more than 90 prototypes of an adaptive prosthetic arm. I captained a FIRST Tech Challenge team to two NYC championships and a second-place Think Award at Worlds. I have sat in on investor calls at a fintech startup, coded eight commercial websites, and started four small businesses before high school. What the team is missing — industrial design, brand and marketing, finance — is exactly what a BUILD team brings.');
}

// =====================================================================
// 14. THE ASK — TROYLABS BUILD
// =====================================================================
{
  const s = newSlide();
  eyebrow(s, 'The ask  ·  TroyLabs BUILD');
  headline(s, 'What we’d build in eight weeks with TroyLabs.', M, 0.98, 10, 32, 0.9);
  const ws = [
    ['ENGINEERING', 'Hand-built → custom PCB; battery and IR eye-safety testing; daylight performance benchmark.'],
    ['DESIGN', 'Industrial design of the cap and pin; AntiCam brand system and packaging.'],
    ['PRODUCT', '25+ interviews with rental travelers and parents; feature and price validation.'],
    ['FINANCE / VC', 'Supplier quotes, real bill of materials, unit economics and a pre-seed model.'],
    ['MARKETING', 'Waitlist launch on tullytech.com; creator and travel-community seeding.'],
    ['DEMO OPS', 'LAUNCH pitch with a 100-unit pilot plan and first pre-orders in hand.'],
  ];
  const cw = (CW - 0.8) / 3, ch = 1.62;
  ws.forEach((w, i) => {
    const x = M + (i % 3) * (cw + 0.4), y = 2.05 + Math.floor(i / 3) * (ch + 0.3);
    card(s, x, y, cw, ch);
    dot(s, x + 0.3, y + 0.34, 0.1, C.accent, false);
    text(s, w[0], x + 0.55, y + 0.25, cw - 0.85, 0.3, { fontSize: 10.5, bold: true, color: C.accentInk, charSpacing: 2 });
    text(s, w[1], x + 0.3, y + 0.65, cw - 0.6, 0.9, { fontSize: 12, color: C.ink, lineSpacingMultiple: 1.22 });
  });
  const ms = ['Wk 2  ·  interviews done', 'Wk 4  ·  works-like V5', 'Wk 6  ·  waitlist live', 'Wk 8  ·  LAUNCH pitch'];
  const mw = (CW - 3 * 0.25) / 4;
  s.addShape(pres.ShapeType.line, { x: M + 0.5, y: 6.18, w: CW - 1.0, h: 0, line: { color: C.border, width: 1 } });
  ms.forEach((m, i) => chip(s, m, M + i * (mw + 0.25), 6.0, mw, { fontSize: 10.5, fill: i === 3 ? C.accent : C.surface2, color: C.white, line: i === 3 ? C.accent : C.border }));
  text(s, 'alexptully@gmail.com  ·  tullytech.com', M, 6.62, 8, 0.3, { fontSize: 10.5, color: C.muted });
  footer(s);
  s.addNotes('The ask is a spot in BUILD, and here is what a six-person cross-functional team would do with eight weeks. Engineering moves the device from hand-built to a custom PCB with battery and eye-safety testing. Design gives the cap and pin real industrial design and a brand. Product runs 25-plus interviews with rental travelers and parents to validate features and price. Finance turns supplier quotes into a real bill of materials and unit economics. Marketing launches the waitlist on tullytech.com. Demo Ops takes us to LAUNCH with a 100-unit pilot plan and first pre-orders. Milestones: interviews by week two, a works-like V5 by week four, waitlist live by week six, LAUNCH at week eight.');
}

// =====================================================================
// 15. CLOSE
// =====================================================================
{
  const s = newSlide('bg_close.jpg');
  dot(s, W / 2 - 0.065, 2.35, 0.13);
  text(s, 'ANTICAM  ·  TULLY TECH', 0, 2.72, W, 0.3, { fontSize: 11, bold: true, color: C.accentInk, charSpacing: 4, align: 'center' });
  text(s, 'Privacy you can wear.', 0, 3.1, W, 1.1, { fontSize: 54, bold: true, color: C.white, align: 'center', charSpacing: -1 });
  text(s, 'Thank you.', 0, 4.35, W, 0.5, { fontSize: 20, color: C.ink, align: 'center' });
  text(s, 'Alexander Tully  ·  alexptully@gmail.com  ·  tullytech.com', 0, 5.0, W, 0.35, { fontSize: 12, color: C.muted, align: 'center' });
  s.addNotes('Close: privacy you can wear. Thank you — questions welcome.');
}

// =====================================================================
// 16. APPENDIX — INVESTOR VIEW
// =====================================================================
{
  const s = newSlide();
  eyebrow(s, 'Appendix  ·  for investors');
  headline(s, 'Looking ahead: what a first raise would fund.', M, 0.98, 11.5, 32, 0.9);
  text(s, 'Illustrative pre-seed', M, 2.15, 6, 0.3, { fontSize: 11, bold: true, color: C.accentInk, charSpacing: 2 });
  text(s, '$150K', M, 2.45, 6, 0.9, { fontSize: 54, bold: true, color: C.ink, charSpacing: -2 });
  text(s, 'After BUILD: from validated prototype to a first production run.', M, 3.4, 6.4, 0.4, { fontSize: 13, color: C.muted });
  const uses = [
    [40, 'Tooling & first 1,000-unit production run'],
    [25, 'Engineering & compliance: PCB, battery safety, IR eye-safety certification'],
    [20, 'Go-to-market: launch content, creator partnerships, Amazon setup'],
    [15, 'Operations, legal and IP'],
  ];
  uses.forEach((u, i) => {
    const y = 4.05 + i * 0.62;
    const bw = 6.4 * u[0] / 40;
    s.addShape(pres.ShapeType.roundRect, { x: M, y, w: bw, h: 0.34, rectRadius: 0.08, fill: { color: i === 0 ? C.accent : C.surface2 }, line: { color: i === 0 ? C.accent : C.border, width: 0.75 } });
    text(s, `${u[0]}%`, M + 0.15, y, 0.8, 0.34, { fontSize: 11, bold: true, color: C.white, valign: 'middle' });
    text(s, u[1], M + 6.65, y, 5.9, 0.34, { fontSize: 11, color: C.ink, valign: 'middle' });
  });
  text(s, 'Illustrative figures — to be finalized with the BUILD finance team.', M, 6.68, 10, 0.3, { fontSize: 9, color: C.dim });
  footer(s);
  s.addNotes('For investors: an illustrative $150K pre-seed after BUILD would take AntiCam from validated prototype to a first 1,000-unit run. Roughly 40% tooling and production, 25% engineering and compliance including IR eye-safety certification, 20% go-to-market, 15% operations, legal and IP. Figures are illustrative and will be finalized with the BUILD finance team.');
}

pres.writeFile({ fileName: path.join(__dirname, 'AntiCam-Pitch-Deck.pptx') }).then((f) => console.log('wrote', f));

const DEFAULT_WEIGHTS = Object.freeze({
  pain: 2.2,
  buyer: 2.0,
  mattFit: 2.4,
  buildSpeed: 1.8,
  proof: 1.7,
  scale: 1.1,
  risk: -1.8,
});

const DISPOSITIONS = Object.freeze({
  DO_NOW: 'A. Do Now',
  FAST_CASH: 'C. Turn Into Digital Product / Service',
  SAAS: 'D. Turn Into SaaS',
  CONTENT: 'E. Turn Into Content',
  PARK: 'B. Do Later',
  IGNORE: 'G. Ignore For Now',
});

const seedCards = [
  {
    id: 'lead-rescue-support-agent',
    title: 'AI Lead Rescue / Customer Support Agent',
    domain: 'automation/local-service',
    customer: 'Small service businesses that miss enquiries, quote requests, or support messages',
    problem: 'Slow or missed replies lose high-intent jobs and make owners look disorganised.',
    productAngle: '$299 AUD setup: local FAQ/knowledge-base response assistant with manual approval and urgent-lead rules.',
    fastProduct: 'Landing page + outreach tracker + installable local support-draft tool.',
    biggerToolPath: 'Hosted LeadRescue CRM with inbox import, ticket history, client knowledge bases, analytics, and monthly support.',
    launchChannel: 'Direct outreach to Perth electricians, repair shops, IT support, aircon installers, hydro/hardware stores.',
    firstAction: 'Send 10 outreach messages with a live demo link and $299 intro offer.',
    pain: 8,
    buyer: 8,
    mattFit: 9,
    buildSpeed: 8,
    proof: 7,
    scale: 7,
    risk: 3,
    tags: ['fast-cash', 'main-business', 'already-built'],
  },
  {
    id: 'hydrotrack-rescue-kit',
    title: 'Hydroponics pH/EC Rescue Kit',
    domain: 'hydroponics',
    customer: 'New hydroponic growers who keep chasing pH/EC problems and killing plants',
    problem: 'Beginners do not know whether issues are nutrients, pH drift, EC, temperature, light, or bad measurement habits.',
    productAngle: '$9-$19 AUD troubleshooting PDF + log sheet + simple calculator.',
    fastProduct: 'A4 printable rescue checklist and grow-log template.',
    biggerToolPath: 'HydroTrack AI app with sensor logging, alerts, diagnosis, and local grow-room dashboard.',
    launchChannel: 'Hydroponics groups, Gumtree, local hydro stores, Reddit grow subs.',
    firstAction: 'Build 12-page PDF and one simple pH/EC log calculator.',
    pain: 7,
    buyer: 7,
    mattFit: 10,
    buildSpeed: 8,
    proof: 6,
    scale: 8,
    risk: 4,
    tags: ['digital-product', 'hydrotrack'],
  },
  {
    id: 'repairflip-buy-checklist',
    title: 'RepairFlip Buy / No-Buy Checklist',
    domain: 'electronics/repair',
    customer: 'People buying broken electronics to repair, flip, or avoid bad deals',
    problem: 'Buyers cannot quickly judge if a broken item is profitable, unsafe, missing parts, or too risky.',
    productAngle: '$7-$15 AUD checklist + profit calculator for low-voltage repair flips.',
    fastProduct: 'Printable inspection checklist + CSV calculator + Gumtree listing copy helper.',
    biggerToolPath: 'RepairFlipForge app with item database, profit thresholds, fault logs, and honest listing generator.',
    launchChannel: 'Facebook Marketplace, Gumtree, electronics repair groups, maker communities.',
    firstAction: 'Build checklist PDF and calculator sheet.',
    pain: 7,
    buyer: 6,
    mattFit: 9,
    buildSpeed: 8,
    proof: 6,
    scale: 6,
    risk: 5,
    tags: ['fast-cash', 'electronics'],
  },
  {
    id: 'pokemon-tcg-deck-helper',
    title: 'Pokémon TCG Decklist Cleaner + Practice Script Tool',
    domain: 'pokemon-tcg',
    customer: 'Pokémon TCG players who screenshot decks, miscount lists, or need low-cognitive-load play scripts',
    problem: 'Players struggle to convert deck screenshots/exports into clean lists and simple turn plans.',
    productAngle: 'Free/cheap web tool: paste PTCGL export or image notes, get clean list, counts, and a 5-turn script.',
    fastProduct: 'Static decklist formatter + practice checklist; later OCR if screenshots improve.',
    biggerToolPath: 'MetaForge TCG scanner/analyser with card lookup, meta suggestions, and dyslexia-friendly coaching.',
    launchChannel: 'Local Pokémon groups, Limitless-style deck sharing, TCG Discords, YouTube Shorts.',
    firstAction: 'Build PTCGL text parser and deck-count checker first; image OCR later.',
    pain: 6,
    buyer: 5,
    mattFit: 9,
    buildSpeed: 7,
    proof: 5,
    scale: 7,
    risk: 5,
    tags: ['fun', 'content', 'tcg'],
  },
  {
    id: 'nova-improvement-loop',
    title: 'NOVA Improvement Loop Dashboard',
    domain: 'agent-os',
    customer: 'Matt and NOVA operating across many projects',
    problem: 'Good decisions and corrections disappear into chat history; project context gets diluted.',
    productAngle: 'Manual dashboard that turns messy sessions into memory candidates, skill candidates, and next actions.',
    fastProduct: 'Paste session notes -> get compressed context packet and improvement recommendations.',
    biggerToolPath: 'AgentForge OS self-improving project operator with memory QA, skill proposals, and product routing.',
    launchChannel: 'Internal only first; build-in-public later if useful.',
    firstAction: 'Add session paste analyser and context packet generator to this Product Forge.',
    pain: 8,
    buyer: 4,
    mattFit: 10,
    buildSpeed: 7,
    proof: 8,
    scale: 6,
    risk: 3,
    tags: ['internal', 'agentforge'],
  },
  {
    id: 'perth-no-website-audit',
    title: 'Perth No-Website / Bad-Website Audit Kit',
    domain: 'local-service/leadgen',
    customer: 'Local trades and service businesses with weak web presence or no enquiry capture',
    problem: 'Owners lose work because their online profile does not capture, answer, or follow up with leads.',
    productAngle: '$299 AI Lead Rescue Audit with screenshots, missed-lead risks, and setup quote.',
    fastProduct: 'Audit checklist + landing page + outreach CSV.',
    biggerToolPath: 'LeadRescue OS: website audit, support agent, follow-up CRM, quote tracker.',
    launchChannel: 'Google Maps/manual search, Gumtree, Facebook business pages.',
    firstAction: 'Create 20-lead CSV and send 5 messages.',
    pain: 8,
    buyer: 7,
    mattFit: 8,
    buildSpeed: 9,
    proof: 6,
    scale: 7,
    risk: 4,
    tags: ['fast-cash', 'local'],
  },
];

function clampScore(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return Math.max(0, Math.min(10, number));
}

function scoreCard(card, weights = DEFAULT_WEIGHTS) {
  const positive = ['pain', 'buyer', 'mattFit', 'buildSpeed', 'proof', 'scale']
    .reduce((sum, key) => sum + clampScore(card[key]) * weights[key], 0);
  const riskPenalty = clampScore(card.risk) * Math.abs(weights.risk || 0);
  const raw = positive - riskPenalty;
  const max = 10 * (weights.pain + weights.buyer + weights.mattFit + weights.buildSpeed + weights.proof + weights.scale);
  return Math.round((raw / max) * 100);
}

function chooseDisposition(card, score = scoreCard(card)) {
  const tags = new Set(card.tags || []);
  if (card.risk >= 8 || score < 35) return DISPOSITIONS.IGNORE;
  if (tags.has('already-built') && score >= 65) return DISPOSITIONS.DO_NOW;
  if (tags.has('fast-cash') && score >= 55) return DISPOSITIONS.FAST_CASH;
  if (tags.has('digital-product') && score >= 55) return DISPOSITIONS.FAST_CASH;
  if (tags.has('content') && score >= 45) return DISPOSITIONS.CONTENT;
  if (score >= 72) return DISPOSITIONS.DO_NOW;
  if (score >= 60) return DISPOSITIONS.SAAS;
  return DISPOSITIONS.PARK;
}

function rankCards(cards = seedCards, weights = DEFAULT_WEIGHTS) {
  return [...cards]
    .map((card) => {
      const score = scoreCard(card, weights);
      return { ...card, score, disposition: chooseDisposition(card, score) };
    })
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
}

function selectNextBuild(cards = seedCards) {
  const ranked = rankCards(cards);
  return ranked.find((card) => card.disposition.startsWith('A.')) || ranked[0];
}

function makeForgeRecipe(card) {
  const selected = { ...card, score: card.score ?? scoreCard(card), disposition: card.disposition ?? chooseDisposition(card) };
  return {
    title: selected.title,
    disposition: selected.disposition,
    score: selected.score,
    bucket: selected.tags?.includes('fast-cash') ? 'Fast Cash' : selected.tags?.includes('internal') ? 'Main Business infrastructure' : 'Main Business',
    whatToBuildThisWeek: selected.fastProduct,
    whoToTestWith: selected.customer,
    firstThreeActions: [
      selected.firstAction,
      'Create a tiny demo/asset that proves the promise in under 30 minutes.',
      'Test it with 3 real humans or 10 targeted outreach messages before adding features.',
    ],
    biggerPath: selected.biggerToolPath,
  };
}

function buildContextPacket(cards = seedCards) {
  const top = rankCards(cards).slice(0, 3);
  const next = makeForgeRecipe(top[0]);
  return [
    '# NOVA Product Forge Context Packet',
    '',
    `Next recommended build: ${next.title}`,
    `Score: ${next.score}`,
    `Disposition: ${next.disposition}`,
    `Bucket: ${next.bucket}`,
    '',
    '## Why',
    top.map((card, index) => `${index + 1}. ${card.title} — ${card.score}/100 — ${card.productAngle}`).join('\n'),
    '',
    '## Immediate actions',
    next.firstThreeActions.map((action, index) => `${index + 1}. ${action}`).join('\n'),
    '',
    '## Rule',
    'Do not build feature 2 until one real person has seen feature 1.',
  ].join('\n');
}

if (typeof module !== 'undefined') {
  module.exports = {
    DEFAULT_WEIGHTS,
    DISPOSITIONS,
    seedCards,
    scoreCard,
    chooseDisposition,
    rankCards,
    selectNextBuild,
    makeForgeRecipe,
    buildContextPacket,
  };
}

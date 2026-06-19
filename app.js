const ranked = rankCards(seedCards);
const next = makeForgeRecipe(ranked[0]);

function badgeClass(disposition) {
  if (disposition.startsWith('A.')) return 'a';
  if (disposition.startsWith('C.')) return 'c';
  return '';
}

function renderNext() {
  const el = document.querySelector('#nextBuild');
  el.innerHTML = `
    <div class="next-grid">
      <div class="score">${next.score}</div>
      <div>
        <p class="eyebrow">Recommended next build</p>
        <h2>${next.title}</h2>
        <p><strong>${next.disposition}</strong> · ${next.bucket}</p>
        <p>${next.whatToBuildThisWeek}</p>
        <div class="badges">
          <span class="badge a">Ship this week</span>
          <span class="badge">Test before features</span>
          <span class="badge">Manual approval</span>
        </div>
        <h3>First 3 actions</h3>
        <ol>${next.firstThreeActions.map((action) => `<li>${action}</li>`).join('')}</ol>
      </div>
    </div>
  `;
}

function renderCards() {
  const el = document.querySelector('#cards');
  el.innerHTML = ranked.map((card) => `
    <article class="card">
      <div class="score">${card.score}</div>
      <h3>${card.title}</h3>
      <div class="badges">
        <span class="badge ${badgeClass(card.disposition)}">${card.disposition}</span>
        <span class="badge">${card.domain}</span>
      </div>
      <p><strong>Customer:</strong> ${card.customer}</p>
      <p><strong>Fast product:</strong> ${card.fastProduct}</p>
      <p><strong>Bigger path:</strong> ${card.biggerToolPath}</p>
      <p><strong>First action:</strong> ${card.firstAction}</p>
    </article>
  `).join('');
}

function analyseNotes(text) {
  const clean = text.trim();
  if (!clean) return 'Paste notes first.';
  const lower = clean.toLowerCase();
  const warnings = [];
  if ((lower.match(/idea|could build|what else|another/g) || []).length >= 3) warnings.push('Idea overflow risk: pick one build and ship it.');
  if (!/test|ship|sell|launch|customer|outreach|verify/.test(lower)) warnings.push('Low shipping signal: add one real-world test action.');
  if (/cron/.test(lower)) warnings.push('Cron warning: Matt prefers manual/client-side refresh, not Hermes cron jobs.');
  if (/customer|support|lead|enquiry|quote/.test(lower)) warnings.push('Route to Lead Rescue / Customer Support Agent path.');

  return [
    '# Session improvement packet',
    '',
    `Signal length: ${clean.length} chars`,
    '',
    '## Warnings',
    warnings.length ? warnings.map((w) => `- ${w}`).join('\n') : '- No major warnings.',
    '',
    '## Next action',
    `- ${next.firstThreeActions[0]}`,
    '',
    '## Context to keep',
    `- Current best product path: ${next.title}`,
    '- Keep outputs short and tied to a test/sale this week.',
  ].join('\n');
}

renderNext();
renderCards();

document.querySelector('#copyPacket').addEventListener('click', async () => {
  const packet = buildContextPacket(seedCards);
  await navigator.clipboard.writeText(packet);
  document.querySelector('#copyPacket').textContent = 'Copied';
  setTimeout(() => { document.querySelector('#copyPacket').textContent = 'Copy NOVA context packet'; }, 1400);
});

document.querySelector('#analyseNotes').addEventListener('click', () => {
  document.querySelector('#analysisOutput').textContent = analyseNotes(document.querySelector('#sessionNotes').value);
});

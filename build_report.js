const {
  seedCards,
  rankCards,
  makeForgeRecipe,
  buildContextPacket,
} = require('./product_forge.logic.js');
const fs = require('fs');
const path = require('path');

const ranked = rankCards(seedCards);
const next = makeForgeRecipe(ranked[0]);
const outDir = path.join(__dirname, 'reports');
fs.mkdirSync(outDir, { recursive: true });

const report = [
  '# NOVA Product Forge Report',
  '',
  `Generated: ${new Date().toISOString()}`,
  '',
  '## Next build recommendation',
  '',
  `**${next.title}**`,
  '',
  `- Score: ${next.score}/100`,
  `- Disposition: ${next.disposition}`,
  `- Bucket: ${next.bucket}`,
  `- Build this week: ${next.whatToBuildThisWeek}`,
  `- Test with: ${next.whoToTestWith}`,
  '',
  '## First 3 actions',
  '',
  next.firstThreeActions.map((action, index) => `${index + 1}. ${action}`).join('\n'),
  '',
  '## Ranked product cards',
  '',
  ranked.map((card, index) => [
    `### ${index + 1}. ${card.title}`,
    '',
    `- Score: ${card.score}/100`,
    `- Disposition: ${card.disposition}`,
    `- Customer: ${card.customer}`,
    `- Problem: ${card.problem}`,
    `- Fast product: ${card.fastProduct}`,
    `- Bigger path: ${card.biggerToolPath}`,
    `- First action: ${card.firstAction}`,
  ].join('\n')).join('\n\n'),
  '',
  buildContextPacket(seedCards),
].join('\n');

const jsonPath = path.join(outDir, 'ranked-products.json');
const mdPath = path.join(outDir, 'latest-report.md');
fs.writeFileSync(jsonPath, JSON.stringify(ranked, null, 2));
fs.writeFileSync(mdPath, report);
console.log(`[OK] wrote ${jsonPath}`);
console.log(`[OK] wrote ${mdPath}`);
console.log(`[NEXT] ${next.title} (${next.score}/100)`);

const assert = require('assert');
const {
  seedCards,
  scoreCard,
  rankCards,
  selectNextBuild,
  makeForgeRecipe,
  buildContextPacket,
} = require('./product_forge.logic.js');

assert(seedCards.length >= 6, 'should include seed cards across Matt-fit domains');

const leadRescue = seedCards.find((card) => card.id === 'lead-rescue-support-agent');
assert(leadRescue, 'lead rescue seed card exists');
assert(scoreCard(leadRescue) >= 70, 'lead rescue should score high because it is already built and sellable');

const ranked = rankCards(seedCards);
assert(ranked[0].score >= ranked[ranked.length - 1].score, 'cards are sorted descending by score');
assert(ranked.every((card) => card.disposition), 'every card gets a disposition');

const next = selectNextBuild(seedCards);
assert(next.title.includes('Lead Rescue') || next.title.includes('Support Agent'), 'next build should prioritise lead rescue/customer support');
assert(next.disposition.startsWith('A.'), 'next build should be A Do Now');

const recipe = makeForgeRecipe(next);
assert(recipe.firstThreeActions.length === 3, 'recipe has three actions');
assert(recipe.whatToBuildThisWeek.length > 20, 'recipe names a concrete weekly build');
assert(recipe.biggerPath.includes('LeadRescue') || recipe.biggerPath.includes('CRM'), 'recipe includes larger tool path');

const packet = buildContextPacket(seedCards);
assert(packet.includes('NOVA Product Forge Context Packet'), 'context packet has title');
assert(packet.includes('Do not build feature 2'), 'packet enforces shipping rule');
assert(packet.includes(next.title), 'packet includes top recommendation');

console.log('All NOVA Product Forge tests passed.');

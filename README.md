# NOVA Product Forge

Local Product Radar + NOVA improvement loop for Matt.

It answers one question:

```text
What should Matt build, sell, or test this week?
```

## What it does

- Scores product ideas against Matt-fit, buyer pain, build speed, proof, scale, and risk.
- Ranks fast-cash and main-business opportunities.
- Converts the top idea into a Forge Recipe with first 3 actions.
- Generates a NOVA context packet to keep future sessions focused.
- Includes a manual session-notes analyser for improvement warnings.

## Current recommendation

```text
AI Lead Rescue / Customer Support Agent
Score: 75/100
Disposition: A. Do Now
```

Why: the support agent MVP already exists and is testable. The next useful step is finding users, not adding features.

## Run

```bash
cd ~/projects/_active/nova-product-forge
node test.js
node build_report.js
python3 -m http.server 8852
```

Open:

```text
http://127.0.0.1:8852
```

LAN option from current verification:

```text
http://192.168.0.7:8852
```

## Files

- `product_forge.logic.js` — scoring/ranking engine
- `test.js` — regression tests
- `build_report.js` — writes reports
- `reports/latest-report.md` — current ranked recommendation
- `reports/ranked-products.json` — machine-readable cards
- `index.html`, `style.css`, `app.js` — local dashboard

## Next upgrade

Add a real research importer:

```text
web/reddit/manual complaints -> problem cards -> score -> product pack builder
```

Do not automate publishing or outreach. Generate drafts and require manual approval.

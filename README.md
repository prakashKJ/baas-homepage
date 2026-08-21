# BatterySmart BaaS homepage

Throwaway static Home screens for **3W battery rental** (subscribe). English only. Mobile viewport **412×892**.

No npm. No build. Open the HTML files, or serve the folder.

## Open all four screens

Query on Home (`index.html` defaults to Ready):

- [Ready](index.html?state=ready) — `index.html` or `index.html?state=ready`
- [MOSFET fault](index.html?state=fault) — `index.html?state=fault`
- [Due](index.html?state=due) — `index.html?state=due`
- [Overdue + penalty](index.html?state=overdue) — `index.html?state=overdue`

Dedicated files:

- [ready.html](ready.html)
- [fault.html](fault.html)
- [due.html](due.html)
- [overdue.html](overdue.html)

A small **Dev** strip switches states. It is not product UI.

Locally:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173/` at a 412×892 phone viewport.

## What each Home answers

Jobs: did it charge overnight, is it still there, can I ride, what’s my plan, do I owe, what’s the next action.

P0 on a 412×892 phone, in this stack:

header (brand only, no breadcrumbs) → (overdue peach banner) → short **passenger e-rickshaw** (open sides, bench, canopy, handlebar + driver seat — not a cargo 3W) → ride status + km + small % → one overnight / still-there line → MOSFET/battery chips → Subscribe **label chip** + DATE/AMOUNT → fat **Pay now** or **Fix**

Light blue + mint Material 3 tokens, high-contrast type, 52px+ targets. Ready is a quiet “You're paid up · next due …” sentence — no primary button. km is first except on MOSFET fault, where **Can't ride** is the hero and km is demoted. Fault is a red ride-fail (stop mark on the vehicle), not a yellow warning or a charged-battery story. Overdue shows **₹2,499 + ₹150 penalty**. The Subscribe chip is a plan label, not a CTA.

Nav stays **Home / My Wallet / Plan Details**. Wallet and Plan Details are stubs so IA is unchanged.

Meter vs app sits fully above the tab bar. Ride status follows battery and MOSFET only — overdue does not invent a battery lockout. No Today FAQ cards.

Off these screens: rewards, referral, FAQs, AMC, stations, wait, swap history, onboarding.

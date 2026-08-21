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

P0 above the fold on a 412×892 phone:

- Battery + MOSFET (MOSFET is ride-fail, not settings)
- Plan + monthly amount (Subscribe · ₹2,499/month)
- Due + penalty / on-time discount
- One fat **Pay now** or **Fix** CTA (Ready is paid-up calm — no Pay now)

Hero is can-I-ride + **km left**. % stays small under the km.

Nav stays **Home / My Wallet / Plan Details**. Wallet and Plan Details are stubs so IA is unchanged.

P1 below the fold: Pinto meter vs app %. Ride status follows battery and MOSFET only — overdue does not invent a battery lockout.

Off these screens: rewards, referral, FAQs, AMC, stations, wait, swap history, onboarding.

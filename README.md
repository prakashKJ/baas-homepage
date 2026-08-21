# BatterySmart BaaS homepage

Throwaway static Home screens for **3W battery rental**. English only. Mobile viewport **412×892**.

No npm. No build. Open the HTML files, or serve the folder.

Working preview (HTTP 200, commit `1f5d531`). Production `baas-homepage.vercel.app/first-run` is still a stale deploy and 404s until `vercel --prod`.

## Open every Home state

Donna preview (these return 200):

- [first-run](https://cdn.jsdelivr.net/gh/prakashKJ/baas-homepage@1f5d531/first-run.html)
- [paid-up](https://cdn.jsdelivr.net/gh/prakashKJ/baas-homepage@1f5d531/paid-up.html)
- [grace](https://cdn.jsdelivr.net/gh/prakashKJ/baas-homepage@1f5d531/grace.html)
- [subscribe](https://cdn.jsdelivr.net/gh/prakashKJ/baas-homepage@1f5d531/subscribe.html)
- [lease](https://cdn.jsdelivr.net/gh/prakashKJ/baas-homepage@1f5d531/lease.html)

Query on Home (`index.html` defaults to Ready), or the dedicated file. After a fresh Vercel deploy, `cleanUrls` also serves `/fault`, `/grace`, and so on.

| State | Query | File / path |
| --- | --- | --- |
| Ready | `/?state=ready` | [ready.html](ready.html) |
| MOSFET fail (ride blocked) | `/?state=fault` | [fault.html](fault.html) |
| Due | `/?state=due` | [due.html](due.html) |
| Overdue + ₹150 | `/?state=overdue` | [overdue.html](overdue.html) |
| First run | `/?state=first-run` | [first-run.html](first-run.html) |
| Paid up | `/?state=paid-up` | [paid-up.html](paid-up.html) |
| Grace | `/?state=grace` | [grace.html](grace.html) |
| Subscribe | `/?state=subscribe` | [subscribe.html](subscribe.html) |
| Lease-to-own | `/?state=lease` | [lease.html](lease.html) · [lease-to-own.html](lease-to-own.html) |

Live examples:

- https://baas-homepage.vercel.app/
- https://baas-homepage.vercel.app/?state=fault
- https://baas-homepage.vercel.app/first-run
- https://baas-homepage.vercel.app/paid-up
- https://baas-homepage.vercel.app/grace
- https://baas-homepage.vercel.app/subscribe
- https://baas-homepage.vercel.app/lease

A **DEV ONLY** strip switches states. It is not product UI.

Locally:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173/` at a 412×892 phone viewport.

## What each Home answers

Four questions on the page: can I ride, what’s my plan, do I owe, what’s next.

Header is brand + **Can ride / Can't ride**. MOSFET fail is a red ride-block, not yellow, not settings, not rideable. **Can't ride** is the hero; km is demoted. Overdue does not lock the battery. Grace can still ride.

Hero: can-I-ride + **km left**. % stays small. Short line-illustrated **passenger e-rickshaw** (open sides, bench, canopy, handlebar + driver seat).

Plan types on Home: **Subscribe** and **Lease-to-own** (₹2,499/month). Nav stays **Home / My Wallet / Plan Details**.

Off these screens: rewards, referral, FAQs, AMC, stations, wait, swap history, onboarding.

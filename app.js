(function () {
  "use strict";

  var STATES = ["ready", "fault", "due", "overdue"];

  var PLAN = {
    name: "Subscribe",
    amount: "₹2,499",
    monthly: "₹2,499/month",
  };

  function icons() {
    return {
      battery:
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="2" y="7" width="18" height="10" rx="2" stroke="currentColor" stroke-width="2"/><path d="M20 10h2v4h-2" fill="currentColor"/><rect x="4.5" y="9.2" width="10.5" height="5.6" rx="1" fill="currentColor"/></svg>',
      mosfetOk:
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M8 12.5l2.4 2.4L16 9.2" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      mosfetFail:
        '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2.2"/><path d="M7 12h10" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>',
      bill:
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3.75h12a1.5 1.5 0 0 1 1.5 1.5v15l-2.2-1.3-2.2 1.3-2.1-1.3-2.1 1.3-2.2-1.3-2.2 1.3v-15A1.5 1.5 0 0 1 6 3.75z" stroke="currentColor" stroke-width="1.8"/><path d="M9 9h6M9 12.5h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
      chevron:
        '<svg class="chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      home:
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 11.2L12 4.5l8 6.7V20a1 1 0 0 1-1 1h-5.2v-6.2H10.2V21H5a1 1 0 0 1-1-1v-8.8z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
      wallet:
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="6.5" width="18" height="13" rx="2.2" stroke="currentColor" stroke-width="1.8"/><path d="M3 10h18" stroke="currentColor" stroke-width="1.8"/><circle cx="16.2" cy="14.4" r="1.2" fill="currentColor"/></svg>',
      plan:
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="3.5" width="14" height="17" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M8.5 8h7M8.5 12h7M8.5 16h4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    };
  }

  /* Passenger e-rickshaw, side view facing left.
     Open sides, canopy, handlebar, driver seat, 2-seat bench. Not a cargo box. */
  function heroArt(rideOk) {
    var stop =
      rideOk
        ? ""
        : '<g>' +
          '<circle cx="196" cy="72" r="20" fill="#9b1b12"/>' +
          '<path d="M186 72h20" stroke="#fff" stroke-width="4.2" stroke-linecap="round"/>' +
          "</g>";
    return (
      '<svg viewBox="0 0 360 176" fill="none" aria-hidden="true">' +
      '<ellipse cx="178" cy="168" rx="122" ry="6.5" fill="#8eafbb"/>' +
      /* far-side posts + wheel so the cabin reads as open, not a box */
      '<ellipse cx="274" cy="142" rx="13" ry="14.5" fill="#d7eef8" stroke="#1d3a44" stroke-width="1.35"/>' +
      '<path d="M118 50v80M256 50v80" stroke="#3d5b66" stroke-width="1.35"/>' +
      /* mint canopy — passenger auto roof, not a cargo lid */
      '<path d="M70 48c10-18 34-24 70-24h118c38 0 58 10 66 24v8H68v-8z" fill="#4ecf9a" stroke="#052028" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="M72 56h218" stroke="#052028" stroke-width="1.6"/>' +
      /* four near-side posts, nothing filled between them */
      '<path d="M96 56v78M156 56v38M248 56v38M298 56v78" stroke="#052028" stroke-width="2.05" stroke-linecap="round"/>' +
      /* open side rail — a bar, not a wall */
      '<path d="M156 94h92" stroke="#052028" stroke-width="1.9" stroke-linecap="round"/>' +
      /* passenger bench: two separate seats + low backs, see-through */
      '<rect x="166" y="116" width="42" height="15" rx="7" fill="#b6f3d6" stroke="#052028" stroke-width="1.65"/>' +
      '<rect x="216" y="116" width="42" height="15" rx="7" fill="#b6f3d6" stroke="#052028" stroke-width="1.65"/>' +
      '<path d="M172 116c6-11 24-11 30 0" fill="none" stroke="#052028" stroke-width="1.7" stroke-linecap="round"/>' +
      '<path d="M222 116c6-11 24-11 30 0" fill="none" stroke="#052028" stroke-width="1.7" stroke-linecap="round"/>' +
      '<path d="M176 131v8M200 131v8M226 131v8M250 131v8" stroke="#052028" stroke-width="1.55" stroke-linecap="round"/>' +
      /* floor, open cabin */
      '<path d="M118 134h176" stroke="#052028" stroke-width="2.05" stroke-linecap="round"/>' +
      /* driver seat, separate from the bench */
      '<path d="M90 108c2-13 20-15 26-3v25H92c-1-7-2-15-2-22z" fill="#c4e7ff" stroke="#052028" stroke-width="1.7" stroke-linejoin="round"/>' +
      /* windshield only at the driver */
      '<path d="M78 56l-16 46h32l10-46H78z" fill="#c4e7ff" stroke="#052028" stroke-width="1.7" stroke-linejoin="round"/>' +
      /* handlebar + stem */
      '<path d="M34 86h40" stroke="#052028" stroke-width="3.3" stroke-linecap="round"/>' +
      '<circle cx="36" cy="86" r="3.1" fill="#052028"/>' +
      '<circle cx="72" cy="86" r="3.1" fill="#052028"/>' +
      '<path d="M54 86v26" stroke="#052028" stroke-width="2.05"/>' +
      /* nose, headlight */
      '<path d="M42 124c10 8 26 12 42 12v-14c-16 0-30 2-42 6z" fill="#c4e7ff" stroke="#052028" stroke-width="1.65" stroke-linejoin="round"/>' +
      '<circle cx="48" cy="118" r="5.1" fill="#fff4c4" stroke="#052028" stroke-width="1.5"/>' +
      /* wheels */
      '<circle cx="80" cy="148" r="16.5" fill="#f4faff" stroke="#052028" stroke-width="2.05"/>' +
      '<circle cx="80" cy="148" r="6.2" fill="none" stroke="#052028" stroke-width="1.4"/>' +
      '<circle cx="250" cy="148" r="18.5" fill="#f4faff" stroke="#052028" stroke-width="2.05"/>' +
      '<circle cx="250" cy="148" r="7" fill="none" stroke="#052028" stroke-width="1.4"/>' +
      '<path d="M228 134h50c5 0 8 3 8 7v5H222v-6c0-4 2-6 6-6z" fill="#d7eef8" stroke="#052028" stroke-width="1.55" stroke-linejoin="round"/>' +
      stop +
      "</svg>"
    );
  }

  function stateModel(state) {
    var rideOk = state !== "fault";
    var mosfetOk = state !== "fault";

    var due = {
      ready: {
        date: "25 Sep",
        amount: PLAN.amount,
        amountTone: "",
        note: "",
      },
      fault: {
        date: "25 Sep",
        amount: PLAN.amount,
        amountTone: "",
        note: "",
      },
      due: {
        date: "25 Aug",
        amount: PLAN.amount,
        amountTone: "warn",
        note: "On-time discount still available",
      },
      overdue: {
        date: "14 Aug",
        amount: "₹2,499 + ₹150",
        amountTone: "over",
        note: "Overdue · ₹150 penalty",
      },
    };

    return {
      state: state,
      rideOk: rideOk,
      rideLabel: rideOk ? "Ready to ride" : "Can't ride",
      km: rideOk ? "62 km left" : "62 km left · 78%",
      pct: rideOk ? "78%" : "",
      mosfetOk: mosfetOk,
      mosfetLabel: mosfetOk ? "Healthy" : "Can't ride",
      batteryLabel: rideOk ? "Charged" : "Has charge",
      plan: PLAN,
      due: due[state],
      cta: state === "fault" ? "Fix" : state === "ready" ? null : "Pay now",
      calm: "You're paid up · next due 25 Sep",
      banner:
        state === "overdue"
          ? {
              title: "Payment overdue",
              body: "Penalty added. Battery is not locked.",
            }
          : null,
      todayLine: "Parked 10:14 pm → 5:02 am · 41% → 78% · still there",
      meter: "78%",
      appPct: "74%",
    };
  }

  function getState() {
    var params = new URLSearchParams(window.location.search);
    var q = (params.get("state") || "").toLowerCase();
    if (STATES.indexOf(q) !== -1) return q;

    var file = (window.location.pathname.split("/").pop() || "").toLowerCase();
    var fromFile = file.replace(".html", "");
    if (STATES.indexOf(fromFile) !== -1) return fromFile;

    var preset = (document.body.getAttribute("data-default-state") || "").toLowerCase();
    if (STATES.indexOf(preset) !== -1) return preset;
    return "ready";
  }

  function render(state) {
    var s = stateModel(state);
    var ic = icons();
    var titleMap = {
      ready: "Ready",
      fault: "MOSFET fault",
      due: "Due",
      overdue: "Overdue",
    };
    document.title = "BatterySmart — " + titleMap[state];

    var switcher = STATES.map(function (name) {
      var href = name === "ready" ? "index.html" : name + ".html";
      var current = name === state ? ' aria-current="page"' : "";
      return '<a href="' + href + '"' + current + ">" + name + "</a>";
    }).join("");

    var banner = s.banner
      ? '<div class="banner" role="status">' +
        ic.bill +
        '<div class="banner-copy"><strong>' +
        s.banner.title +
        "</strong><span>" +
        s.banner.body +
        "</span></div>" +
        ic.chevron +
        "</div>"
      : "";

    var cta = s.cta
      ? '<button class="cta ' +
        (s.cta === "Fix" ? "fix" : "pay") +
        '" type="button">' +
        s.cta +
        "</button>"
      : '<p class="calm">' + s.calm + "</p>";

    var dueNote = s.due.note ? '<div class="plan-note">' + s.due.note + "</div>" : "";

    var html =
      '<div class="phone" data-state="' +
      state +
      '">' +
      '<div class="dev-switcher" aria-label="Developer state switcher">' +
      "<span>DEV ONLY</span>" +
      "<code>state=</code>" +
      switcher +
      "</div>" +
      '<header class="app-bar">' +
      '<div class="brand">' +
      '<svg class="brand-mark" viewBox="0 0 28 28" aria-hidden="true"><rect width="28" height="28" rx="8" fill="#005c44"/><rect x="6" y="9" width="14" height="10" rx="2" fill="#b6f3d6"/><rect x="20" y="12" width="2.4" height="4" rx=".6" fill="#b6f3d6"/></svg>' +
      "BatterySmart</div>" +
      "</header>" +
      '<main class="screen">' +
      banner +
      '<div class="hero-art' +
      (s.rideOk ? "" : " is-fail") +
      '" aria-hidden="true">' +
      heroArt(s.rideOk) +
      "</div>" +
      '<section class="hero-copy' +
      (s.rideOk ? "" : " fail-hero") +
      '" aria-label="Ride status">' +
      '<div class="ride ' +
      (s.rideOk ? "ok" : "fail") +
      '">' +
      s.rideLabel +
      "</div>" +
      '<div class="km">' +
      s.km +
      "</div>" +
      (s.pct ? '<div class="pct">' + s.pct + "</div>" : "") +
      '<p class="overnight">' +
      s.todayLine +
      "</p>" +
      "</section>" +
      '<section class="status-row' +
      (s.mosfetOk ? "" : " is-fail") +
      '" aria-label="Battery and MOSFET">' +
      (s.mosfetOk
        ? '<div class="chip">' +
          ic.battery +
          '<div class="meta"><div class="k">Battery</div><div class="v">' +
          s.batteryLabel +
          "</div></div></div>" +
          '<div class="chip">' +
          ic.mosfetOk +
          '<div class="meta"><div class="k">MOSFET</div><div class="v">' +
          s.mosfetLabel +
          "</div></div></div>"
        : '<div class="chip fail" role="alert">' +
          ic.mosfetFail +
          '<div class="meta"><div class="k">Ride fail</div><div class="v">' +
          s.mosfetLabel +
          "</div></div></div>" +
          '<div class="chip muted">' +
          ic.battery +
          '<div class="meta"><div class="k">Battery</div><div class="v">' +
          s.batteryLabel +
          "</div></div></div>") +
      "</section>" +
      '<section class="plan-card" aria-label="Plan and due">' +
      '<div class="plan-chip">' +
      s.plan.name +
      "</div>" +
      '<div class="plan-pair">' +
      '<div><div class="k">Date</div><div class="v">' +
      s.due.date +
      "</div></div>" +
      '<div><div class="k">Amount</div><div class="v' +
      (s.due.amountTone ? " " + s.due.amountTone : "") +
      '">' +
      s.due.amount +
      "</div></div>" +
      "</div>" +
      dueNote +
      "</section>" +
      cta +
      '<section class="meter-block" aria-label="Meter vs app">' +
      '<p class="section-title">Meter vs app</p>' +
      '<div class="meter-row">' +
      '<div class="meter-box"><div class="k">Pinto · meter</div><div class="v">' +
      s.meter +
      "</div></div>" +
      '<div class="meter-box"><div class="k">App</div><div class="v">' +
      s.appPct +
      "</div></div></div>" +
      '<p class="note">Pinto follows the meter when the app % disagrees. Drivers measure in km, not %.</p>' +
      "</section>" +
      "</main>" +
      '<nav class="nav" aria-label="App">' +
      '<a href="' +
      (state === "ready" ? "index.html" : state + ".html") +
      '" aria-current="page">' +
      ic.home +
      "Home</a>" +
      '<a href="wallet.html">' +
      ic.wallet +
      "My Wallet</a>" +
      '<a href="plan.html">' +
      ic.plan +
      "Plan Details</a>" +
      "</nav>" +
      "</div>";

    document.getElementById("app").innerHTML = html;
  }

  render(getState());
})();

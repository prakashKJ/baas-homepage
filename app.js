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

  /* 3/4 passenger e-rickshaw: open cabin you can see through, bench, driver, handlebar.
     Thin mint canopy. No cargo box / enclosed van walls. */
  function heroArt(rideOk) {
    var stop =
      rideOk
        ? ""
        : '<g>' +
          '<circle cx="214" cy="58" r="18" fill="#9b1b12"/>' +
          '<path d="M205 58h18" stroke="#fff" stroke-width="4" stroke-linecap="round"/>' +
          "</g>";
    return (
      '<svg viewBox="0 0 360 176" fill="none" aria-hidden="true">' +
      '<ellipse cx="186" cy="168" rx="124" ry="6" fill="#8eafbb"/>' +
      /* far rear wheel */
      '<ellipse cx="292" cy="138" rx="12" ry="14" fill="#d7eef8" stroke="#1d3a44" stroke-width="1.3"/>' +
      '<ellipse cx="292" cy="138" rx="4.4" ry="5.2" fill="none" stroke="#1d3a44" stroke-width="1.1"/>' +
      /* far posts — cabin is see-through */
      '<path d="M132 46v78M268 50v70" stroke="#5a7380" stroke-width="1.35"/>' +
      /* floor / running board, open under the seats */
      '<path d="M78 136h206c8 0 12 3 12 7v4H70v-5c0-4 3-6 8-6z" fill="#e8f4fb" stroke="#052028" stroke-width="1.6" stroke-linejoin="round"/>' +
      /* passenger bench across the open cabin (two seats, not a crate) */
      '<path d="M168 108h92c6 0 8 3 8 7v12H162v-12c0-5 3-7 6-7z" fill="#b6f3d6" stroke="#052028" stroke-width="1.7" stroke-linejoin="round"/>' +
      '<path d="M178 108v-16c8-10 24-10 32 0v16" fill="#d7eef8" stroke="#052028" stroke-width="1.55" stroke-linejoin="round"/>' +
      '<path d="M220 108v-16c8-10 24-10 32 0v16" fill="#d7eef8" stroke="#052028" stroke-width="1.55" stroke-linejoin="round"/>' +
      /* two seated passengers — locks “this carries people” */
      '<circle cx="194" cy="78" r="7" fill="#c4e7ff" stroke="#052028" stroke-width="1.5"/>' +
      '<path d="M182 108c2-16 8-20 12-22 6 2 12 8 14 22" fill="#c4e7ff" stroke="#052028" stroke-width="1.5" stroke-linejoin="round"/>' +
      '<circle cx="236" cy="76" r="7" fill="#c4e7ff" stroke="#052028" stroke-width="1.5"/>' +
      '<path d="M224 108c2-16 8-22 12-24 6 2 12 10 14 24" fill="#c4e7ff" stroke="#052028" stroke-width="1.5" stroke-linejoin="round"/>' +
      /* near posts + grab rail only — sides stay open */
      '<path d="M124 44v90M164 52v42M248 52v42M286 48v86" stroke="#052028" stroke-width="2.05" stroke-linecap="round"/>' +
      '<path d="M164 92h84" stroke="#052028" stroke-width="1.8" stroke-linecap="round"/>' +
      /* thin mint canopy with visible underside, not a closed lid */
      '<path d="M108 28h168c18 4 28 10 32 18H92c6-10 12-16 16-18z" fill="#3cc48e" stroke="#052028" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="M92 46h216" stroke="#052028" stroke-width="1.7"/>' +
      '<path d="M100 46c4 8 8 10 14 10h148c8 0 12-2 16-10" fill="none" stroke="#1d3a44" stroke-width="1.25"/>' +
      /* driver seat + driver at the handlebar */
      '<path d="M96 112c2-14 18-16 24-4v24H98c-1-6-2-14-2-20z" fill="#b6f3d6" stroke="#052028" stroke-width="1.6" stroke-linejoin="round"/>' +
      '<circle cx="106" cy="74" r="7.2" fill="#c4e7ff" stroke="#052028" stroke-width="1.5"/>' +
      '<path d="M96 112c4-18 10-24 10-26 8 2 16 12 18 26" fill="#c4e7ff" stroke="#052028" stroke-width="1.5" stroke-linejoin="round"/>' +
      /* small windshield, handlebar, nose, headlight */
      '<path d="M78 50l-14 44h30l8-44H78z" fill="#c4e7ff" stroke="#052028" stroke-width="1.65" stroke-linejoin="round"/>' +
      '<path d="M32 88h42" stroke="#052028" stroke-width="3.2" stroke-linecap="round"/>' +
      '<circle cx="34" cy="88" r="3" fill="#052028"/>' +
      '<circle cx="72" cy="88" r="3" fill="#052028"/>' +
      '<path d="M52 88v22" stroke="#052028" stroke-width="2"/>' +
      '<path d="M40 126c10 8 28 12 44 12v-12c-16 0-30 1-44 5z" fill="#c4e7ff" stroke="#052028" stroke-width="1.6" stroke-linejoin="round"/>' +
      '<circle cx="46" cy="118" r="5" fill="#fff4c4" stroke="#052028" stroke-width="1.45"/>' +
      /* near wheels */
      '<circle cx="78" cy="148" r="16" fill="#f4faff" stroke="#052028" stroke-width="2.05"/>' +
      '<circle cx="78" cy="148" r="6" fill="none" stroke="#052028" stroke-width="1.35"/>' +
      '<circle cx="254" cy="148" r="18" fill="#f4faff" stroke="#052028" stroke-width="2.05"/>' +
      '<circle cx="254" cy="148" r="7" fill="none" stroke="#052028" stroke-width="1.35"/>' +
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

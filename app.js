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
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 7.5v6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><circle cx="12" cy="16.4" r="1.1" fill="currentColor"/></svg>',
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

  /* Boxy 3W e-rickshaw, 3/4 view — one front wheel, two rear wheels, cabin + roof. */
  function heroArt() {
    return (
      '<svg viewBox="0 0 320 170" fill="none" aria-hidden="true">' +
      '<ellipse cx="168" cy="160" rx="118" ry="8" fill="#cfcfcf"/>' +
      '<ellipse cx="258" cy="124" rx="13" ry="14" fill="#fff" stroke="#111" stroke-width="2"/>' +
      '<ellipse cx="258" cy="124" rx="5" ry="5.5" fill="none" stroke="#111" stroke-width="1.6"/>' +
      '<path d="M116 28h132c10 0 16 6 16 14v8H108c2-14 4-22 8-22z" fill="#fff" stroke="#111" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="M108 50h156c8 0 12 5 12 12v52c0 6-4 10-10 10H128c-14 0-22-8-24-20l-8-28c-2-12 2-26 12-26z" fill="#fff" stroke="#111" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="M134 60h104c5 0 8 3 8 8v26c0 5-3 8-8 8H134c-5 0-8-3-8-8V68c0-5 3-8 8-8z" fill="#fff" stroke="#111" stroke-width="1.8"/>' +
      '<path d="M158 50v60M216 50v60" stroke="#111" stroke-width="1.6"/>' +
      '<path d="M108 86c-24 3-40 16-46 28v10h42L108 86z" fill="#fff" stroke="#111" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="M44 74c14 6 28 16 40 24" stroke="#111" stroke-width="2.3" stroke-linecap="round"/>' +
      '<path d="M38 72h20" stroke="#111" stroke-width="2.8" stroke-linecap="round"/>' +
      '<circle cx="66" cy="104" r="5" fill="#fff" stroke="#111" stroke-width="1.8"/>' +
      '<circle cx="72" cy="116" r="5.5" fill="#fff" stroke="#111" stroke-width="1.8"/>' +
      '<rect x="146" y="108" width="48" height="16" rx="2" fill="#fff" stroke="#111" stroke-width="1.8"/>' +
      '<path d="M104 124h160" stroke="#111" stroke-width="2"/>' +
      '<circle cx="80" cy="140" r="16.5" fill="#fff" stroke="#111" stroke-width="2"/>' +
      '<circle cx="80" cy="140" r="6.5" fill="none" stroke="#111" stroke-width="1.6"/>' +
      '<circle cx="228" cy="140" r="18" fill="#fff" stroke="#111" stroke-width="2"/>' +
      '<circle cx="228" cy="140" r="7" fill="none" stroke="#111" stroke-width="1.6"/>' +
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
        amount: "₹2,499 + ₹150 penalty",
        amountTone: "over",
        note: "Overdue · penalty added",
      },
    };

    return {
      state: state,
      rideOk: rideOk,
      rideLabel: rideOk ? "Ready to ride" : "Can't ride",
      km: rideOk ? "62 km left" : "62 km left · 78%",
      pct: rideOk ? "78%" : "",
      mosfetOk: mosfetOk,
      mosfetLabel: mosfetOk ? "Healthy" : "Fault — ride fail",
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
      '<svg class="brand-mark" viewBox="0 0 28 28" aria-hidden="true"><rect width="28" height="28" rx="8" fill="#111"/><rect x="6" y="9" width="14" height="10" rx="2" fill="#fff"/><rect x="20" y="12" width="2.4" height="4" rx=".6" fill="#fff"/></svg>' +
      "BatterySmart</div>" +
      "</header>" +
      '<main class="screen">' +
      banner +
      '<div class="hero-art" aria-hidden="true">' +
      heroArt() +
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
      '<div class="pct">' +
      s.pct +
      "</div>" +
      '<p class="overnight">' +
      s.todayLine +
      "</p>" +
      "</section>" +
      '<section class="status-row" aria-label="Battery and MOSFET">' +
      '<div class="chip' +
      (s.rideOk ? "" : " muted") +
      '">' +
      ic.battery +
      '<div class="meta"><div class="k">Battery</div><div class="v">' +
      s.batteryLabel +
      "</div></div></div>" +
      '<div class="chip ' +
      (s.mosfetOk ? "" : "fail") +
      '">' +
      (s.mosfetOk ? ic.mosfetOk : ic.mosfetFail) +
      '<div class="meta"><div class="k">MOSFET</div><div class="v">' +
      s.mosfetLabel +
      "</div></div></div>" +
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

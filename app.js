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
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="2" y="7" width="18" height="10" rx="2" stroke="currentColor" stroke-width="2"/><path d="M20 10h2v4h-2" fill="currentColor"/><rect x="4.5" y="9.2" width="10.5" height="5.6" rx="1" fill="currentColor"/></svg>',
      mosfetOk:
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M8 12.5l2.4 2.4L16 9.2" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      mosfetFail:
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 7.5v6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><circle cx="12" cy="16.4" r="1.1" fill="currentColor"/></svg>',
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

  function heroArt() {
    return (
      '<svg viewBox="0 0 320 170" fill="none" aria-hidden="true">' +
      '<ellipse cx="160" cy="160" rx="102" ry="8" fill="#ececec"/>' +
      '<ellipse cx="236" cy="136" rx="15" ry="16" fill="#fff" stroke="#1a1a1a" stroke-width="1.7"/>' +
      '<ellipse cx="236" cy="136" rx="6" ry="6.5" fill="none" stroke="#1a1a1a" stroke-width="1.3"/>' +
      '<path d="M108 68c8-24 30-34 58-34 32 0 54 12 60 34" fill="#fff" stroke="#1a1a1a" stroke-width="1.7" stroke-linejoin="round"/>' +
      '<path d="M92 130V88c0-9 8-16 20-16h88c16 0 26 10 28 22l4 36H92z" fill="#fff" stroke="#1a1a1a" stroke-width="1.7" stroke-linejoin="round"/>' +
      '<path d="M112 72h100" stroke="#1a1a1a" stroke-width="1.15"/>' +
      '<path d="M118 74l1 20c1 7 10 11 20 11h32c12 0 18-5 20-12l1-19" fill="#fff" stroke="#1a1a1a" stroke-width="1.45" stroke-linejoin="round"/>' +
      '<path d="M164 72v58" stroke="#1a1a1a" stroke-width="1.1"/>' +
      '<path d="M92 104c-18 3-30 12-34 20v6h34v-26z" fill="#fff" stroke="#1a1a1a" stroke-width="1.6" stroke-linejoin="round"/>' +
      '<path d="M48 92c10 4 22 12 32 18" stroke="#1a1a1a" stroke-width="1.7" stroke-linecap="round"/>' +
      '<path d="M42 90h16" stroke="#1a1a1a" stroke-width="2.2" stroke-linecap="round"/>' +
      '<circle cx="64" cy="118" r="4" fill="#fff" stroke="#1a1a1a" stroke-width="1.35"/>' +
      '<circle cx="72" cy="140" r="15.5" fill="#fff" stroke="#1a1a1a" stroke-width="1.7"/>' +
      '<circle cx="72" cy="140" r="6" fill="none" stroke="#1a1a1a" stroke-width="1.25"/>' +
      '<circle cx="218" cy="140" r="17.5" fill="#fff" stroke="#1a1a1a" stroke-width="1.7"/>' +
      '<circle cx="218" cy="140" r="7" fill="none" stroke="#1a1a1a" stroke-width="1.25"/>' +
      '<path d="M92 130h138" stroke="#1a1a1a" stroke-width="1.45"/>' +
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
      km: "62 km left",
      pct: "78%",
      mosfetOk: mosfetOk,
      mosfetLabel: mosfetOk ? "Healthy" : "Fault — ride fail",
      batteryLabel: rideOk ? "Charged" : "Charge OK",
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
      overnight: "Parked 10:14 pm → 5:02 am · 41% → 78%",
      stillThere: "Yes",
      next:
        state === "fault"
          ? "Fix the MOSFET fault. You cannot ride until it is healthy."
          : state === "due"
            ? "Pay now to keep the on-time discount."
            : state === "overdue"
              ? "Pay now. Ride status follows battery and MOSFET only."
              : "Nothing to pay. You can ride.",
      canRide: rideOk
        ? "Yes. MOSFET is healthy."
        : "No. MOSFET fault — ride fail, not a settings issue.",
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
      ready: "Home / Ready",
      fault: "Home / MOSFET fault",
      due: "Home / Due",
      overdue: "Home / Overdue",
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
      "<span>Dev</span>" +
      switcher +
      "</div>" +
      '<header class="app-bar">' +
      '<div class="brand">' +
      '<svg class="brand-mark" viewBox="0 0 28 28" aria-hidden="true"><rect width="28" height="28" rx="8" fill="#111"/><rect x="6" y="9" width="14" height="10" rx="2" fill="#fff"/><rect x="20" y="12" width="2.4" height="4" rx=".6" fill="#fff"/></svg>' +
      "BatterySmart</div>" +
      '<div class="home-label">' +
      titleMap[state] +
      "</div>" +
      "</header>" +
      '<main class="screen">' +
      banner +
      '<div class="hero-art" aria-hidden="true">' +
      heroArt() +
      "</div>" +
      '<section class="hero-copy" aria-label="Ride status">' +
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
      "</section>" +
      '<section class="status-row" aria-label="Battery and MOSFET">' +
      '<div class="chip">' +
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
      '<section class="below" aria-label="More detail">' +
      '<p class="section-title">Today</p>' +
      '<div class="job"><h3>Can I ride?</h3><p>' +
      s.canRide +
      "</p></div>" +
      '<div class="job"><h3>Did it charge overnight?</h3><p>' +
      s.overnight +
      "</p></div>" +
      '<div class="job"><h3>Is it still there?</h3><p>' +
      s.stillThere +
      "</p></div>" +
      '<div class="job"><h3>What’s next?</h3><p>' +
      s.next +
      "</p></div>" +
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

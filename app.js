(function () {
  "use strict";

  var STATES = [
    "ready",
    "fault",
    "due",
    "overdue",
    "first-run",
    "paid-up",
    "grace",
    "subscribe",
    "lease",
  ];

  var ALIAS = {
    mosfet: "fault",
    "mosfet-fail": "fault",
    paidup: "paid-up",
    paid: "paid-up",
    firstrun: "first-run",
    "lease-to-own": "lease",
    lto: "lease",
  };

  var SUBSCRIBE = {
    name: "Subscribe",
    amount: "₹2,499",
    monthly: "₹2,499/month",
  };

  var LEASE = {
    name: "Lease-to-own",
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

  /* Passenger e-rickshaw: open sides, bench, canopy, handlebar. Not a cargo/loader 3W. */
  function heroArt() {
    return (
      '<svg viewBox="0 0 340 172" fill="none" aria-hidden="true">' +
      '<ellipse cx="168" cy="164" rx="110" ry="7" fill="#9bb8c4"/>' +
      '<ellipse cx="276" cy="132" rx="12" ry="13.5" fill="#fff" stroke="#0c1b24" stroke-width="1.8"/>' +
      '<ellipse cx="276" cy="132" rx="4.6" ry="5.2" fill="none" stroke="#0c1b24" stroke-width="1.25"/>' +
      '<path d="M112 126h160c7 0 10 3 10 7v5H106v-5c0-5 3-7 6-7z" fill="#fff" stroke="#0c1b24" stroke-width="1.8" stroke-linejoin="round"/>' +
      '<circle cx="240" cy="141" r="17.5" fill="#fff" stroke="#0c1b24" stroke-width="1.9"/>' +
      '<circle cx="240" cy="141" r="6.8" fill="none" stroke="#0c1b24" stroke-width="1.35"/>' +
      '<circle cx="76" cy="141" r="16" fill="#fff" stroke="#0c1b24" stroke-width="1.9"/>' +
      '<circle cx="76" cy="141" r="6.2" fill="none" stroke="#0c1b24" stroke-width="1.35"/>' +
      '<path d="M112 126c-22 2-34 8-40 16v4h40v-20z" fill="#fff" stroke="#0c1b24" stroke-width="1.7" stroke-linejoin="round"/>' +
      '<circle cx="76" cy="118" r="4.2" fill="#fff" stroke="#0c1b24" stroke-width="1.5"/>' +
      '<path d="M48 84c18 8 38 20 54 28" stroke="#0c1b24" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="M42 82h22" stroke="#0c1b24" stroke-width="2.8" stroke-linecap="round"/>' +
      '<path d="M106 114c2-11 28-13 34-2l-2 14H108c-1-4-2-8-2-12z" fill="#fff" stroke="#0c1b24" stroke-width="1.6" stroke-linejoin="round"/>' +
      '<path d="M238 78c3-3 18-3 22 4v40h-20c-1-14-2-32-2-44z" fill="#fff" stroke="#0c1b24" stroke-width="1.7" stroke-linejoin="round"/>' +
      '<rect x="158" y="100" width="100" height="24" rx="8" fill="#fff" stroke="#0c1b24" stroke-width="1.7"/>' +
      '<path d="M174 106c7 8 20 8 28 0" stroke="#0c1b24" stroke-width="1.35" fill="none" stroke-linecap="round"/>' +
      '<path d="M214 106c7 8 20 8 28 0" stroke="#0c1b24" stroke-width="1.35" fill="none" stroke-linecap="round"/>' +
      '<path d="M174 124v8M246 124v8" stroke="#0c1b24" stroke-width="1.5" stroke-linecap="round"/>' +
      '<path d="M122 50v76" stroke="#0c1b24" stroke-width="1.8"/>' +
      '<path d="M262 50v28" stroke="#0c1b24" stroke-width="1.8"/>' +
      '<path d="M108 30h164c10 0 14 5 14 12v10H104c1-16 3-22 4-22z" fill="#fff" stroke="#0c1b24" stroke-width="2" stroke-linejoin="round"/>' +
      "</svg>"
    );
  }

  function stateModel(state) {
    var fault = state === "fault";
    var plan = state === "lease" ? LEASE : SUBSCRIBE;
    var rideOk = !fault;

    var table = {
      ready: {
        dueDate: "25 Sep",
        dueAmount: plan.amount,
        dueTone: "",
        dueNote: "",
        cta: null,
        calm: "You're paid up · next due 25 Sep",
        banner: null,
        todayLine: "Parked 10:14 pm → 5:02 am · 41% → 78% · still there",
        owe: "Paid",
        next: "Ride",
      },
      "paid-up": {
        dueDate: "25 Sep",
        dueAmount: "Paid",
        dueTone: "",
        dueNote: "On-time discount applied",
        cta: null,
        calm: "You're paid up · next due 25 Sep",
        banner: null,
        todayLine: "Parked 10:14 pm → 5:02 am · 41% → 78% · still there",
        owe: "Paid",
        next: "Ride",
      },
      "first-run": {
        dueDate: "25 Sep",
        dueAmount: "None yet",
        dueTone: "",
        dueNote: "First due 25 Sep",
        cta: null,
        calm: "Nothing due yet · first due 25 Sep",
        banner: null,
        todayLine: "Just assigned · still there · no overnight charge yet",
        owe: "Nothing yet",
        next: "Ride",
      },
      subscribe: {
        dueDate: "25 Sep",
        dueAmount: plan.amount,
        dueTone: "",
        dueNote: "Subscribe · monthly",
        cta: null,
        calm: "You're paid up · next due 25 Sep",
        banner: null,
        todayLine: "Parked 10:14 pm → 5:02 am · 41% → 78% · still there",
        owe: "Paid",
        next: "Ride",
      },
      lease: {
        dueDate: "25 Sep",
        dueAmount: plan.amount,
        dueTone: "",
        dueNote: "Lease-to-own · monthly",
        cta: null,
        calm: "You're paid up · next due 25 Sep",
        banner: null,
        todayLine: "Parked 10:14 pm → 5:02 am · 41% → 78% · still there",
        owe: "Paid",
        next: "Ride",
      },
      due: {
        dueDate: "25 Aug",
        dueAmount: plan.amount,
        dueTone: "warn",
        dueNote: "On-time discount still available",
        cta: "Pay now",
        calm: "",
        banner: null,
        todayLine: "Parked 10:14 pm → 5:02 am · 41% → 78% · still there",
        owe: "₹2,499",
        next: "Pay now",
      },
      grace: {
        dueDate: "28 Aug",
        dueAmount: plan.amount,
        dueTone: "warn",
        dueNote: "Grace · no penalty yet",
        cta: "Pay now",
        calm: "",
        banner: {
          kind: "grace",
          title: "In grace",
          body: "Pay by 28 Aug. You can still ride.",
        },
        todayLine: "Parked 10:14 pm → 5:02 am · 41% → 78% · still there",
        owe: "₹2,499",
        next: "Pay now",
      },
      overdue: {
        dueDate: "14 Aug",
        dueAmount: "₹2,499 + ₹150",
        dueTone: "over",
        dueNote: "Overdue · ₹150 penalty",
        cta: "Pay now",
        calm: "",
        banner: {
          kind: "overdue",
          title: "Payment overdue",
          body: "₹150 penalty added. Battery is not locked.",
        },
        todayLine: "Parked 10:14 pm → 5:02 am · 41% → 78% · still there",
        owe: "₹2,499 + ₹150",
        next: "Pay now",
      },
      fault: {
        dueDate: "25 Sep",
        dueAmount: plan.amount,
        dueTone: "",
        dueNote: "",
        cta: "Fix",
        calm: "",
        banner: {
          kind: "fault",
          title: "Can't ride",
          body: "MOSFET fault. Ride is blocked.",
        },
        todayLine: "Parked 10:14 pm → 5:02 am · 41% → 78% · still there",
        owe: "Paid",
        next: "Fix",
      },
    };

    var row = table[state];
    return {
      state: state,
      rideOk: rideOk,
      rideLabel: rideOk ? "Ready to ride" : "Can't ride",
      headerRide: rideOk ? "Can ride" : "Can't ride",
      km: rideOk ? "62 km left" : "62 km left · 78%",
      pct: rideOk ? "78%" : "",
      mosfetOk: rideOk,
      mosfetLabel: rideOk ? "Healthy" : "Fault — ride fail",
      batteryLabel: rideOk ? "Charged" : "Has charge",
      plan: plan,
      dueDate: row.dueDate,
      dueAmount: row.dueAmount,
      dueTone: row.dueTone,
      dueNote: row.dueNote,
      cta: row.cta,
      calm: row.calm,
      banner: row.banner,
      todayLine: row.todayLine,
      jobs: {
        ride: rideOk ? "Yes" : "No",
        plan: plan.name,
        owe: row.owe,
        next: row.next,
      },
      meter: "78%",
      appPct: "74%",
    };
  }

  function canonicalState(raw) {
    var q = (raw || "").toLowerCase();
    if (ALIAS[q]) return ALIAS[q];
    if (STATES.indexOf(q) !== -1) return q;
    return "";
  }

  function getState() {
    var params = new URLSearchParams(window.location.search);
    var fromQuery = canonicalState(params.get("state"));
    if (fromQuery) return fromQuery;

    var file = (window.location.pathname.split("/").pop() || "").toLowerCase();
    var fromFile = canonicalState(file.replace(".html", ""));
    if (fromFile) return fromFile;

    var fromBody = canonicalState(document.body.getAttribute("data-default-state"));
    if (fromBody) return fromBody;
    return "ready";
  }

  function hrefFor(name) {
    return name === "ready" ? "index.html" : name + ".html";
  }

  function render(state) {
    var s = stateModel(state);
    var ic = icons();
    var titleMap = {
      ready: "Ready",
      fault: "MOSFET fault",
      due: "Due",
      overdue: "Overdue",
      "first-run": "First run",
      "paid-up": "Paid up",
      grace: "Grace",
      subscribe: "Subscribe",
      lease: "Lease-to-own",
    };
    document.title = "BatterySmart — " + titleMap[state];

    var switcher = STATES.map(function (name) {
      var current = name === state ? ' aria-current="page"' : "";
      return '<a href="' + hrefFor(name) + '"' + current + ">" + name + "</a>";
    }).join("");

    var banner = "";
    if (s.banner) {
      banner =
        '<div class="banner ' +
        s.banner.kind +
        '" role="status">' +
        ic.bill +
        '<div class="banner-copy"><strong>' +
        s.banner.title +
        "</strong><span>" +
        s.banner.body +
        "</span></div>" +
        ic.chevron +
        "</div>";
    }

    var cta = s.cta
      ? '<button class="cta ' +
        (s.cta === "Fix" ? "fix" : "pay") +
        '" type="button">' +
        s.cta +
        "</button>"
      : '<p class="calm">' + s.calm + "</p>";

    var dueNote = s.dueNote ? '<div class="plan-note">' + s.dueNote + "</div>" : "";

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
      '<svg class="brand-mark" viewBox="0 0 28 28" aria-hidden="true"><rect width="28" height="28" rx="8" fill="#0b6b4a"/><rect x="6" y="9" width="14" height="10" rx="2" fill="#d9fff0"/><rect x="20" y="12" width="2.4" height="4" rx=".6" fill="#d9fff0"/></svg>' +
      "BatterySmart</div>" +
      '<div class="header-ride ' +
      (s.rideOk ? "ok" : "fail") +
      '">' +
      s.headerRide +
      "</div>" +
      "</header>" +
      '<main class="screen">' +
      banner +
      '<div class="hero-art" aria-hidden="true">' +
      heroArt() +
      "</div>" +
      '<section class="hero-copy' +
      (s.rideOk ? "" : " fail-hero") +
      '" aria-label="Can I ride">' +
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
        : '<div class="chip fail">' +
          ic.mosfetFail +
          '<div class="meta"><div class="k">MOSFET</div><div class="v">' +
          s.mosfetLabel +
          "</div></div></div>" +
          '<div class="chip muted">' +
          ic.battery +
          '<div class="meta"><div class="k">Battery</div><div class="v">' +
          s.batteryLabel +
          "</div></div></div>") +
      "</section>" +
      '<section class="jobs" aria-label="Home questions">' +
      "<div><span>Can I ride</span><b>" +
      s.jobs.ride +
      "</b></div>" +
      "<div><span>What's my plan</span><b>" +
      s.jobs.plan +
      "</b></div>" +
      "<div><span>Do I owe</span><b>" +
      s.jobs.owe +
      "</b></div>" +
      "<div><span>What's next</span><b>" +
      s.jobs.next +
      "</b></div>" +
      "</section>" +
      '<section class="plan-card" aria-label="Plan and due">' +
      '<div class="plan-chip">' +
      s.plan.name +
      "</div>" +
      '<div class="plan-pair">' +
      '<div><div class="k">Date</div><div class="v">' +
      s.dueDate +
      "</div></div>" +
      '<div><div class="k">Amount</div><div class="v' +
      (s.dueTone ? " " + s.dueTone : "") +
      '">' +
      s.dueAmount +
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
      hrefFor(state) +
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

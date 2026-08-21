(function () {
  "use strict";

  var STATES = ["ready", "fault", "due", "overdue"];

  var PLAN = {
    name: "Subscribe",
    amount: "₹2,499/month",
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
      check:
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.5 12.5l3.4 3.4 7.6-8" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      home:
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 11.2L12 4.5l8 6.7V20a1 1 0 0 1-1 1h-5.2v-6.2H10.2V21H5a1 1 0 0 1-1-1v-8.8z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
      wallet:
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="6.5" width="18" height="13" rx="2.2" stroke="currentColor" stroke-width="1.8"/><path d="M3 10h18" stroke="currentColor" stroke-width="1.8"/><circle cx="16.2" cy="14.4" r="1.2" fill="currentColor"/></svg>',
      plan:
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="3.5" width="14" height="17" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M8.5 8h7M8.5 12h7M8.5 16h4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    };
  }

  function heroArt(fault) {
    var packFill = fault ? "#ffdad6" : "#b4f2b8";
    var packStroke = fault ? "#ba1a1a" : "#146c2e";
    var cell = fault ? "#ba1a1a" : "#146c2e";
    var badge = fault
      ? '<circle cx="132" cy="18" r="10" fill="#ba1a1a"/><path d="M132 13v6" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/><circle cx="132" cy="22.2" r=".9" fill="#fff"/>'
      : '<circle cx="132" cy="18" r="10" fill="#146c2e"/><path d="M128.2 18.2l2.3 2.2 5.2-5.4" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>';

    return (
      '<svg viewBox="0 0 148 72" fill="none" aria-hidden="true">' +
      '<path d="M28 50c8-12 18-18 34-18h28c10 0 16 5 22 14" stroke="#3e4940" stroke-width="2" stroke-linecap="round"/>' +
      '<circle cx="40" cy="56" r="8" stroke="#161d16" stroke-width="2"/>' +
      '<circle cx="108" cy="56" r="8" stroke="#161d16" stroke-width="2"/>' +
      '<path d="M24 50h96c3 0 6 2.4 6 5.4v1.2H22v-2c0-2.6 1.6-4.6 2-4.6z" fill="#2b322b"/>' +
      '<path d="M46 22h36c4 0 8 3 8 8v12H38V30c0-5 4-8 8-8z" fill="#dce2d8" stroke="#161d16" stroke-width="1.6"/>' +
      '<path d="M58 16h16c2.4 0 4 1.6 4 3.6V22H54v-2.4c0-2 1.6-3.6 4-3.6z" fill="#cfd6cb" stroke="#161d16" stroke-width="1.4"/>' +
      '<rect x="78" y="28" width="44" height="22" rx="4" fill="' +
      packFill +
      '" stroke="' +
      packStroke +
      '" stroke-width="1.8"/>' +
      '<rect x="82" y="32.5" width="7" height="13" rx="1.2" fill="' +
      cell +
      '"/>' +
      '<rect x="91.5" y="32.5" width="7" height="13" rx="1.2" fill="' +
      cell +
      '"/>' +
      '<rect x="101" y="32.5" width="7" height="13" rx="1.2" fill="' +
      cell +
      '" opacity=".55"/>' +
      '<rect x="110.5" y="32.5" width="7" height="13" rx="1.2" fill="' +
      packStroke +
      '" opacity=".25"/>' +
      badge +
      "</svg>"
    );
  }

  function stateModel(state) {
    var rideOk = state !== "fault";
    var mosfetOk = state !== "fault";

    var due = {
      ready: {
        value: "Paid",
        sub: "On-time discount applied",
        tone: "due-paid",
      },
      fault: {
        value: "Paid",
        sub: "On-time discount applied",
        tone: "due-paid",
      },
      due: {
        value: "₹2,499 due",
        sub: "Due 25 Aug · On-time discount if paid now",
        tone: "due-warn",
      },
      overdue: {
        value: "₹2,499 + penalty",
        sub: "Overdue since 14 Aug",
        tone: "due-over",
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
      batterySub: rideOk ? "Still there" : "Issue is MOSFET",
      plan: PLAN,
      due: due[state],
      cta: state === "fault" ? "Fix" : state === "ready" ? null : "Pay now",
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
        "<div><strong>" +
        s.banner.title +
        "</strong><span>" +
        s.banner.body +
        "</span></div></div>"
      : "";

    var cta = s.cta
      ? '<button class="cta ' +
        (s.cta === "Fix" ? "fix" : "pay") +
        '" type="button">' +
        s.cta +
        "</button>"
      : '<div class="calm">' + ic.check + " Paid up · no charge due</div>";

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
      '<svg class="brand-mark" viewBox="0 0 28 28" aria-hidden="true"><rect width="28" height="28" rx="8" fill="#146c2e"/><rect x="6" y="9" width="14" height="10" rx="2" fill="#b4f2b8"/><rect x="20" y="12" width="2.4" height="4" rx=".6" fill="#b4f2b8"/></svg>' +
      "BatterySmart</div>" +
      '<div class="home-label">' +
      titleMap[state] +
      "</div>" +
      "</header>" +
      '<main class="screen">' +
      banner +
      '<section class="hero" aria-label="Ride status">' +
      '<div class="hero-copy">' +
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
      "</div>" +
      '<div class="hero-art">' +
      heroArt(!s.mosfetOk) +
      "</div>" +
      "</section>" +
      '<section class="status-row" aria-label="Battery and MOSFET">' +
      '<div class="chip ok">' +
      ic.battery +
      '<div class="meta"><div class="k">Battery</div><div class="v">' +
      s.batteryLabel +
      "</div></div></div>" +
      '<div class="chip ' +
      (s.mosfetOk ? "ok" : "fail") +
      '">' +
      (s.mosfetOk ? ic.mosfetOk : ic.mosfetFail) +
      '<div class="meta"><div class="k">MOSFET</div><div class="v">' +
      s.mosfetLabel +
      "</div></div></div>" +
      "</section>" +
      '<section class="card" aria-label="Plan">' +
      "<div><div class=\"k\">Plan</div><div class=\"v\">" +
      s.plan.name +
      '</div><div class="sub">3W battery rental</div></div>' +
      '<div class="right"><div class="v">' +
      s.plan.amount +
      "</div></div>" +
      "</section>" +
      '<section class="card ' +
      s.due.tone +
      '" aria-label="Due">' +
      "<div><div class=\"k\">Due</div><div class=\"v\">" +
      s.due.value +
      '</div><div class="sub">' +
      s.due.sub +
      "</div></div>" +
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

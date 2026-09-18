/**
 * Terminal-style typewriter for the homepage hero. Cycles through a small
 * set of mock status lines, typing and deleting each in turn. Original —
 * not affiliated with, or derived from, any other Ghost theme.
 */
(function () {
  "use strict";

  var LINES = [
    "$ systemctl status sanity\n● sanity.service - loaded, inactive (dead)",
    "$ uptime\n up 47 days, load average: too high, too high, too high",
    "$ tail -f /var/log/regrets.log\n[INFO] deployed on a Friday\n[WARN] it's fine\n[ERROR] it was not fine",
    "$ git blame incident.md\nyou. it was you.",
    "$ echo $STATUS\nmostly fine, historically speaking",
  ];

  var TYPE_MS = 28;
  var DELETE_MS = 14;
  var HOLD_MS = 1800;
  var GAP_MS = 500;

  function run() {
    var el = document.getElementById("terminal-output");
    if (!el) return;

    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = LINES[0];
      return;
    }

    var lineIndex = 0;

    function typeLine() {
      var text = LINES[lineIndex];
      var i = 0;
      el.textContent = "";

      (function typeChar() {
        if (i <= text.length) {
          el.textContent = text.slice(0, i);
          i += 1;
          setTimeout(typeChar, TYPE_MS);
        } else {
          setTimeout(deleteLine, HOLD_MS);
        }
      })();
    }

    function deleteLine() {
      var text = el.textContent;
      (function deleteChar() {
        if (text.length > 0) {
          text = text.slice(0, -1);
          el.textContent = text;
          setTimeout(deleteChar, DELETE_MS);
        } else {
          lineIndex = (lineIndex + 1) % LINES.length;
          setTimeout(typeLine, GAP_MS);
        }
      })();
    }

    typeLine();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();

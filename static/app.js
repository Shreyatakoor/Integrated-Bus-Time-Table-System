document.addEventListener("DOMContentLoaded", () => {
  const sel = document.getElementById("routeSelect");
  const out = document.getElementById("timetable");

  sel.addEventListener("change", async () => {
    const val = sel.value;
    out.innerHTML = "";
    if (!val) return;
    const resp = await fetch(/api/route/${val});
    if (!resp.ok) {
      const err = await resp.json();
      out.innerHTML = <p style="color:red">${err.error || 'Error'}</p>;
      return;
    }
    const data = await resp.json();
    // data has single key
    const key = Object.keys(data)[0];
    const rows = data[key];
    let html = <h3>${key}</h3>;
    html += <table class="table"><thead><tr><th>Stop</th><th>Time</th></tr></thead><tbody>;
    rows.forEach(r => {
      html += <tr><td>${r.stop}</td><td>${r.time}</td></tr>;
    });
    html += </tbody></table>;
    out.innerHTML = html;
  });
});

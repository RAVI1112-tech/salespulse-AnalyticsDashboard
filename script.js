
"use strict";

// Demo sales data. Replace this array with your own records.
const salesData = [
  {id:"SP-1001",product:"Wireless Headphones",category:"Electronics",region:"South",date:"2026-01-08",units:12,revenue:35988},
  {id:"SP-1002",product:"Office Chair",category:"Furniture",region:"North",date:"2026-01-14",units:5,revenue:24995},
  {id:"SP-1003",product:"Cotton T-Shirt",category:"Apparel",region:"West",date:"2026-01-21",units:24,revenue:11976},
  {id:"SP-1004",product:"Coffee Maker",category:"Home",region:"East",date:"2026-02-03",units:8,revenue:15992},
  {id:"SP-1005",product:"Smart Watch",category:"Electronics",region:"South",date:"2026-02-11",units:10,revenue:49990},
  {id:"SP-1006",product:"Desk Lamp",category:"Home",region:"North",date:"2026-02-19",units:15,revenue:8990},
  {id:"SP-1007",product:"Running Shoes",category:"Apparel",region:"East",date:"2026-03-02",units:9,revenue:26991},
  {id:"SP-1008",product:"Bookshelf",category:"Furniture",region:"West",date:"2026-03-17",units:4,revenue:17996},
  {id:"SP-1009",product:"Bluetooth Speaker",category:"Electronics",region:"North",date:"2026-04-05",units:14,revenue:27986},
  {id:"SP-1010",product:"Bed Sheet Set",category:"Home",region:"South",date:"2026-04-12",units:11,revenue:10989},
  {id:"SP-1011",product:"Denim Jeans",category:"Apparel",region:"West",date:"2026-04-25",units:13,revenue:25987},
  {id:"SP-1012",product:"Study Desk",category:"Furniture",region:"East",date:"2026-05-04",units:3,revenue:20997},
  {id:"SP-1013",product:"Tablet",category:"Electronics",region:"South",date:"2026-05-18",units:6,revenue:89994},
  {id:"SP-1014",product:"Water Bottle",category:"Home",region:"North",date:"2026-05-23",units:30,revenue:8997},
  {id:"SP-1015",product:"Formal Shirt",category:"Apparel",region:"East",date:"2026-06-07",units:17,revenue:16983},
  {id:"SP-1016",product:"Dining Chair",category:"Furniture",region:"West",date:"2026-06-21",units:7,revenue:24493},
  {id:"SP-1017",product:"Gaming Mouse",category:"Electronics",region:"East",date:"2026-07-02",units:18,revenue:26982},
  {id:"SP-1018",product:"Curtains",category:"Home",region:"South",date:"2026-07-16",units:9,revenue:8091},
  {id:"SP-1019",product:"Hoodie",category:"Apparel",region:"North",date:"2026-08-03",units:12,revenue:17988},
  {id:"SP-1020",product:"Storage Cabinet",category:"Furniture",region:"East",date:"2026-08-19",units:4,revenue:31996},
  {id:"SP-1021",product:"Laptop Stand",category:"Electronics",region:"West",date:"2026-09-06",units:16,revenue:23984},
  {id:"SP-1022",product:"Floor Lamp",category:"Home",region:"North",date:"2026-09-22",units:6,revenue:11994},
  {id:"SP-1023",product:"Travel Backpack",category:"Apparel",region:"South",date:"2026-10-04",units:8,revenue:15992},
  {id:"SP-1024",product:"Monitor",category:"Electronics",region:"East",date:"2026-10-16",units:5,revenue:74995},
  {id:"SP-1025",product:"Sofa Side Table",category:"Furniture",region:"West",date:"2026-11-02",units:6,revenue:17994},
  {id:"SP-1026",product:"Toaster",category:"Home",region:"South",date:"2026-11-14",units:10,revenue:9990},
  {id:"SP-1027",product:"Winter Jacket",category:"Apparel",region:"North",date:"2026-12-03",units:7,revenue:27993},
  {id:"SP-1028",product:"Wireless Earbuds",category:"Electronics",region:"West",date:"2026-12-18",units:20,revenue:39980}
];

const categoryColors = {
  Electronics: "#7063eb",
  Furniture: "#4e91e8",
  Apparel: "#f0a35c",
  Home: "#28b58a"
};

const productIcons = {
  Electronics: "⌁",
  Furniture: "▤",
  Apparel: "◇",
  Home: "⌂"
};

const $ = id => document.getElementById(id);

let activePeriod = "all";
let showAll = false;

function money(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}

function number(value) {
  return new Intl.NumberFormat("en-IN").format(value);
}

function shortMoney(value) {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }

  if (value >= 1000) {
    return `₹${(value / 1000).toFixed(0)}k`;
  }

  return `₹${value}`;
}

function dateLabel(date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(`${date}T00:00:00`));
}

function quarterFor(date) {
  const month = Number(date.slice(5, 7));
  return `Q${Math.ceil(month / 3)}`;
}

function getPeriodData() {
  return activePeriod === "all"
    ? salesData
    : salesData.filter(item => quarterFor(item.date) === activePeriod);
}

function fillSelect(selectId, values) {
  const select = $(selectId);
  const oldValue = select.value || "all";

  select.innerHTML =
    '<option value="all">All ' +
    (selectId.toLowerCase().includes("region")
      ? "regions"
      : "categories") +
    "</option>" +
    values.map(value =>
      `<option value="${escapeHTML(value)}">${escapeHTML(value)}</option>`
    ).join("");

  if (values.includes(oldValue)) {
    select.value = oldValue;
  }
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[ch]);
}

function setupFilters() {
  const regions = [...new Set(salesData.map(item => item.region))].sort();
  const categories = [...new Set(salesData.map(item => item.category))].sort();

  ["regionFilter", "regionFilterAll"].forEach(id =>
    fillSelect(id, regions)
  );

  ["categoryFilter", "categoryFilterAll"].forEach(id =>
    fillSelect(id, categories)
  );
}

function updateKpis(data) {
  const revenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const orders = data.length;
  const units = data.reduce((sum, item) => sum + item.units, 0);

  $("revenueKpi").textContent = money(revenue);
  $("ordersKpi").textContent = number(orders);
  $("unitsKpi").textContent = number(units);
  $("aovKpi").textContent = money(orders ? revenue / orders : 0);
}

function getFilteredData(searchId, regionId, categoryId) {
  const data = getPeriodData();
  const query = $(searchId).value.trim().toLowerCase();
  const region = $(regionId).value;
  const category = $(categoryId).value;

  return data.filter(item => {
    const text =
      `${item.id} ${item.product} ${item.category} ${item.region} ${item.date}`
        .toLowerCase();

    const matchesText = text.includes(query);
    const matchesRegion = region === "all" || item.region === region;
    const matchesCategory = category === "all" || item.category === category;

    return matchesText && matchesRegion && matchesCategory;
  }).sort((a, b) => b.date.localeCompare(a.date));
}

function renderTable(data, bodyId, countId, limit = Infinity) {
  const shown = data.slice(0, limit);

  $(bodyId).innerHTML = shown.map(item => `
    <tr>
      <td><span class="order-id">${escapeHTML(item.id)}</span></td>
      <td>
        <div class="product-cell">
          <span class="product-icon"
            style="color:${categoryColors[item.category] || "#7063eb"}">
            ${productIcons[item.category] || "◇"}
          </span>
          <span>
            <span class="product-name">${escapeHTML(item.product)}</span>
            <span class="product-sub">${escapeHTML(item.category)}</span>
          </span>
        </div>
      </td>
      <td>${escapeHTML(item.category)}</td>
      <td><span class="region-pill">${escapeHTML(item.region)}</span></td>
      <td>${dateLabel(item.date)}</td>
      <td>${number(item.units)}</td>
      <td><span class="revenue-value">${money(item.revenue)}</span></td>
    </tr>
  `).join("");

  $(countId).textContent =
    `Showing ${shown.length} of ${data.length} record${data.length === 1 ? "" : "s"}`;
}

function renderRevenueChart(data) {
  const canvas = $("revenueChart");
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  canvas.width = Math.max(1, Math.floor(rect.width * dpr));
  canvas.height = Math.max(1, Math.floor(rect.height * dpr));

  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = rect.height;
  const pad = { left: 48, right: 12, top: 12, bottom: 29 };
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const monthly = Array(12).fill(0);

  data.forEach(item => {
    monthly[Number(item.date.slice(5, 7)) - 1] += item.revenue;
  });

  const max = Math.max(...monthly, 1) * 1.15;

  ctx.clearRect(0, 0, w, h);
  ctx.font = "10px DM Sans, sans-serif";
  ctx.textAlign = "right";

  for (let i = 0; i < 5; i++) {
    const y = pad.top + plotH * i / 4;
    const value = max * (4 - i) / 4;

    ctx.strokeStyle = "#edf0f6";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(w - pad.right, y);
    ctx.stroke();

    ctx.fillStyle = "#9aa3b3";
    ctx.fillText(shortMoney(value), pad.left - 9, y + 3);
  }

  const points = monthly.map((value, i) => ({
    x: pad.left + plotW * (i + 0.5) / 12,
    y: pad.top + plotH * (1 - value / max),
    value
  }));

  const gradient = ctx.createLinearGradient(
    0, pad.top, 0, pad.top + plotH
  );

  gradient.addColorStop(0, "rgba(112,99,235,.23)");
  gradient.addColorStop(1, "rgba(112,99,235,0)");

  ctx.beginPath();

  points.forEach((point, i) => {
    if (i) {
      ctx.lineTo(point.x, point.y);
    } else {
      ctx.moveTo(point.x, point.y);
    }
  });

  ctx.lineTo(points[11].x, pad.top + plotH);
  ctx.lineTo(points[0].x, pad.top + plotH);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.beginPath();

  points.forEach((point, i) => {
    if (i) {
      ctx.lineTo(point.x, point.y);
    } else {
      ctx.moveTo(point.x, point.y);
    }
  });

  ctx.strokeStyle = "#7063eb";
  ctx.lineWidth = 2.5;
  ctx.lineJoin = "round";
  ctx.stroke();

  points.forEach(point => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 3.2, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#7063eb";
    ctx.stroke();
  });

  ctx.textAlign = "center";
  ctx.fillStyle = "#9aa3b3";
  ctx.font = "10px DM Sans, sans-serif";

  monthNames.forEach((month, i) => {
    ctx.fillText(month, pad.left + plotW * (i + 0.5) / 12, h - 8);
  });
}

function renderDonut(data) {
  const canvas = $("categoryChart");
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;

  canvas.width = Math.max(1, Math.floor(rect.width * dpr));
  canvas.height = Math.max(1, Math.floor(rect.height * dpr));

  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = rect.height;
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.min(w, h) * 0.39;
  const thickness = Math.min(w, h) * 0.17;

  const sums = {};

  data.forEach(item => {
    sums[item.category] = (sums[item.category] || 0) + item.revenue;
  });

  const entries = Object.entries(sums).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((sum, entry) => sum + entry[1], 0);

  $("categoryTotal").textContent = shortMoney(total);

  ctx.clearRect(0, 0, w, h);
  ctx.lineWidth = thickness;
  ctx.lineCap = "butt";

  if (!total) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = "#edf0f6";
    ctx.stroke();
  } else {
    let angle = -Math.PI / 2;

    entries.forEach(([name, value]) => {
      const next = angle + value / total * Math.PI * 2;

      ctx.beginPath();
      ctx.arc(cx, cy, r, angle, next);
      ctx.strokeStyle = categoryColors[name] || "#aaa";
      ctx.stroke();

      angle = next;
    });
  }

  $("categoryLegend").innerHTML = entries.map(([name, value]) => `
    <div class="legend-item">
      <i class="legend-swatch"
        style="background:${categoryColors[name] || "#aaa"}"></i>
      <span>${escapeHTML(name)}</span>
      <span class="legend-value">${total ? Math.round(value / total * 100) : 0}%</span>
    </div>
  `).join("") || '<span class="legend-item">No sales for this period</span>';
}

function renderDashboard() {
  const data = getPeriodData();

  updateKpis(data);
  renderRevenueChart(data);
  renderDonut(data);

  const tableData = getFilteredData(
    "searchInput",
    "regionFilter",
    "categoryFilter"
  );

  renderTable(
    tableData,
    "salesTableBody",
    "resultsCount",
    showAll ? Infinity : 6
  );

  const allData = getFilteredData(
    "searchInputAll",
    "regionFilterAll",
    "categoryFilterAll"
  );

  renderTable(allData, "allSalesTableBody", "allResultsCount");
}

function downloadCSV(data) {
  if (!data.length) {
    alert("No sales records to export for the selected filters.");
    return;
  }

  const headers = [
    "Order ID", "Product", "Category", "Region",
    "Date", "Units", "Revenue (INR)"
  ];

  const rows = data.map(item => [
    item.id,
    item.product,
    item.category,
    item.region,
    item.date,
    item.units,
    item.revenue
  ]);

  const cell = value =>
    `"${String(value ?? "").replace(/"/g, '""')}"`;

  const csv = "\uFEFF" + [headers, ...rows]
    .map(row => row.map(cell).join(","))
    .join("\r\n");

  const url = URL.createObjectURL(
    new Blob([csv], { type: "text/csv;charset=utf-8;" })
  );

  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "salespulse-records.csv";

  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  URL.revokeObjectURL(url);
}

function setSection(section) {
  const overview = section === "overview";

  $("overviewSection").hidden = !overview;
  $("recordsSection").hidden = overview;
  $("crumbTitle").textContent = overview ? "Overview" : "Sales records";

  document.querySelectorAll(".nav-link").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.section === section
    );
  });

  $("sidebar").classList.remove("open");

  // Repaint charts after returning to the overview page.
  if (overview) {
    requestAnimationFrame(renderDashboard);
  }
}

function bindEvents() {
  $("periodFilter").addEventListener("change", event => {
    activePeriod = event.target.value;
    renderDashboard();
  });

  [
    "searchInput",
    "regionFilter",
    "categoryFilter",
    "searchInputAll",
    "regionFilterAll",
    "categoryFilterAll"
  ].forEach(id => {
    $(id).addEventListener(
      id.startsWith("search") ? "input" : "change",
      renderDashboard
    );
  });

  $("exportBtn").addEventListener("click", () => {
    downloadCSV(
      getFilteredData("searchInput", "regionFilter", "categoryFilter")
    );
  });

  $("exportAllBtn").addEventListener("click", () => {
    downloadCSV(
      getFilteredData(
        "searchInputAll",
        "regionFilterAll",
        "categoryFilterAll"
      )
    );
  });

  $("resetFilters").addEventListener("click", () => {
    activePeriod = "all";
    $("periodFilter").value = "all";

    ["searchInput", "searchInputAll"].forEach(id => {
      $(id).value = "";
    });

    [
      "regionFilter",
      "regionFilterAll",
      "categoryFilter",
      "categoryFilterAll"
    ].forEach(id => {
      $(id).value = "all";
    });

    renderDashboard();
  });

  $("viewAllBtn").addEventListener("click", () => {
    showAll = true;
    setSection("sales");
    renderDashboard();
  });

  document.querySelectorAll(".nav-link").forEach(button => {
    button.addEventListener("click", () => {
      setSection(button.dataset.section);
    });
  });

  $("menuButton").addEventListener("click", () => {
    $("sidebar").classList.toggle("open");
  });

  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      renderDashboard();
    }, 100);
  });
}

setupFilters();
bindEvents();
renderDashboard();

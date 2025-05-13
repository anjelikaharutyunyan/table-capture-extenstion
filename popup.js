
document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const tab = tabs[0]; 
    if (tab && tab.id) {
      chrome.tabs.sendMessage(tab.id, { action: "getTables" }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Message error:", chrome.runtime.lastError);
          return;
        }

        const container = document.getElementById("table-list");
        if (response && response.tables.length > 0) {
          response.tables.forEach((table, i) => {
            const div = document.createElement("div");
            div.className = "table-container";
            div.innerHTML = `
              <h2>Table ${i + 1}</h2>
              <div>${table.html}</div>
            `;
            const button = document.createElement("button");
            button.innerText = "Download CSV";
            button.addEventListener("click", () => downloadCSV(i));
            div.appendChild(button);
            container.appendChild(div);
          });

          window.tables = response.tables;
        } else {
          container.innerText = "No tables found.";
        }
      });
    } else {
      console.error("No active tab found.");
    }
  });
});

function downloadCSV(index) {
  const rows = window.tables[index].text.split("\n").map(r => r.split("\t"));
  const csvContent = rows.map(e => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `table_${index + 1}.csv`;
  a.click();
}

chrome.runtime.sendMessage({ greeting: "hello from popup" }, (response) => {
  console.log("👂 Response from background:", response);
});

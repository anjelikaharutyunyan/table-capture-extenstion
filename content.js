chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getTables") {
    const tables = Array.from(document.querySelectorAll("table"));
    const tableData = tables.map((table) => ({
      html: table.outerHTML,
      text: Array.from(table.rows).map(row =>
        Array.from(row.cells).map(cell => cell.innerText).join("\t")
      ).join("\n")
    }));

    sendResponse({ tables: tableData });
  }

  return true;
});

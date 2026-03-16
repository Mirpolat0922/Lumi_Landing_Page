/**
 * ┌───────────────────────────────────────────────────────────────┐
 * │  LUMI — Google Apps Script — Partner Form → Google Sheets     │
 * │                                                               │
 * │  HOW TO SET UP (one-time, ~10 minutes):                       │
 * │                                                               │
 * │  1. Go to sheets.google.com and create a new spreadsheet.     │
 * │     Name it "Lumi Partner Applications" (or anything).        │
 * │                                                               │
 * │  2. Open the spreadsheet and go to:                           │
 * │     Extensions → Apps Script                                  │
 * │                                                               │
 * │  3. Delete the default code and paste THIS entire file.       │
 * │                                                               │
 * │  4. Click "Save" (floppy disk icon or Ctrl+S).                │
 * │                                                               │
 * │  5. Click "Deploy" → "New deployment"                         │
 * │     - Select type: "Web app"                                  │
 * │     - Execute as: "Me"                                        │
 * │     - Who has access: "Anyone" (this makes the form work)     │
 * │     - Click "Deploy"                                          │
 * │                                                               │
 * │  6. Authorize the script when prompted.                       │
 * │                                                               │
 * │  7. Copy the "Web app URL" — it looks like:                   │
 * │     https://script.google.com/macros/s/XXXXXXX.../exec        │
 * │                                                               │
 * │  8. Paste that URL into js/config.js:                         │
 * │     PARTNER_FORM_ENDPOINT: "https://script.google.com/..."    │
 * │                                                               │
 * │  Done! Every form submission now goes to your spreadsheet.    │
 * └───────────────────────────────────────────────────────────────┘
 */

// ── Column headers — added automatically on first submission ──────
const HEADERS = [
  "Timestamp",
  "Full Name",
  "Center Name",
  "Phone",
  "Instagram",
  "Telegram",
  "Notes",
  "Language",
];

/**
 * doPost — called by the website when a partner submits the form.
 * Adds a new row to the first sheet of this spreadsheet.
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Add headers if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      // Bold the header row
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    // Append the new submission
    sheet.appendRow([
      new Date(data.submitted_at || new Date()).toLocaleString("uz-UZ"),
      data.name         || "",
      data.center       || "",
      data.phone        || "",
      data.instagram    || "",
      data.telegram     || "",
      data.notes        || "",
      data.lang         || "uz",
    ]);

    // Auto-resize columns for readability
    sheet.autoResizeColumns(1, HEADERS.length);

    // Return success — note: due to no-cors mode the website cannot
    // read this response, but it's useful for debugging in Apps Script.
    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    // Log the error for debugging in Apps Script's "Executions" tab
    console.error("Lumi partner form error:", err.toString());

    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * doGet — optional: returns a simple status message when you open
 * the web app URL directly in a browser (useful for testing).
 */
function doGet(e) {
  return ContentService
    .createTextOutput("Lumi Partner Form endpoint is active.")
    .setMimeType(ContentService.MimeType.TEXT);
}

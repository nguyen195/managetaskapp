/**
 * GOOGLE APPS SCRIPT CHO TASKFLOW DUO (2 NGƯỜI)
 * Hỗ trợ tự động tạo và đồng bộ 2 sheet: "Tasks" và "Expenses"
 * 
 * Hướng dẫn 3 bước:
 * 1. Mở Google Sheet > Tiện ích mở rộng (Extensions) > Apps Script.
 * 2. Dán toàn bộ mã này vào.
 * 3. Bấm Triển khai (Deploy) > Triển khai mới (New deployment) > Chọn "Ứng dụng web" (Web app).
 *    - Thực thi dưới dạng: Tôi (Me)
 *    - Người có quyền truy cập: Bất kỳ ai (Anyone)  <-- Quan trọng
 * 4. Copy URL dán vào ô Google Sheets trên TaskFlow Duo.
 */

const SHEET_TASKS = "Tasks";
const SHEET_EXPENSES = "Expenses";

function getOrCreateTasksSheet(ss) {
  let sheet = ss.getSheetByName(SHEET_TASKS);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_TASKS);
    sheet.appendRow(["id", "title", "desc", "projectId", "assignee", "status", "priority", "dueDate"]);
    sheet.getRange("A1:H1").setFontWeight("bold").setBackground("#1e293b").setFontColor("#ffffff");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function getOrCreateExpensesSheet(ss) {
  let sheet = ss.getSheetByName(SHEET_EXPENSES);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_EXPENSES);
    sheet.appendRow(["id", "title", "amount", "date", "projectId", "payer", "splitType"]);
    sheet.getRange("A1:G1").setFontWeight("bold").setBackground("#064e3b").setFontColor("#ffffff");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Xử lý lấy dữ liệu (GET)
function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const tasksSheet = getOrCreateTasksSheet(ss);
    const expensesSheet = getOrCreateExpensesSheet(ss);

    // Read Tasks
    const tData = tasksSheet.getDataRange().getValues();
    const tasks = [];
    if (tData.length > 1) {
      const tHeaders = tData[0];
      for (let i = 1; i < tData.length; i++) {
        if (!tData[i][0]) continue;
        const item = {};
        tHeaders.forEach((h, idx) => item[h] = tData[i][idx]);
        tasks.push(item);
      }
    }

    // Read Expenses
    const eData = expensesSheet.getDataRange().getValues();
    const expenses = [];
    if (eData.length > 1) {
      const eHeaders = eData[0];
      for (let i = 1; i < eData.length; i++) {
        if (!eData[i][0]) continue;
        const item = {};
        eHeaders.forEach((h, idx) => item[h] = eData[i][idx]);
        expenses.push(item);
      }
    }

    return ContentService.createTextOutput(JSON.stringify({ tasks: tasks, expenses: expenses }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Xử lý lưu/đồng bộ dữ liệu (POST)
function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const tasksSheet = getOrCreateTasksSheet(ss);
    const expensesSheet = getOrCreateExpensesSheet(ss);

    const body = JSON.parse(e.postData.contents);
    const tasks = body.tasks || [];
    const expenses = body.expenses || [];

    // Write Tasks
    const lastRowTasks = tasksSheet.getLastRow();
    if (lastRowTasks > 1) {
      tasksSheet.getRange(2, 1, lastRowTasks - 1, 8).clearContent();
    }
    if (tasks.length > 0) {
      const tRows = tasks.map(t => [
        t.id || "",
        t.title || "",
        t.desc || "",
        t.projectId || "",
        t.assignee || "Bạn",
        t.status || "TODO",
        t.priority || "MEDIUM",
        t.dueDate || ""
      ]);
      tasksSheet.getRange(2, 1, tRows.length, 8).setValues(tRows);
    }

    // Write Expenses
    const lastRowExpenses = expensesSheet.getLastRow();
    if (lastRowExpenses > 1) {
      expensesSheet.getRange(2, 1, lastRowExpenses - 1, 7).clearContent();
    }
    if (expenses.length > 0) {
      const eRows = expenses.map(x => [
        x.id || "",
        x.title || "",
        Number(x.amount) || 0,
        x.date || "",
        x.projectId || "",
        x.payer || "Bạn",
        x.splitType || "SPLIT_50_50"
      ]);
      expensesSheet.getRange(2, 1, eRows.length, 7).setValues(eRows);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      tasksCount: tasks.length,
      expensesCount: expenses.length
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

import * as constant from "./const.js";

async function saveOptions() {
  const calendarId = document.getElementById("calendarId").value;
  await chrome.storage.local.set({
    [constant.STORAGE_CALENDAR_KEY]: calendarId,
  });

  const status = document.getElementById("status");
  status.textContent = "Options saved.";
  setTimeout(() => {
    status.textContent = "";
  }, 750);
}

async function restoreOptions() {
  const calendarId = await chrome.storage.local.get(
    constant.STORAGE_CALENDAR_KEY,
  );
  document.getElementById("calendarId").value =
    calendarId?.yottyCalendarId || constant.DEFAULT_CALENDAR_ID;
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);

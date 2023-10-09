import { fetchEvent } from "./api.js";
import {
  buildCalendar,
  buildCalendarEventsFrom,
  addEventSources,
  getEventSources,
} from "./calendar.js";
import * as constant from "./const.js";

initialize();

/////////////////////
// Private functions
/////////////////////

async function initialize() {
  // build calendar instance
  const calendarElem = document.getElementById("calendar");
  const calendar = buildCalendar(calendarElem);

  // restore events from storage for initial render
  const storedEvents = await restoreEvents();
  addEventSources(calendar, storedEvents);

  // fetch events from google calendar
  const { token } = await chrome.identity.getAuthToken({ interactive: true });
  const calendarId = await restoreCalendarId();
  await fetchEvents(token, calendarId, calendar);

  // store events to render them on next load
  await storeEvents(getEventSources(calendar));
}

async function fetchEvents(token, calendarId, calendar) {
  let pageToken = "";
  do {
    const result = await fetchEvent(calendarId, token, pageToken);
    const calendarEvents = buildCalendarEventsFrom(result);
    // force update stored events
    addEventSources(calendar, calendarEvents, true);

    pageToken = result.nextPageToken;
  } while (pageToken);
}

async function restoreCalendarId() {
  const maybeCalendarId = await chrome.storage.local.get(
    constant.STORAGE_CALENDAR_KEY,
  );
  return (
    maybeCalendarId[constant.STORAGE_CALENDAR_KEY] ||
    constant.DEFAULT_CALENDAR_ID
  );
}

async function restoreEvents() {
  const events = await chrome.storage.local.get(constant.STORAGE_EVENT_KEY);
  return events.yottyEvents || [];
}

async function storeEvents(calendarEvents) {
  const events = calendarEvents.flatMap((s) => s.internalEventSource.meta);

  await chrome.storage.local.remove(constant.STORAGE_EVENT_KEY);
  await chrome.storage.local.set({ [constant.STORAGE_EVENT_KEY]: events });
}

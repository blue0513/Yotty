/* global luxon */

export async function fetchEvent(calendarId, authToken, pageToken) {
  const header = buildHeader(authToken);
  const url = buildURL(calendarId, pageToken);
  const response = await (await fetch(url, header)).json();

  return { items: response.items, nextPageToken: response.nextPageToken };
}

/////////////////////
// Private functions
/////////////////////

function buildURL(calendarId, pageToken = "") {
  const maxResults = 2500;
  const timeMin = luxon.DateTime.now()
    .minus({ days: 7 })
    .setZone("America/New_York")
    .toISO();
  const timeMax = luxon.DateTime.now()
    .plus({ months: 1 })
    .setZone("America/New_York")
    .toISO();
  const baseURL = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`;

  return `${baseURL}?timeMin=${timeMin}&timeMax=${timeMax}&maxResults=${maxResults}&pageToken=${pageToken}&singleEvents=true`;
}

function buildHeader(authToken) {
  const headers = {
    Authorization: "Bearer " + authToken,
    "Content-Type": "application/json",
  };

  return {
    method: "GET",
    async: true,
    headers,
    contentType: "json",
  };
}

/* global FullCalendar */
/* global tippy */

export function buildCalendarEventsFrom(event) {
  return event.items.map((event) => {
    return {
      id: event?.id,
      title: event?.summary,
      start: event?.start?.dateTime,
      end: event?.end?.dateTime,
      extendedProps: {
        description: event?.description,
        gcalLink: event?.htmlLink,
      },
    };
  });
}

export function addEventSources(calendar, calendarEvents, force = false) {
  if (force) {
    calendar.getEventSources().forEach((s) => s.remove());
  }

  const eventSourceIds = calendar
    .getEventSources()
    .flatMap((s) => s.internalEventSource.meta)
    .map((s) => s.id);
  const events = calendarEvents.filter((e) => !eventSourceIds.includes(e.id));

  calendar.addEventSource(events);
  calendar.render();
}

export function getEventSources(calendar) {
  return calendar.getEventSources();
}

export function buildCalendar(calendarElem) {
  const calendar = new FullCalendar.Calendar(calendarElem, {
    timeZone: "local",
    initialView: "timeGridDay",
    scrollTime: "09:00",
    nowIndicator: true,
    expandRows: true,
    height: 550,
    loading: (isLoading) => {
      if (!isLoading && document.getElementById("loader")) {
        document.getElementById("loader").remove();
      }
    },
    weekends: false,
    slotMinTime: "09:00:00",
    slotMaxTime: "20:00:00",
    eventClick: (info) => {
      window.open(info.event.extendedProps.gcalLink, "_blank");
    },
    eventDidMount: (info) => {
      tippy(info.el, {
        theme: "custom",
        delay: [200, 0],
        interactive: true,
        arrow: false,
        appendTo: document.body,
        content: buildTooltip(info),
      });
    },
    businessHours: {
      daysOfWeek: [1, 2, 3, 4, 5],
      startTime: "09:00",
      endTime: "20:00",
    },
    slotLabelFormat: {
      hour: "numeric",
      minute: "2-digit",
      meridiem: false,
      hour12: false,
    },
    eventTimeFormat: {
      hour: "numeric",
      minute: "2-digit",
      meridiem: false,
      hour12: false,
    },
    headerToolbar: {
      left: "prev,next,today",
      center: "title",
      right: "timeGridDay,timeGridWeek,dayGridMonth",
    },
  });
  return calendar;
}

/////////////////////
// Private functions
/////////////////////

function buildTooltip(info) {
  const title = `<strong>${info.event.title}</strong><br/>`;
  const htmlText = info.event.extendedProps.description?.replace(/\n/g, "<br>");
  const description = htmlText ? `<p>${htmlText}</p>` : "";
  return `${title}${description}`;
}

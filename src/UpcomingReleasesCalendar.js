import React from "react";

// Example event data
export const releases = [
  {
    day: -3,
    title: "Grand Opening",
    location: "Triad Records",
    time: "7:00 PM EST",
    description: "Grand opening event for the city.",
  },
];

function getMonthDays(year, month) {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export default function UpcomingReleasesCalendar({ releases: releasesProp }) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const days = getMonthDays(year, month);
  const firstDay = new Date(year, month, 1).getDay();
  const monthName = now.toLocaleString("default", { month: "long" });
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const today = new Date();
  const isToday = (date) =>
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  // Convert releases array to a map for quick lookup by day
  const releasesMap = (releasesProp || []).reduce((acc, event) => {
    acc[event.day] = event;
    return acc;
  }, {});

  const todayString = today.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <section className="calendar-section">
      <h2>Upcoming Events</h2>
      <div className="calendar">
        <div className="calendar-header">{monthName} {year}</div>
        <div className="calendar-grid">
          {daysOfWeek.map((d) => (
            <div key={d} className="calendar-day-header">{d}</div>
          ))}
          {Array(firstDay).fill(null).map((_, i) => (
            <div key={"empty-"+i} className="calendar-empty" />
          ))}
          {days.map((date) => {
            const day = date.getDate();
            const release = releasesMap[day];
            const classes = ["calendar-day"];
            if (release && isToday(date)) {
              classes.push("calendar-release-today");
            } else {
              if (release) classes.push("calendar-release");
              if (isToday(date)) classes.push("calendar-today");
            }
            return (
              <div
                key={day}
                className={classes.join(" ")}
                title={release ? release.title : undefined}
              >
                {day}
                {release && <span className="calendar-release-label">{release.title}</span>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 
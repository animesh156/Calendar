import { useState, useEffect } from "react";
import dayjs from "dayjs";
import EventModal from "./EventModal";
import EventListModal from "./EventListModal";
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";
import { CiExport } from "react-icons/ci";

const CalendarApp = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);

  // Load events from local storage
  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(savedEvents);
  }, []);

  // Save events to local storage
  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem("events", JSON.stringify(events));
    }
  }, [events]);

  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setShowEventModal(true);
    setShowListModal(false);
  };

  const handleSaveEvent = (newEvent) => {
    if (isOverlapping(newEvent)) {
      alert(
        "The event time overlaps with another event. Please adjust the time."
      );
      return;
    }

    const updatedEvents = [...events, newEvent];

    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const handleEditEvent = (updatedEvent) => {
    const updatedEvents = events.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event
    );
    console.log(updatedEvents);
    setEvents(updatedEvents);
    console.log(events);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const handleDeleteEvent = (eventToDelete) => {
    const updatedEvents = events.filter(
      (event) => event.id !== eventToDelete.id
    );
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

    // Set up interval to clear all data every 24 hours so that local storgae space don't get overflow
    useEffect(() => {
      const clearLocalStorage = () => {
        localStorage.clear();
        setEvents([]); // Clear state as well
        console.log("Local storage cleared after 24 hours");
      };
  
      // Set interval to clear storage every 24 hours (24 * 60 * 60 * 1000 = 86,400,000 ms)
      const interval = setInterval(clearLocalStorage, 24 * 60 * 60 * 1000);
  
      // Cleanup interval on component unmount
      return () => clearInterval(interval);
    }, []);
  

  const handleCloseModal = () => {
    setShowEventModal(false);
    setShowListModal(false);
  };

  const handleShowEventList = () => {
    setShowEventModal(false);
    setShowListModal(true);
  };

  const generateCalendarDays = () => {
    const days = [];
    let currentDate = startOfMonth.startOf("week");
    while (currentDate.isBefore(endOfMonth.endOf("week"), "day")) {
      days.push(currentDate);
      currentDate = currentDate.add(1, "day");
    }
    return days;
  };

  // checks for overlaaping of two events

  const isOverlapping = (newEvent) => {
    return events.some((event) => {
      // Check if events are on different days
      if (!dayjs(event.date).isSame(newEvent.date, "day")) {
        return false;
      }

      // Check if times overlap
      return (
        (newEvent.startTime >= event.startTime &&
          newEvent.startTime < event.endTime) ||
        (newEvent.endTime > event.startTime &&
          newEvent.endTime <= event.endTime) ||
        (newEvent.startTime <= event.startTime &&
          newEvent.endTime >= event.endTime)
      );
    });
  };

  // Export Events to JSON
  const exportToJSON = () => {
    const eventsForMonth = events.filter((event) =>
      dayjs(event.date).isSame(currentMonth, "month")
    );
    const blob = new Blob([JSON.stringify(eventsForMonth, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${currentMonth.format("MMMM-YYYY")}-events.json`;
    link.click();
  };

  // Export Events to CSV
  const exportToCSV = () => {
    const eventsForMonth = events.filter((event) =>
      dayjs(event.date).isSame(currentMonth, "month")
    );
    const headers = ["ID", "Title", "Date", "Description"];
    const rows = eventsForMonth.map((event) => [
      event.id,
      event.title,
      dayjs(event.date).format("YYYY-MM-DD"),
      event.description,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = `${currentMonth.format("MMMM-YYYY")}-events.csv`;
    link.click();
  };

  return (
    <div className="py-6 px-2">
      <div className="max-w-5xl mx-auto border-2 dark:border-cyan-300 bg-white dark:bg-zinc-900 shadow rounded-lg p-4 dark:shadow-cyan-200">
        <header className="flex justify-between items-center mb-4">
          <button
            onClick={handlePrevMonth}
            className="text-white bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            <FcPrevious size={26} />
          </button>
          <h1 className="text-xl font-bold text-gray-700 dark:text-white">
            {currentMonth.format("MMMM YYYY")}
          </h1>
          <button
            onClick={handleNextMonth}
            className="text-white bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            <FcNext size={26} />
          </button>
        </header>

        <div className="grid grid-cols-7 gap-2 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-sm font-bold text-gray-600 dark:text-white">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {generateCalendarDays().map((date, index) => {
            const isToday = date.isSame(dayjs(), "day");
            const isSelected = selectedDate && date.isSame(selectedDate, "day");
            const isCurrentMonth = date.isSame(currentMonth, "month");
            const hasEvent = events.some((event) => dayjs(event.date).isSame(date, "day"));

            return (
              <div
                key={index}
                className={`p-2 text-center rounded-lg cursor-pointer ${
                  isToday
              ? "bg-blue-400 text-white hover:bg-blue-500"
              : isSelected
              ? "bg-green-300 text-green-900 hover:bg-green-400"
              : hasEvent
              ? "bg-red-200 text-red-800 hover:bg-red-300"
              : isCurrentMonth
              ? "bg-gray-200 hover:bg-gray-300 text-black"
              : "bg-gray-100 hover:bg-gray-200 text-gray-400"
                }`}
                onClick={() => handleDayClick(date)}
              >
                {date.date()}
              </div>
            );
          })}
        </div>
      </div>

      {/* Export Buttons */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={exportToJSON}
          className=" bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-semibold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex items-center gap-x-1"
        >
          <CiExport size={20} /> JSON
        </button>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-x-1 bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-semibold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          <CiExport size={20} /> CSV
        </button>
      </div>

      {showEventModal && selectedDate && (
        <EventModal
          date={selectedDate}
          events={events.filter((event) =>
            dayjs(event.date).isSame(selectedDate, "day")
          )}
          onClose={handleCloseModal}
          onSave={handleSaveEvent}
          onShowList={handleShowEventList}
          setEvents={setEvents}
          onDeleteEvent={handleDeleteEvent}
        />
      )}

      {showListModal && selectedDate && (
        <EventListModal
          date={selectedDate}
          events={events.filter((event) =>
            dayjs(event.date).isSame(selectedDate, "day")
          )}
          onClose={handleCloseModal}
          setEvents={setEvents}
          onDeleteEvent={handleDeleteEvent}
          handleEditEvent={handleEditEvent}
        />
      )}
    </div>
  );
};

export default CalendarApp;

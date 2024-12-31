/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import EditEventModal from "./EditEventModal"; // Import the new EditEventModal component

const EventListModal = ({ date, events, onClose, onDeleteEvent, handleEditEvent }) => {
  const [editingEventId, setEditingEventId] = useState(null); // Track which event is being edited
  const [keyword, setKeyword] = useState(""); // State for keyword filter
  const [showEditModal, setShowEditModal] = useState(false); // State to control the visibility of the Edit Event Modal
  const [currentEvent, setCurrentEvent] = useState(null); // Track the event being edited

  // Define category colors for specific events (work, personal, school)
  const categoryColors = {
    work: "text-blue-600", // Blue for Work
    personal: "text-green-600", // Green for Personal
    school: "text-rose-600", // Rose for School
  };

  const handleEdit = (event) => {    // Function to handle the edit event
    setCurrentEvent(event);
    setShowEditModal(true); // Show the EditEventModal
  };

  const handleSaveEvent = (updatedEvent) => {
    handleEditEvent(updatedEvent); // Call the parent function to handle the event edit
    setShowEditModal(false); // Close the edit modal
  };

  const handleCancelEdit = () => {    // Function to handle the cancel edit event
    setShowEditModal(false); // Close the edit modal
  };

  const filteredEvents = events.filter((event) =>    // Filter events based on keyword by converting it to lowercase & checking if it includes the keyword
    event.name.toLowerCase().includes(keyword.toLowerCase()) ||
    event.description.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="modal fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-4 w-96">
        <h2 className="text-lg font-bold dark:text-white text-gray-700 mb-4 text-center">
          Event List for {date.format("DD MMMM YYYY")}
        </h2>

        {/* Keyword input for filtering */}
        <div className="mb-4">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="p-2 border-2 dark:border-cyan-300 border-gray-300 dark:bg-zinc-950 rounded-xl w-full"
            placeholder="Search events by keyword"
          />
        </div>

        <div className="max-h-60 overflow-y-auto"> {/* Add max height and enable scrolling for event list */}
          {filteredEvents.length > 0 ? (
            <ul className="mb-4">
              {filteredEvents.map((event) => (
                <li key={event.id} className="border-b py-2 dark:text-orange-500">
                  <div>
                    {/* Apply category color to event name */}
                    <strong className={categoryColors[event.name] || "text-black dark:text-yellow-400"}>
                      {event.name}
                    </strong>
                    <p>
                      {event.startTime} - {event.endTime}
                    </p>
                    <p>{event.description}</p>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleEdit(event)}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        <MdEditSquare size={22} />     
                      </button>     {/* Edit button */}
                      <button
                        onClick={() => onDeleteEvent(event)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <AiFillDelete size={22} />
                      </button>    {/* Delete button */}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-pink-400 mb-4 text-center font-bold">No events for this day.</p>   // Display message if no events are found
          )}
        </div>

        <button
          onClick={onClose}
          className=" bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-semibold rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Close
        </button>   {/* Close button */}
      </div>

      {/* Show the EditEventModal if the user is editing an event */}
      {showEditModal && currentEvent && (
        <EditEventModal    // Pass the current event, onSave, and onCancel functions to the EditEventModal which will handle the edit form
          event={currentEvent}
          onSave={handleSaveEvent}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default EventListModal;

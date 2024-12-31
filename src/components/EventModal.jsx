/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {v4 as uuidv4} from "uuid";     // used to generate unique IDs for each event
import { FaList } from "react-icons/fa";

const EventModal = ({ date, events, onClose, onSave, onShowList }) => {
  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");

  


  const handleSave = () => {    // Function to handle the save event
    if (!eventName || !startTime || !endTime) {
      alert("Please fill all required fields.");
      return;
    }

    const newEvent = {   // Create a new event object
      id: uuidv4(),
      name: eventName,
      startTime,
      endTime,
      description,
      date: date.format("YYYY-MM-DD"),
    };

    onSave(newEvent); // Save the event
    onClose(); // Close the modal
  };

  return (
    <div className="modal fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-4 w-96">
        <h2 className="text-lg font-bold dark:text-sky-700 text-gray-700 mb-2 text-center">
           {`Event for ${date.format("DD MMMM YYYY")}`}
        </h2>

        <button
          onClick={onShowList}
          className="text-gray-900 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-bold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex items-center gap-x-2"
        >
          <FaList /> Events
        </button>    {/* Button to show the event list */}

        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          className="w-full dark:bg-zinc-900 border-2 rounded-xl px-3 py-2 mb-2 border-red-400"
        />   {/* Input field for event name */}

        <div className="flex gap-2 mb-2">
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="flex-1 dark:bg-zinc-900 border-2 rounded-xl px-3 py-2 border-red-400"
          />    {/* Input field for start time */}

          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="flex-1 border-2 dark:bg-zinc-900 rounded-xl px-3 py-2 border-red-400"
          />    {/* Input field for end time */}

        </div>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border-2 dark:bg-zinc-900 rounded-xl px-3 py-2 mb-4 border-red-400"
        ></textarea>    {/* Textarea for event description */}

        <div className="flex justify-end gap-2">
          <button
            onClick={handleSave}
            className="text-gray-900 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-bold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Add
          </button>     {/* Button to add the event */}
          <button
            onClick={onClose}
            className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-bold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Cancel
          </button>     {/* Button to cancel the event */}
        </div>
      </div>
    </div>
  );
};

export default EventModal;

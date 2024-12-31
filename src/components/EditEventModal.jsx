/* eslint-disable react/prop-types */
import { useState } from "react";

const EditEventModal = ({ event, onSave, onCancel }) => {
  const [updatedEvent, setUpdatedEvent] = useState({ ...event });

  const handleInputChange = (field, value) => {
    setUpdatedEvent((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = () => {
    if (!updatedEvent.name || !updatedEvent.startTime || !updatedEvent.endTime) {
      alert("Please fill all required fields.");
      return;
    }
    onSave(updatedEvent); // Pass the updated event to the parent
  };

  return (
    <div className="modal fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-4 w-96">
        <h2 className="text-lg font-bold text-gray-700 dark:text-white mb-4 text-center">
          Edit Event
        </h2>
        
        <input
          type="text"
          value={updatedEvent.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className="mt-1 p-2 dark:bg-zinc-950 border-2 border-red-300 rounded-xl w-full mb-2"
          placeholder="Event Name"
        />
        <input
          type="time"
          value={updatedEvent.startTime}
          onChange={(e) => handleInputChange("startTime", e.target.value)}
          className="mt-1 p-2 dark:bg-zinc-950 border-2 border-red-300 rounded-xl w-full mb-2"
          placeholder="Start Time"
        />
        <input
          type="time"
          value={updatedEvent.endTime}
          onChange={(e) => handleInputChange("endTime", e.target.value)}
          className="mt-1 p-2 dark:bg-zinc-950 border-2 border-red-300 rounded-xl w-full mb-2"
          placeholder="End Time"
        />
        <textarea
          value={updatedEvent.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          className="mt-1 p-2 dark:bg-zinc-950 border-2 border-red-300 rounded-xl w-full mb-2"
          placeholder="Description"
        />
        
        <div className="flex gap-2">
          <button
            onClick={handleSaveChanges}
            className="text-black bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-semibold rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="text-black bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-semibold rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEventModal;

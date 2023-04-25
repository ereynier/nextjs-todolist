import React, { useState } from "react";

type Props = {
  onSubmit: (value: string) => void
  onCancel: () => void
  text: string
};

const Prompt: React.FC<Props> = ({ onSubmit, onCancel, text }) => {
  const [value, setValue] = useState(text);

  const handleSubmit = () => {
    onSubmit(value);
    setValue("");
  };

  return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md">
          <p className="text-2xl font-medium mb-6">Edit Todo:</p>
          <input
            type="text"
            className="border border-gray-300 rounded-md px-3 py-2 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>

  );
};

export default Prompt;
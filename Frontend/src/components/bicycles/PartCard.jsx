import React from "react";

const PartCard = React.memo(
  ({
    part,

    handleQuantityChange,

    handleMoveStage,
  }) => {
    return (
      <div className="bg-white rounded-xl shadow-md p-5">
        <h3 className="text-2xl font-bold mb-3">{part.part_name}</h3>

        <p className="mb-2 text-lg">
          Quantity:
          <span className="font-semibold ml-2">{part.quantity}</span>
        </p>

        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() => handleQuantityChange(part.id, part.quantity - 1)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            -
          </button>

          <span className="font-bold text-lg">{part.quantity}</span>

          <button
            onClick={() => handleQuantityChange(part.id, part.quantity + 1)}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            +
          </button>
        </div>

        <p className="text-lg mt-4">
          Stage:
          <span className="font-semibold text-green-600 ml-2">
            {part.stage}
          </span>
        </p>

        {part.stage === "Ready To Dispatch" ? (
          <button
            disabled
            className="mt-4 bg-gray-300 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed w-full font-medium"
          >
            ✓ Part Completed
          </button>
        ) : (
          <button
            onClick={() => handleMoveStage(part.id)}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full font-medium transition duration-200"
          >
            Move To Next Stage
          </button>
        )}
      </div>
    );
  },
);

export default PartCard;

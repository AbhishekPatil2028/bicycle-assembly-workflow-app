import React from "react";


const DashboardCard = React.memo(({

  title,

  count,

  borderColor,

  textColor,

  onClick

}) => {

  return (

    <div

      onClick={onClick}

      className={`

        bg-white rounded-2xl shadow-lg p-8 border-l-8

        ${borderColor}

        hover:scale-105
        hover:shadow-2xl
        transition duration-300
        cursor-pointer
      `}
    >

      <h2 className="text-2xl font-bold text-gray-700 mb-3">

        {title}

      </h2>


      <p
        className={`text-5xl font-bold ${textColor}`}
      >

        {count}

      </p>

    </div>
  );
});

export default DashboardCard;
/*
 * File         : CustomLegend.jsx
 * Author       : Ganapathy
 * Description  : CustomLegend component displays a legend for the bar chart.
 */

// CustomLegent component
const CustomLegent = ({ payload }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4 space-x-6">
      {/* Custom legend for the bar chart */}
      {payload.map((entry, index) => (
        <div key={`legend_${index}`} className="flex items-center space-x-2">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-xs text-gray-700 font-medium">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

// export the CustomLegent component
export default CustomLegent;

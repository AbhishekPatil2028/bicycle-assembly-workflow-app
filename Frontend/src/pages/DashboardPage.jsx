import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardData } from "../services/dashboardService";
import DashboardCard from "../components/dashboard/DashboardCard";
import DashboardHeader from "../components/dashboard/DashboardHeader";

function DashboardPage() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await getDashboardData();
      setDashboardData(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!dashboardData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-t-blue-600 border-gray-200 animate-spin mb-4"></div>
          <h1 className="text-2xl font-semibold text-gray-700">Loading Dashboard...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto space-y-12">
        <DashboardHeader navigate={navigate} />

        {/* Section 1: Bicycle Assembly Status */}
        <section className="space-y-6">
          <div className="border-b border-gray-200 pb-3">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              🚲 Bicycle Assembly Summary
            </h2>
            <p className="text-gray-500 text-sm mt-1">Overview of overall bicycle completion statuses</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DashboardCard
              title="In Progress Bicycles"
              count={dashboardData.bicycles?.in_progress ?? 0}
              borderColor="border-amber-400"
              textColor="text-amber-600"
              onClick={() => navigate("/bicycles")}
            />
            <DashboardCard
              title="Ready Bicycles"
              count={dashboardData.bicycles?.ready_to_dispatch ?? 0}
              borderColor="border-emerald-500"
              textColor="text-emerald-600"
              onClick={() => navigate("/ready-bicycles")}
            />
          </div>
        </section>

        {/* Section 2: Sub-Item / Part Breakdown */}
        <section className="space-y-6">
          <div className="border-b border-gray-200 pb-3">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              ⚙️ Sub-Item (Part) Stage Breakdown
            </h2>
            <p className="text-gray-500 text-sm mt-1">Breakdown of all parts currently in manufacturing stages</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard
              title="Procurement"
              count={dashboardData.parts?.procurement ?? 0}
              borderColor="border-yellow-400"
              textColor="text-yellow-600"
            />
            <DashboardCard
              title="Assembly"
              count={dashboardData.parts?.assembly ?? 0}
              borderColor="border-blue-500"
              textColor="text-blue-600"
            />
            <DashboardCard
              title="Testing"
              count={dashboardData.parts?.testing ?? 0}
              borderColor="border-purple-500"
              textColor="text-purple-600"
            />
            <DashboardCard
              title="Ready To Dispatch"
              count={dashboardData.parts?.ready_to_dispatch ?? 0}
              borderColor="border-green-500"
              textColor="text-green-600"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default DashboardPage;
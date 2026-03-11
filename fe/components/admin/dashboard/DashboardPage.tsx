"use client";
import PageHeader from "./PageHeader";
import StatsRow from "./StatsRow";
import RevenueChart from "../charts/RevenueChart";
import TrafficChart from "../charts/TrafficChart";
import VisitorChart from "../charts/VisitorChart";
import PerformanceMetrics from "./PerformanceMetrics";
import OrdersTable from "./OrdersTable";

export default function DashboardPage({ dark }: { dark: boolean }) {
  return (
    <main className="flex-1 overflow-y-auto p-6">
      <PageHeader dark={dark} />
      <StatsRow dark={dark} />
      <div className="grid grid-cols-[1fr_300px] gap-4 mb-4">
        <RevenueChart dark={dark} />
        <TrafficChart dark={dark} />
      </div>
      <div className="grid grid-cols-[300px_1fr] gap-4 mb-4">
        <VisitorChart dark={dark} />
        <PerformanceMetrics dark={dark} />
      </div>
      <OrdersTable dark={dark} />
    </main>
  );
}

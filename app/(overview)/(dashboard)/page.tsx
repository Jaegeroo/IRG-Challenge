import DashboardTable from "@/components/dashboard/dashboard-table";
import UtilizationChart from "@/components/dashboard/utilization-chart";
import PageHeader from "@/components/dashboard/page-header";
import { DashboardDataT } from "@/lib/types";

export default function Dashboard() {
  return (
    <div>
      <PageHeader />
      <div className="flex flex-col xl:flex-row gap-2 lg:gap-4 items-start">
        <UtilizationChart data={sampleData} />
        <DashboardTable data={sampleData} />
      </div>
    </div>
  );
}

const sampleData: DashboardDataT[] = [
  {
    week: 1,
    cap_hours: 160,
    sched_hours: 120,
    util: 75,
    cost: 4800,
    rev: 7200,
    profit: 2400,
  },
  {
    week: 2,
    cap_hours: 160,
    sched_hours: 140,
    util: 88,
    cost: 4800,
    rev: 8400,
    profit: 3600,
  },
  {
    week: 3,
    cap_hours: 160,
    sched_hours: 160,
    util: 100,
    cost: 4800,
    rev: 9600,
    profit: 4800,
  },
  {
    week: 4,
    cap_hours: 160,
    sched_hours: 180,
    util: 113,
    cost: 4800,
    rev: 10800,
    profit: 6000,
  },
  {
    week: 5,
    cap_hours: 160,
    sched_hours: 200,
    util: 125,
    cost: 4800,
    rev: 12000,
    profit: 7200,
  },
  {
    week: 6,
    cap_hours: 160,
    sched_hours: 160,
    util: 100,
    cost: 4800,
    rev: 9600,
    profit: 4800,
  },
  {
    week: 7,
    cap_hours: 160,
    sched_hours: 140,
    util: 88,
    cost: 4800,
    rev: 8400,
    profit: 3600,
  },
  {
    week: 8,
    cap_hours: 160,
    sched_hours: 120,
    util: 75,
    cost: 4800,
    rev: 3600,
    profit: -1200,
  },
  {
    week: 9,
    cap_hours: 160,
    sched_hours: 160,
    util: 100,
    cost: 4800,
    rev: 9600,
    profit: 4800,
  },
  {
    week: 10,
    cap_hours: 160,
    sched_hours: 180,
    util: 113,
    cost: 4800,
    rev: 10800,
    profit: 6000,
  },
  {
    week: 11,
    cap_hours: 160,
    sched_hours: 140,
    util: 88,
    cost: 4800,
    rev: 2400,
    profit: -2400,
  },
  {
    week: 12,
    cap_hours: 160,
    sched_hours: 160,
    util: 100,
    cost: 4800,
    rev: 9600,
    profit: 4800,
  },
];

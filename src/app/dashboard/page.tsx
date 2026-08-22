
    import { AIInsightsPanel } from "@/components/AIInsightsPanel";

    export default function DashboardPage() {
      return (
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="mt-6">
            <AIInsightsPanel keyword="best running shoes" url="https://example.com/shoes" />
          </div>
        </div>
      );
    }
import type { SelectReport } from "@/db/schema/reports";
import { ReportCard } from "../components/ReportCard";

export default function Home({ reports, title }: { reports: SelectReport[], title?: string }) {
  return (
    <main className="home">
      <h1>{title || "Siste hendelser"}</h1>
      {reports.length === 0 ? (
        <p>Ingen annonser</p>
      ) : (
        <section className="reports-grid">
          {reports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
      </section>
      )}
    </main>
  );
}

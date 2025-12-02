import type { SelectReport } from "@/db/schema/reports";
import { ReportCard } from "../components/ReportCard";

export default function Home({ reports, title }: { reports: SelectReport[], title?: string }) {
  return (
    <main className="page-container">
      {title && <h1>{title}</h1>}
        <section className="report-grid">
          {reports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
      </section>

      <style>{`
        .report-grid {
          display: grid;
          grid-template-columns: 1fr 1fr; 
          gap: 20px;
          padding: 20px 0;
        }
        @media (max-width: 768px) {
          .report-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}

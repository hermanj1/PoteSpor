import type { SelectReport } from "@/db/schema/reports";

const formatDate = (dateString: string | null) => {
  if (!dateString) return "Ukjent dato";
  return new Date(dateString).toLocaleDateString("no-NO", {
    day: "numeric", month: "long"
  });
};

export const ReportCard = ({ report }: { report: SelectReport }) => {
  return (
    <article className="report-card">
      <figure className="report-image-container">
        {report.imageUrl && (
          <img src={report.imageUrl} alt={report.species} className="report-image" />
        )}
        <span className={`status-badge ${report.status}`}>{report.status}</span>
      </figure>

      <div className="report-content">
        <h3>{report.species} {report.petName ? `- ${report.petName}` : ""}</h3>
        <p className="report-location">{report.locationDescription || "Ukjent sted"}</p>
        <p className="report-date">
          <time dateTime={report.dateMissing || ""}>{formatDate(report.dateMissing)}</time>
        </p>
        <p className="report-desc">{report.description}</p>
      </div>
    </article>
  );
};
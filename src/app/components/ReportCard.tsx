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
      <style>{styles}</style>
    </article>
  );
};


const styles = `
  .report-card {
    display: flex;
    flex-direction: column;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    height: auto;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    padding: 30px;
    margin: 50px;
  }

  .report-image-container {
    position: relative;
    width: 100%;
    height: 200px;
  }

  .report-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .status-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 1rem;
    font-weight: bold;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .report-content {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .report-content h3 {
    font-size: 1.25rem;
    font-weight: 600;
  }

  .report-location, .report-date {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .report-desc {
    margin-top: 5px;
    font-size: 0.95rem;
  }
`;
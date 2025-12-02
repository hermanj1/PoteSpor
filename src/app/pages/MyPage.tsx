import type { SelectUser } from "@/db/schema/users";

interface MyPageProps {
  user: SelectUser;
}

export const MyPage = ({ user }: MyPageProps) => {
  return (
    <>
      <style>{styles}</style>
      <main className="my-page-continer">
        <h1 className="my-page-h1">Min Side</h1>
        
        <section className="my-page-info">
          <p className="my-page-text">
            <strong>Navn:</strong> {user.name}
          </p>
          <p className="my-page-text">
            <strong>E-post:</strong> {user.email}
          </p>
        </section>

        <form action="/api/logout" method="POST">
          <button 
            type="submit" 
            className="logut-button"
          >
            Logg ut
          </button>
        </form>
      </main>
    </>
  );
};


const styles = `
  .my-page-continer {
    max-width: 500px;
    margin: 40px auto;
    padding: 20px;
  }

  .my-page-h1 {
    font-size: 2rem;
    margin-bottom: 25px;
    text-align: center;
  }

  .my-page-info {
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    padding: 25px;
    margin-bottom: 25px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }

  .my-page-text {
    font-size: 1rem;
    margin-bottom: 12px;
    line-height: 1.5;
  }


  .my-page-text strong {
    margin-right: 8px;
  }

  .logut-button {
    display: block;
    width: 100%;
    background-color: #EEC6F5;
    color: white;
    padding: 12px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
  }

`;
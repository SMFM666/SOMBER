import Image from "next/image";

const archivedDrops = [
  {
    id: "A—001",
    name: "Traitor",
    status: "Sold out",
    year: "2026",
    front: "/media/traitor-front.png",
    back: "/media/traitor-back.png",
  },
  {
    id: "A—002",
    name: "Buried",
    status: "Sold out",
    year: "2026",
    front: "/media/buried-front.png",
    back: "/media/buried-back.png",
  },
];

export default function ArchivePage() {
  return (
    <main className="archive-page">
      <header className="archive-header">
        <a className="archive-home" href="/" aria-label="Return to SOMBER home">
          <Image src="/media/logo.png" alt="SOMBER" width={220} height={45} priority />
        </a>
        <p>Permanent record / No reproductions</p>
        <a href="/">Close ×</a>
      </header>

      <section className="archive-intro">
        <p className="eyebrow">Index of past releases</p>
        <h1>The archive</h1>
        <div>
          <p>What leaves the shop stays in the record.</p>
          <span>{String(archivedDrops.length).padStart(2, "0")} entries</span>
        </div>
      </section>

      <section className="archive-records" aria-label="Archived drops">
        {archivedDrops.map((drop) => (
          <article className="archive-record" key={drop.id}>
            <div className="archive-record-media">
              <Image className="record-front" src={drop.front} alt={`${drop.name} front`} fill sizes="(max-width: 800px) 100vw, 50vw" />
              <Image className="record-back" src={drop.back} alt={`${drop.name} back`} fill sizes="(max-width: 800px) 100vw, 50vw" />
            </div>
            <div className="archive-record-meta">
              <span>{drop.id}</span>
              <h2>{drop.name}</h2>
              <p>{drop.status}</p>
              <span>{drop.year}</span>
            </div>
          </article>
        ))}
      </section>

      <footer className="archive-page-footer">
        <p>SOMBER / Independent apparel</p>
        <a href="/">Return to current release ↑</a>
      </footer>
    </main>
  );
}

import EmptyState from "@/components/EmptyState";

export default function Home() {
  const isEmpty = true;

  if (isEmpty) {
    return <EmptyState showReset />;
  }
  return (
    <>
      <main className="min-h-screen">
        <section>
          <div className="layout grid grid-cols-1 gap-8 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            Hello airbnb!
          </div>
        </section>
      </main>
    </>
  );
}

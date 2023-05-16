import EmptyState from "@/components/EmptyState";

export default function NotFound() {
  return (
    <EmptyState
      title="not found"
      subTitle="Something went wrong. Please try again later."
      showReset
      resetLabel="Go Home"
    />
  );
}

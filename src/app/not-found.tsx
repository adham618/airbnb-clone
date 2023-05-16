import EmptyState from "@/components/EmptyState";

export default function NotFound() {
  return (
    <EmptyState
      title="Page Not Found"
      subTitle="Sorry, this page does not exist."
      showReset
      resetLabel="Go Home"
    />
  );
}

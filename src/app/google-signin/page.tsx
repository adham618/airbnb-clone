import getCurrentUser from "@/actions/getCurrentUser";

import GoogleWindow from "./GoogleWindow";

export default async function SignInPage() {
  const currentUser = await getCurrentUser();

  return <GoogleWindow currentUser={currentUser} />;
}

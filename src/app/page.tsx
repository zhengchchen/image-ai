import { auth } from "@/auth";
import { protectServer } from "@/features/auth/utils";

export default async function Home() {
  await protectServer();

  const session = await auth();

  return <div>{JSON.stringify(session)}</div>;
}

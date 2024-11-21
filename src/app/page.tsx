import { auth } from "@/auth";

export default async function Home() {
  const session = await auth()
  return (
    <div>
      {JSON.stringify(session)}
    </div>
  );
}

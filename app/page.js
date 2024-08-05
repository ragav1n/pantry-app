import Link from "next/link";

export default function Home() {
  return (
    <div className='flex items-center justify-center min-h-screen flex-col'>
      <h2 className="text-3xl mb-4">
        Pantry Management
      </h2> 
      <Link href="/dashboard/home">View Dashboard</Link>
    </div>
  );
}

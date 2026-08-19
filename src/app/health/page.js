async function getHealth() {
    // Placeholder "backend" — swap for a real endpoint later
    return { status: "ok", timestamp: new Date().toISOString() };
  }
  
  export default async function HealthPage() {
    const data = await getHealth();
    return (
      <div>
        <h1 className="text-2xl font-bold">Health Check</h1>
        <pre className="bg-gray-100 p-4 rounded mt-4">{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }
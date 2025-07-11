import { Badge } from "@/components/ui/badge";

interface ApiEndpointProps {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  endpoint: string;
  description: string;
}

export function ApiEndpoint({
  method,
  endpoint,
  description,
}: ApiEndpointProps) {
  const methodColors = {
    GET: "bg-green-100 text-green-800",
    POST: "bg-blue-100 text-blue-800",
    PUT: "bg-yellow-100 text-yellow-800",
    DELETE: "bg-red-100 text-red-800",
    PATCH: "bg-purple-100 text-purple-800",
  };

  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="flex items-center space-x-3 mb-2">
        <Badge className={methodColors[method]} variant="secondary">
          {method}
        </Badge>
        <code className="text-sm font-mono bg-white px-2 py-1 rounded border">
          {endpoint}
        </code>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

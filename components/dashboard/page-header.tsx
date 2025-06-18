import { Badge } from "../ui/badge";

export default function PageHeader() {
  return (
    <div className="pb-4 flex justify-between">
      <h1 className="text-2xl font-bold">
        Capacity Planning &#8226;{" "}
        <span className="font-semibold">12 Week Horizon</span>
      </h1>
      <div className="flex items-center gap-4">
        <Badge variant="secondary">Bench &#8226; 0 consultants</Badge>
        <Badge variant="destructive" className="opacity-40">
          Bench &#8226; 3 consultants
        </Badge>
      </div>
    </div>
  );
}

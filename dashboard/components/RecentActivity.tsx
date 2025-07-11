import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DashboardActivity } from "../hooks/useDashboard";
import { formatDate } from "@/lib/utils";

interface Props {
  data?: DashboardActivity[];
}

export function RecentActivity({ data }: Props) {
  if (!data) return;

  return (
    <div className="space-y-8">
      {data.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{activity.template.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {activity.template}
            </p>
            <p className="text-sm text-muted-foreground">
              {activity.recipient}
            </p>
          </div>
          <div className="ml-auto text-right">
            <div className="text-sm font-medium capitalize">
              {activity.status}
            </div>
            <div className="text-xs text-muted-foreground">
              {formatDate(activity.sentAt)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const SecuritySettings = () => {
  return (
    <Card className="card-warning">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-orange-500"></div>
          Security Settings
        </CardTitle>
        <CardDescription>
          Manage your account security preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8 text-muted-foreground">
          Security settings will be implemented in the next phase.
          <br />
          This includes password changes, 2FA, and session management.
        </div>
      </CardContent>
    </Card>
  );
};

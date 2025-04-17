import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

interface ResourceCardProps extends React.PropsWithChildren {
  title?: React.ReactNode;
  description?: React.ReactNode;
}

export const ResourceCard = ({
  title,
  description,
  children,
}: ResourceCardProps) => {
  return (
    <Card data-testid="resource-card">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="truncate">{description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-auto">{children}</CardContent>
    </Card>
  );
};

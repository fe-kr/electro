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
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="truncate">{description}</CardDescription>
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  );
};

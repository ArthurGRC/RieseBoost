import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/Ui/card';
import { DollarSign } from 'lucide-react';

const GenericCard = ({
  title,
  description,
  content,
  item,
}: {
  title: string;
  description: string;
  content: string;
  item: any;
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-center select-none">
          <CardTitle className="text-lg sm:text-xl text-rbGray">{title}</CardTitle>
          <item.icon className="ml-auto h-4 w-4" />
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-base sm:text-lg font-bold">{content}</p>
      </CardContent>
    </Card>
  );
};

export default GenericCard;

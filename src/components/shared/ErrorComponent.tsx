import { BadgeAlertIcon } from "lucide-react";

interface Props {
  message: string
}

const ErrorComponent = ({ message }: Props) => {
  return (
    <div className="flex items-center gap-4 m-auto">
      <BadgeAlertIcon size={30} className="text-primary-100" />
      <p className="text-primary-100 text-xl font-semibold">{message}</p>
    </div>
  );
}
 
export default ErrorComponent;
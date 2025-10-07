
interface Props {
  children: React.ReactNode
}

const StatsCard = ({ children }: Props) => {
  return (
    <div className="flex gap-2 border border-border rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow xl:p-6">
      {children}
    </div>
  );
}
 
export default StatsCard;
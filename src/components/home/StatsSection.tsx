import { ActivityIcon, ChartColumnIcon, TrendingUpIcon } from "lucide-react";
import StatsCard from "./StatsCard";

const StatsSection = () => {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatsCard>
        <div className="bg-primary/10 rounded-2xl p-4">
          <TrendingUpIcon size={24} className="text-primary" />
        </div>

        <div>
          <p className="text-sm text-secondary-100">Módulos activos</p>
          <p className="font-bold text-2xl">5</p>
        </div>
      </StatsCard>

      <StatsCard>
        <div className="bg-primary/10 rounded-2xl p-4">
          <ActivityIcon size={24} className="text-primary" />
        </div>

        <div>
          <p className="text-sm text-secondary-100">Estado del Sistema</p>
          <p className="font-bold text-lg text-primary xl:text-2xl">Óptimo</p>
        </div>
      </StatsCard>

      <StatsCard>
        <div className="bg-primary/10 rounded-2xl p-4">
          <ChartColumnIcon size={24} className="text-primary" />
        </div>

        <div>
          <p className="text-sm text-secondary-100">Accesos hoy</p>
          <p className="font-bold text-2xl">12</p>
        </div>
      </StatsCard>
    </section>
  );
}
 
export default StatsSection;
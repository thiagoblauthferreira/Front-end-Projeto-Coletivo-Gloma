import { useShelterProvider } from "../context";
import { formatDate } from "../../../../utils";

const Description = ({ title, text = "" }: { title: string; text?: string }) => {
  return (
    <p className="text-base">
      <span className="font-bold">{title}:</span> {text}
    </p>
  );
};

export function TabShelterDetails() {
  const { shelter } = useShelterProvider();

  return (
    <div className="my-5">
      <div className="stats bg-white stats-vertical md:stats-horizontal shadow w-full">
        <div className="stat">
          <div className="stat-title">Total Page Views</div>
          <div className="stat-value">89,400</div>
          <div className="stat-desc">21% more than last month</div>
        </div>
        <div className="stat">
          <div className="stat-title">Total Page Views</div>
          <div className="stat-value">89,400</div>
          <div className="stat-desc">21% more than last month</div>
        </div>
        <div className="stat">
          <div className="stat-title">Total Page Views</div>
          <div className="stat-value">89,400</div>
          <div className="stat-desc">21% more than last month</div>
        </div>
      </div>

      <h2 className="py-8 pb-4 font-bold text-lg">Abrigo</h2>

      <div className="card bg-white rounded-xl shadow">
        <div className="card-body p-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:p-8">
          <div className="h-60 w-full rounded-2xl bg-slate-600"></div>
          <div className="space-y-4">
            <Description title="Nome" text={shelter.name} />
            <Description title="Telefone" text={shelter.phone} />
            <Description title="Descrição" text={shelter.description} />
            <Description
              title="Data de criação"
              text={formatDate(shelter.createdAt, "DD/MM/YYYY")}
            />
          </div>

          <div className="col-span-1">
            <h2 className="py-4 font-bold text-lg">Endereço:</h2>
            <div className="space-y-4 pl-4">
              <Description title="CEP" text={shelter.address.cep} />
              <Description title="Estado" text={shelter.address.estado} />
              <Description title="País" text={shelter.address.pais} />
              <Description title="Município" text={shelter.address.municipio} />
              <Description title="Bairro" text={shelter.address.bairro} />
              <Description title="Logradouro" text={shelter.address.logradouro} />
              <Description title="Número" text={shelter.address.numero} />
              <Description title="Complemento" text={shelter.address.complemento} />
            </div>
          </div>

          <div className="col-span-1">
            <h2 className="py-4 font-bold text-lg">Responsável:</h2>
            <div className="space-y-4 pl-4">
              <Description title="Nome" text={shelter.creator.name} />
              <Description title="Email" text={shelter.creator.email} />
              <Description title="Telefone" text={shelter.creator.phone} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

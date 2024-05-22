import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import Input from "../components/Inputs/Input";
import PrimaryButton from "../components/PrimaryButton";
import img from "../assets/sem-dados.png"
import { tv } from "tailwind-variants";
import DynamicIcon from "../components/DynamicIcon";

function Scheduling() {
  const location = useLocation()
  const materiais: any[] = [
    {
      id: 1,
      material: ["Ferro", "Pesado"]
    },
    {
      id: 2,
      material: ["Plastico", "Leve"]
    }
  ]

  const enderecos: any[] = [
    {
      id: 1,
      logradouro: "Rua ali",
      numero: 1000,
      bairro: "Vila",
      cidade: "BH",
      estado: "MG",
      complemento: ""
    },
    {
      id: 2,
      logradouro: "Rua ali",
      numero: 1000,
      bairro: "Vila",
      cidade: "BH",
      estado: "MG",
      complemento: ""
    },
    {
      id: 3,
      logradouro: "Rua ali",
      numero: 1000,
      bairro: "Vila",
      cidade: "BH",
      estado: "MG",
      complemento: ""
    },
    {
      id: 4,
      logradouro: "Rua ali",
      numero: 1000,
      bairro: "Vila",
      cidade: "BH",
      estado: "MG",
      complemento: ""
    }
  ]
  const ItemMaterial = (material: string[]) => {
    return (
      <div className=" bg-input-color w-full flex flex-col p-4 rounded-lg">
        <p className="">Material: {material[0]}</p>
        <p className="">Peso: {material[1]}</p>
        <div className="flex gap-2 mt-4">
          <PrimaryButton color="red" title="Excluir" />
          <PrimaryButton title="Editar" />
        </div>
      </div>
    )
  }

  const ItemEndereco = (endereco: any, index: number) => {
    let style = tv(
      {
        slots: {
          fundo: "px-4 py-2 text-sm flex items-center gap-4"
        },
        variants: {
          bordaAtiva: {
            true: {
              fundo: "border-b-[1px] border-dark-green"
            },
            false: {
              fundo: ""
            }
          }

        }
      }
    )

    const { fundo } = style()

    return (
      <div className={fundo({ bordaAtiva: index != enderecos.length - 1 })}>
        <DynamicIcon iconName="IconCircle" size={20} className="text-dark-green" />
        <div>
          <p>{endereco.logradouro}, {endereco.numero}</p>
          <p>{endereco.bairro}</p>
          <p>{endereco.cidade}</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <NavBar path={location.pathname} />
      <TopBar title="Novo agendamento" backButton={false} />
      <div className="w-full min-h-screen flex items-center justify-center lg:py-6 bg-light-backgroud">
        <div className="w-full min-h-screen flex bg-light-backgroud lg:bg-light-green items-center flex-col lg:w-[550px] lg:rounded-2xl lg:mt-4 mb-20">
          <div className="w-full flex flex-col gap-2 max-w-[420px] px-6">
            <text className="text-3xl font-bold text-primary-green mb-2 mt-8">Seus dados</text>
            <div>
              <p>Nome: Joao Lucas</p>
              <p>Celular: (31)90000-0000</p>
              <p>Telefone: (31)90000-0000</p>
            </div>
            <div className="w-1/2 self-end mt-2">
              <PrimaryButton color="secondary" title="Editar dados" />
            </div>
            <text className="text-3xl font-bold text-primary-green mb-2 mt-6">Endereço</text>
            <div className="w-full h-64 border-[1px] border-solid border-dark-green rounded-md bg-input-color overflow-y-scroll">
              {
                enderecos.map((e, index) => ItemEndereco(e, index))
              }
            </div>
            <div className="w-1/2 self-end mt-2">
              <PrimaryButton color="secondary" title="Novo endereço" />
            </div>
            <text className="text-3xl font-bold text-primary-green mb-2 mt-6">Materiais da coleta</text>
          </div>
          <div className="w-full items-center justify-center flex py-6 max-w-[420px] px-3">
            <div className=" bg-light-green md:border-[1px] border-dark-green rounded-xl w-full items-center justify-center flex py-6 max-w-[420px]">
              <div className="w-full flex flex-col gap-6 max-w-[420px] px-3">
                <Input title="Descrição geral dos materiais" titleColor="dark" requiredField />
                <div className="w-full flex justify-end">
                  <div className="w-2/3">
                    <PrimaryButton title="Adicionar material" leftIcon="IconCirclePlus" />
                  </div>
                </div>
                {
                  materiais.length == 0 &&
                  <div className="flex flex-col gap-4 items-center justify-center p-8">
                    <img src={img} className="w-[30%]" />
                    <p className="font-light text-lg">{"Nenhum material adicionado..."}</p>
                  </div>
                }
                {
                  materiais.length > 0 &&
                  materiais.map(x => ItemMaterial(x.material))
                }
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <div className="w-2/3 mt-6 max-w-[250px] mb-16">
              <PrimaryButton title="Agendar coleta" leftIcon="IconCheck" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Scheduling;
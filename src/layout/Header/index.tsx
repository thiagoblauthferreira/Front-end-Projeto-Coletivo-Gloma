import { useAuthProvider } from "../../context/Auth";
import { Avatar, Button, Image, Link } from "../../components/common";
import logo from "../../assets/img/logo.png";
import { useNavigate } from "react-router-dom";

interface IHeaderProps {
  openSidebar: () => void;
}

export function Header({ openSidebar }: IHeaderProps) {
  const navigate = useNavigate();
  const { currentUser } = useAuthProvider();

  return (
    <header
      className={`
        fixed top-0 left-0 flex w-screen bg-white
        z-10 drop-shadow px-4
      `}
    >
      <div
        className={`
          m-auto max-w-7xl py-3 h-[100px] w-full
        `}
      >
        <div className="grid grid-cols-2 h-full">
          <Link href="/" className="inline-flex gap-3 hover:opacity-100">
            <div className={`flex justify-center h-full size-12`}>
              <Image alt="logo" src={logo} className="w-full object-contain" />
            </div>
            <p className="hidden self-center text-2xl font-semibold text-green-600 sm:flex">
              Coletivo Gloma
            </p>
          </Link>

          <div className="flex justify-end items-center">
            {currentUser ? (
              <div className="flex justify-center" onClick={openSidebar}>
                <Avatar src="" className="cursor-pointer size-[40px]" />
              </div>
            ) : (
              <div className="flex justify-center gap-2">
                <Button
                  text={"Entrar"}
                  className="bg-black w-max text-white"
                  onClick={() => navigate("/auth/login")}
                />
                <Button
                  text={"Registrar"}
                  className="bg-black w-max text-white"
                  onClick={() => navigate("/auth/register")}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

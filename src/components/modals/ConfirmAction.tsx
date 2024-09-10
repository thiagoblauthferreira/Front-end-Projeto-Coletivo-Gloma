import React from "react";
import { Button, Modal } from "../common";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface IModalConfirmActionProps {
  close: () => void;
  onSubmit: () => void;
  open: boolean;
  title: string;
  children?: React.ReactNode;
}

export function ModalConfirmAction({
  close,
  onSubmit,
  open,
  title,
  children,
}: IModalConfirmActionProps) {
  return (
    <Modal
      className="max-w-[343px] md:max-w-[400px] w-full p-3"
      open={open}
      close={close}
      removeBtnClose
    >
      <div className="w-full flex flex-col items-center gap-2">
        <IoIosCloseCircleOutline
          size={83}
          strokeWidth={1}
          className="text-red-600 mt-4"
        />
        <div className="w-full mb-2">
          <p className="text-2xl font-medium text-center">{title}</p>

          {children}
        </div>
        <div className="grid grid-rows-2 gap-2 mt-2 w-full">
          <Button
            type="button"
            text={"Cancelar"}
            className="w-full bg uppercase"
            onClick={close}
          />
          <Button
            type="button"
            text={"Confirmar"}
            className="w-full bg-black text-white uppercase"
            onClick={onSubmit}
          />
        </div>
      </div>
    </Modal>
  );
}

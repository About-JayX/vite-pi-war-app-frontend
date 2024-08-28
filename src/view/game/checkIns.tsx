import Button from "@/components/button";
import Modals from "@/components/modal";
import { Text } from "@/components/text";

export default function CheckIn({
  open = false,
  onHide,
}: {
  open?: boolean;
  onHide?: () => void;
}) {
  return (
    <Modals
      open={open}
      onHide={onHide}
      title="Title"
      body={
        <div className="grid gap-3 justify-items-center">
          <div className="grid grid-flow-col grid-cols-[40px,auto] items-center">
            <img
              src="/game/crystal.png"
              className="w-[40px] h-[40px] object-contain"
            />
            <Text className="text-[30px] font-bold truncate">
              9,941,999,999
            </Text>
          </div>
          <Text className="text-[20px] text-center font-normal text-[#5FB1F5] max-w-[250px]">
            The exchange has started workingfor you
          </Text>
          <Button className="text-[#4EFCFB]" onClick={()=>onHide && onHide()}>OK</Button>
        </div>
      }
    />
  );
}

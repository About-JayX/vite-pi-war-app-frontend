import { Container } from "@material-ui/core";

export default function Header() {
  return (
    <div className="!flex !flex-row !h-[4rem] !bg-transparent !backdrop-blur-[0.36rem] sticky top-0 z-[9] !transition-none !opacity-100">
       <Container maxWidth="xl" className="p-4 pt-0 pb-0 flex self-center">1</Container>
    </div>
  );
}

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="bg-[url(/bg.jpg)] bg-top bg-cover flex flex-col h-full">
      <div className="z-[4] items-center justify-center w-full h-full flex flex-col">
        <div className="w-full h-full md:h-auto md:w-[420px]">{children}</div>
      </div>
      <div className="fixed inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.8),rgba(0,0,0,0.4),rgba(0,0,0,0.8))] z[1]" />
    </div>
  );
};

export default AuthLayout;

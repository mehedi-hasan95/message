import Image from "next/image";

export const HomeService = () => {
  const service = [
    {
      id: "1",
      label: "Login with OTP, Chat / Status Stories",
    },
    {
      id: "2",
      label: "AI chatbot support",
    },
    {
      id: "3",
      label: "Your salse agent",
    },
    {
      id: "4",
      label: "Beutifull and minimal design",
    },
  ];
  return (
    <div className="grid md:grid-cols-2 items-center container mx-auto px-6 pt-8 md:pt-12 lg:pt-16 gap-5">
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white uppercase !leading-[4rem]">
          Keep the sale <br /> flowing at any place
        </h1>
        <div className="flex flex-col gap-5 pt-10">
          {service.map((item) => (
            <div className="flex gap-3 items-center" key={item.id}>
              <Image src="/hand.svg" alt="Hand" height={30} width={30} />
              <p className="text-white text-xl">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
      <Image
        src="/banner.png"
        alt="Banner"
        height={700}
        width={700}
        className="object-contain"
      />
    </div>
  );
};

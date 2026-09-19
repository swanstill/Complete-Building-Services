import Image from "next/image";

const HowitWorksCard = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: string;
  index: number;
}) => {
  return (
    <div className="flex items-center justify-center flex-col p-2 w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4 relative">
      <div className="aspect-3/2">
        <Image
          src={icon}
          alt="How It Works"
          height={100}
          width={100}
          className="mx-auto object-cover rounded-lg"
          style={{
            filter:
              "invert(51%) sepia(87%) saturate(1100%) hue-rotate(11deg) brightness(101%) contrast(105%)",
          }}
        />
      </div>
      <div className="font-bold text-base p-2">{`Step ${index + 1}`}</div>
      <div className="p-4 text-center">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-3 text-sm text-slate-500 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default HowitWorksCard;

import Image from "next/image";

interface SideComponentProps {
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  className?: string;
}

function SideComponent({
  title,
  subtitle,
  image,
  buttonText,
  className = "",
}: SideComponentProps) {
  return (
    <div
      className={`flex w-[342px] flex-col items-center rounded-xl bg-white p-6 ${className}`}
    >
      <div className="flex flex-col items-start gap-1 self-stretch">
        <div className="text-lg leading-7 font-semibold text-[#2D3139]">
          {title}
        </div>
        <div className="text-xs leading-4 font-medium text-[#686D79]">
          {subtitle}
        </div>
      </div>
      <div className="h-[80px] w-[100px] bg-gray-300">
        {image && (
          <Image
            src={image}
            alt={title}
            width={100}
            height={80}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <button className="flex w-full items-center justify-center rounded-lg bg-[#F9F2FD] p-3">
        <div className="text-sm leading-5 font-medium text-[#701DA5]">
          {buttonText}
        </div>
      </button>
    </div>
  );
}

export default function SideGroup() {
  return (
    <div className="flex flex-col gap-3">
      <SideComponent
        title="타이틀1"
        subtitle="서브타이틀1"
        image="/today/page.svg"
        buttonText="버튼1"
        className="gap-[30px]"
      />
      <SideComponent
        title="타이틀2"
        subtitle="서브타이틀2"
        image="/today/apply-component.svg"
        buttonText="버튼2"
        className="gap-6"
      />
    </div>
  );
}

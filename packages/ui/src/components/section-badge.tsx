interface Props {
  title: string;
}

const SectionBadge = ({ title }: Props) => {
  return (
    <div className="flex items-center justify-center gap-2 rounded-full bg-[#FFFFFF26] px-2.5 py-1">
      <div className="bg-primary/40 relative flex h-1.5 w-1.5 items-center justify-center rounded-full">
        <div className="bg-primary/60 flex h-2 w-2 animate-ping items-center justify-center rounded-full">
          <div className="bg-primary/60 flex h-2 w-2 animate-ping items-center justify-center rounded-full"></div>
        </div>
        <div className="bg-primary absolute top-1/2 left-1/2 flex h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"></div>
      </div>
      <span className="from-primary bg-gradient-to-r to-[#C5B9F6] bg-clip-text text-sm font-medium text-transparent">
        {title}
      </span>
    </div>
  );
};

export default SectionBadge;

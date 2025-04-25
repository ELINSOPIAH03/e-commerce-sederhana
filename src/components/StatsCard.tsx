type StatsCardProps = {
    title: string;
    value: string | number;
};

const StatsCard = ({ title, value } : StatsCardProps) => {
    return (
        <div className="flex min-w-[160px] grow shrink-0 basis-0 flex-col items-start gap-1 border border-slate-300 rounded-lg bg-white px-6 py-6 shadow-sm">
            <span className="line-clamp-1 w-full text-md sm:text-lg font-medium text-subtext-color">
                {title}
            </span>
            <span className="line-clamp-1 w-full text-sm sm:text-lg font-heading-3 text-green-800 font-semibold text-default-font">
                {value}
            </span>
        </div>
    )
}

export default StatsCard;
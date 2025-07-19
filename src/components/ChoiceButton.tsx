function ChoiceButton({
    name,
    index,
    setTime,
    time,
    setColor,
    color,
    selectedIndex,
    setSelectedIndex,
}: {
    name: string;
    index: number;
    setTime: Function;
    time: number;
    setColor: Function;
    color: string;
    selectedIndex: number;
    setSelectedIndex: Function;
}) {
    const isSelected = index === selectedIndex;

    return (
        <button
            onClick={() => {
                setTime(time);
                setColor(color);
                setSelectedIndex(index);
            }}
            className={`h-[28px] py-[2px] px-[12px] border border-none rounded-[4px] text-[1rem] ${
                isSelected
                    ? "bg-[rgba(0,0,0,0.15)] font-bold"
                    : "bg-transparent font-light"
            }`}
        >
            {name}
        </button>
    );
}

export default ChoiceButton
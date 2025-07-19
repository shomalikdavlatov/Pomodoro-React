import { useEffect, useRef, useState } from "react";
import ChoiceButton from "./components/ChoiceButton";
import { choices, sounds } from "./Variables";
import { renderTime } from "./Functions";

const App = () => {
    const [time, setTime] = useState(choices[0].time);
    const [color, setColor] = useState(choices[0].color);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [btnContent, setBtnContent] = useState("START");
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef<NodeJS.Timer | null>(null);
    const btnAudioRef = useRef<HTMLAudioElement>(null);
    const alarmAudioRef = useRef<HTMLAudioElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (isRunning && time > 0) {
            intervalRef.current = setInterval(() => {
                setTime((prev) => prev - 1);
            }, 1000);
        }

        if (time === 0) {
            setIsRunning(false);
            const audioPlayer = alarmAudioRef.current!;
            audioPlayer.play();
        }

        return () => clearInterval(intervalRef.current!);
    }, [isRunning, time]);

    const handleTimer = () => {
        const audioPlayer = btnAudioRef.current!;
        const button = buttonRef.current!;
        audioPlayer.play();

        if (!isRunning) {
            setBtnContent("PAUSE");
            button.classList.remove("shadow");
            setIsRunning(true);
        } else {
            setBtnContent("START");
            button.classList.add("shadow");
            setIsRunning(false);
        }
    };

    return (
        <>
            <div
                style={{ backgroundColor: color }}
                className="h-screen flex justify-center items-center"
            >
                <div className="w-[480px] min-h-[310px] bg-white/10 text-center flex justify-center border border-none rounded-[6px]">
                    <div className="w-[80%] h-[100%] my-auto pt-[20px] pb-[30px] flex flex-col justify-between items-center">
                        <nav className="w-[360px] min-h-[28px] grid grid-cols-3">
                            {choices.map((choice, index) => {
                                return (
                                    <ChoiceButton
                                        key={index}
                                        name={choice.name}
                                        index={index}
                                        setTime={setTime}
                                        time={choice.time}
                                        setColor={setColor}
                                        color={choice.color}
                                        selectedIndex={selectedIndex}
                                        setSelectedIndex={setSelectedIndex}
                                    />
                                );
                            })}
                        </nav>
                        <h1 className="text-[7.5rem] font-bold">
                            {renderTime(time)}
                        </h1>
                        <div className="flex items-center justify-center">
                            <button
                                style={{ color }}
                                className="w-[200px] h-[55px] bg-white font-bold text-[1.375rem] border border-none rounded-[4px] transition-none shadow"
                                onClick={handleTimer}
                                ref={buttonRef}
                            >
                                {btnContent}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <audio src={sounds.pressButton} className="hidden" ref={btnAudioRef}></audio>
            <audio src={sounds.alarm} className="hidden" ref={alarmAudioRef}></audio>
        </>
    );
};

export default App;

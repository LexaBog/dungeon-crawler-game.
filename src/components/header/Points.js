import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCharacter } from "../../redux/sliser/characterSlice";
import "./points.css";

const StatControl = ({ label, stat, onPlus, onMinus }) => (
    <div className="boxPlusPoints">
        <p className="WanPointContainer">
            {label}: {stat || 0}
            <button onClick={onPlus}>+ 1</button>
            <button
                className="minusButon"
                onClick={onMinus}
                disabled={stat <= 0} // Блокируем, если значение не может быть уменьшено
            >
                - 1
            </button>
        </p>
    </div>
);

const Points = () => {
    const character = useSelector((state) => state.character.data);
    const dispatch = useDispatch();
    const [isVisible, setVisible] = useState(false);

    const toggleWindow = () => setVisible((prev) => !prev);

    const updateStat = (stat, increment) => {
        const removalCost = 1000 * character.level;

        // Проверка на доступность поинтов
        if (increment > 0 && character.points <= 0) {
            alert("Недостаточно поинтов!");
            return;
        }

        // Проверка на доступность золота
        if (increment < 0 && character.gold < removalCost) {
            alert(`Недостаточно золота! Нужно ${removalCost}, а у вас ${character.gold}.`);
            return;
        }

        const updates = {
            [stat]: character[stat] + increment,
            points: character.points - increment,
            gold: increment < 0 ? character.gold - removalCost : character.gold,
        };

        dispatch(updateCharacter({ telegramId: character.telegramId, updates }));
    };

    return (
        <>
            {/* Если есть поинты, отображаем крестик, если нет - символ "-" */}
            <div onClick={toggleWindow} className="indicator-container">
                {character?.points > 0 ? (
                    <div className="cross-container">
                        <div className="cross-line cross-line-vertical"></div>
                        <div className="cross-line cross-line-horizontal"></div>
                    </div>
                ) : (
                    <div className="minus-indicator">-</div>
                )}
            </div>

            {isVisible && (
                <div className="boxPlusPoint">
                    <p>осталось поинтов: {character?.points || 0}</p>
                    <p>Стоимость удаления поинта: {1000 * character.level}</p>

                    <StatControl
                        label="Сила"
                        stat={character?.strength}
                        onPlus={() => updateStat("strength", 1)}
                        onMinus={() => updateStat("strength", -1)}
                    />
                    <StatControl
                        label="Ловкость"
                        stat={character?.agility}
                        onPlus={() => updateStat("agility", 1)}
                        onMinus={() => updateStat("agility", -1)}
                    />
                    <StatControl
                        label="Интеллект"
                        stat={character?.intelligence}
                        onPlus={() => updateStat("intelligence", 1)}
                        onMinus={() => updateStat("intelligence", -1)}
                    />
                    <button onClick={toggleWindow}>Закрыть</button>
                </div>
            )}
        </>
    );
};

export default Points;

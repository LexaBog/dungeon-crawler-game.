import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CharacterCreationForm.css';

const CharacterCreationForm = () => {
    const [name, setName] = useState('');
    const [isVisible, setIsVisible] = useState(true); // Управляем видимостью формы
    const [showMessage, setShowMessage] = useState(false); // Управляем видимостью сообщения
    const navigate = useNavigate(); // Хук для навигации

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Данные для отправки:', { name });
        try {
            await axios.post('http://localhost:5001/api/characters', { name });
            // alert(`Персонаж "${response.data.character.name}" успешно создан!`);
            setName(''); // Очистить поле ввода
            setIsVisible(false); // Скрыть форму
            setShowMessage(true); // Показать сообщение

            // Установить таймер на 1 секунду для скрытия сообщения
            setTimeout(() => {
                setShowMessage(false);
                navigate('/game')
                // setIsVisible(true); // Вернуть форму, если нужно
            }, 2500);
        } catch (error) {
            console.error('Ошибка при создании персонажа:', error);
            alert('Не удалось создать персонажа. Попробуйте снова.');
        }
    };

    return (
        <>
            {/* Форма */}
            {isVisible && (
                <form onSubmit={handleSubmit}>
                    <div className="CharacterCreationForm">
                        <label>Создайте нового персонажа</label>
                        <input className='inputForCreateCharacrer'
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value.trim())}
                            required
                        />
                        <button className='butonCreateCharacter' type="submit">Создать персонажа</button>
                    </div>
                </form>
            )}

            {/* Сообщение о создании персонажа */}
            {showMessage && (
                <div className="smsForCreateCharacrer">
                    Персонаж успешно создан!
                    <p>Переход в игру...</p>
                </div>
            )}
        </>
    );
};

export default CharacterCreationForm;

// src/utils/xpUtils.js

/**
 * Вычисляет требуемый опыт для перехода с текущего уровня на следующий.
 *
 * @param {number} level - текущий уровень персонажа.
 * @returns {number} Требуемый опыт для повышения уровня (инкремент).
 */
export const getTotalXPForNextLevel = (level) => {
    if (level < 10) {
      // Для уровней 1–9: просто уровень * 1000.
      return level * 1000;
    } else if (level === 10) {
      // Для перехода с 10-го на 11-й уровень
      return Math.round(1000 * 1.30);
    } else if (level <= 50) {
      // Для уровней 11–50:
      // Формула: XP = 1000 * (1.30)^(level - 9)
      return Math.round(1000 * Math.pow(1.30, level - 9));
    } else if (level < 90) {
      // Для уровней 51–89:
      // Сначала вычислим XP для перехода с 50-го на 51-й уровень:
      const xpAt50 = Math.round(1000 * Math.pow(1.30, 50 - 9));
      return Math.round(xpAt50 * Math.pow(1.40, level - 50));
    } else {
      // Для уровней 91 и выше:
      // Вычислим XP для перехода с 90-го на 91-й уровень:
      const xpAt90 = Math.round(1000 * Math.pow(1.30, 50 - 9) * Math.pow(1.40, 90 - 50));
      return Math.round(xpAt90 * Math.pow(1.50, level - 90));
    }
  };
  
  /**
   * Вычисляет процент заполнения полосы опыта.
   *
   * @param {number} currentXP - текущий опыт, накопленный в текущем уровне.
   * @param {number} level - текущий уровень персонажа.
   * @returns {number} Процент заполнения (от 0 до 100).
   */
  export const getXPPercentage = (currentXP, level) => {
    const requiredXP = getTotalXPForNextLevel(level);
    if (requiredXP === 0) return 0;
    return Math.min(Math.round((currentXP / requiredXP) * 100), 100);
  };
  
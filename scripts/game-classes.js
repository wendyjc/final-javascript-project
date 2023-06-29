/**
 * Final Project - Player Class for Dice Game
 */

const diceImgPath = "images/die-face-";
const imgSuffix   = ".svg";

/**
 * This class models a dice game player. 
 * Takes in two values that represent the rolled face value
 * of a pair of dice. Returns an array of image paths that 
 * correspond to the two dice values.
 */
class Player {
    constructor(value1, value2) {
        this.value1 = value1;
        this.value2 = value2;
    }
    getImgPaths() {
        let imgString1 = `${diceImgPath}${this.value1}${imgSuffix}`;
        let imgString2 = `${diceImgPath}${this.value2}${imgSuffix}`;
        let imgArray = [imgString1, imgString2];
        return imgArray;
    }
}

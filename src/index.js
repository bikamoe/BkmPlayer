
/*!
 * BKMPlayer v1.4.0
 * Released under the MIT License.
 * https://github.com/bikamoe/BKMPlayer
 */
import { BKMPlayer } from "./player";

if (typeof window !== 'undefined') {
    window['BKMPlayer'] = BKMPlayer;
}

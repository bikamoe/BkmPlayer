
/*!
 * BKMPlayer v1.4.0
 * Released under the MIT License.
 * https://github.com/bikamoe/BkmPlayer
 */
import { BKMPlayer } from "./player";

if (typeof window !== 'undefined') {
    window['BKMPlayer'] = BKMPlayer;
}

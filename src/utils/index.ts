import { BigNumber, ethers } from "ethers";
import moment from "moment";

export const copyToClipboard = (e: any) => {
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(e.target.getAttribute('data-copy'));
    let text = e.target.innerText;
    e.target.innerText = text + ' copied!';
    setTimeout(() => {
         e.target.innerText = text;
    }, 1000);
 }

const FORMAT_LENGTH = 10;
const FORMAT_START = 8;
const FORMAT_ENDS = 6;
 
export const formatAddress = (address: string) => {
    if (!address) return address;

    if (address.startsWith('0x')) {
        address = address.substring(2);
    }

    if (address.length <= FORMAT_LENGTH) {
        return address;
    }

    return `${address.substring(0, FORMAT_START)}...${address.substring(address.length - FORMAT_ENDS)}`;
}
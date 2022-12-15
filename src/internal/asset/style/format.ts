export function getReservedForFee (amount: number, token:string, network:string) {
    return `${amount} ${token} is reserved for transaction fees on the ${network} network.`
}
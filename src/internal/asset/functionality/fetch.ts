const URL = "https://goapi.evmos.org"

export const getAssets = async () => {
    const res = await fetch(`${URL}/ERC20ModuleBalance`);
    return res.json();
  };

export const getAssetsForAddress = async (address:string, hexAddress:string) => {
    const res = await fetch(`${URL}/ERC20ModuleBalance/${address}/${hexAddress}`)
    return res.json();

}
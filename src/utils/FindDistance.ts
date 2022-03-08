



export function FindDistance(bebidas: any, latitude: number, longitude: number, metros: string) {
    const bebidaResult = bebidas.filter((bebida: any) => {
        const raio = 6371;
        let dlat = (Number(bebida.loja.latitude) - latitude) * (Math.PI / 180);
        let dlng = (Number(bebida.loja.longitude) - longitude) * (Math.PI / 180);

        let a = Math.sin(dlat / 2) * Math.sin(dlat / 2)
            + Math.cos(Number(bebida.loja.latitude) * (Math.PI / 180))
            * Math.cos(Number(bebida.loja.latitude) * (Math.PI / 180))
            * Math.sin(dlng / 2) * Math.sin(dlng / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let result = (raio * c * 1000).toFixed();
        console.log(result);
        return Number(result) < Number(metros);
    })
    return bebidaResult;
}
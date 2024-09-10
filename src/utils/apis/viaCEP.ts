export class ViaCEP {
    private static _URI = "https://viacep.com.br/ws"

    static async getAdress(CEP: string): Promise<Record<string, string> | null> {
        try {
            return fetch(`${this._URI}/${CEP}/json`)
                .then(res => {
                    if (!res.ok) throw res.status
                    return res.json()
                })
                .then(json => {
                    return json
                })
        } catch (e) {
            return null
        }
    }
}
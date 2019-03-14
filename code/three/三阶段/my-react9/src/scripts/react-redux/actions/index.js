

export const increment = payload => (
    {
        type:"increment",
        payload
    }
)

export function changeCity(city){
    return {
        type:"changeCity",
        city
    }
}

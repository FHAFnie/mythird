

export const CHANGECITY = "changeCity"
export const changeCity = city => {
    return {
        type:CHANGECITY,
        city
    }
}
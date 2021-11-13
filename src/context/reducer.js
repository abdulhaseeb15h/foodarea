
export let data = {
    authUser: null,
    CurrRest: "",
    CartArr: [ ]

}

export function reducer(state, action) {
    switch (action.type) {
        case "AUTH_USER": {
            console.log(action.payload, "user chehck")
            return {
                ...state,
                authUser: action.payload,
                // ...state

            }
        }
        case "AUTH_USER_SN": {
            // console.log(action.payload)
            return {
                ...state,
                authUser: action.payload

            }
        }
        case "Selected_Rest": {
            console.log(action.payload)
            return {
                ...state,
                CurrRest: action.payload

            }
        }
        case "Selected_Dish": {
            // console.log(action.payload)
            let DishClone= state.CartArr.slice(0);
            DishClone.push(action.payload);
            return {
                ...state,
                CartArr:DishClone

            }
        }
        default:
            return state;

    }
}
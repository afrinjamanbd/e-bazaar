import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const fetchproduct = createAsyncThunk('products/getAll', async (thunkApi) => {
    const response = await fetch("https://fakestoreapi.com/products")
    const data = await response.json();
    return data;
})

const initialState = {
    entities: [],
    addedInCart: [],
    val :10
}as any

const productSlice = createSlice({
    name : "product",
    initialState,
    reducers: {
        increament: (state) =>{
            state.val++;
        },
        add(state, action) {
            state.addedInCart.push(action.payload);
        },
        remove(state) {
            state.addedInCart.length = 0;
        },
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchproduct.fulfilled,(state, action)=>{
            state.entities.push(...action.payload)
        })
    }
})

export const {increament, add, remove} = productSlice.actions
export default productSlice.reducer
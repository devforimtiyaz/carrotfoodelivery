
const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b)

const getIndexFromArrayByComparision = (arrayOfObjects, object) => {
    return arrayOfObjects.findIndex(
        (item) =>
            isEqual(item.variations, object.variations) && item.id === object.id
    )
}

// SIMULATE THE FIXED REDUCER
const removeProduct = (state, action) => {
    let index = getIndexFromArrayByComparision(
        state.cartList,
        action.payload
    )
    if (index !== -1) {
        state.cartList.splice(index, 1)
        console.log("Removed index", index);
    } else {
        console.log("Item not found, did nothing.");
    }
}

// Scenario 1: Item with variations
const itemWithVar = { id: 1, variations: [{ type: 'Size', value: 'L' }] };
const cartList1 = [itemWithVar];
const state1 = { cartList: cartList1 };
// Removing...
console.log("Scenario 1: Removing item with variations");
removeProduct(state1, { payload: itemWithVar });
console.log("Result 1 (Expected []):", state1.cartList);

// Scenario 2: Item with NO variations (empty array)
const itemNoVar = { id: 2, variations: [] };
const cartList2 = [itemNoVar];
const state2 = { cartList: cartList2 };
console.log("Scenario 2: Removing item with NO variations");
removeProduct(state2, { payload: itemNoVar });
console.log("Result 2 (Expected []):", state2.cartList);

// Scenario 3: Mixed items with same ID
const itemA = { id: 3, variations: [] };
const itemB = { id: 3, variations: [{ foo: 'bar' }] };
const cartList3 = [itemA, itemB];
const state3 = { cartList: [...cartList3] }; // shallow copy

// Remove itemA (no var)
console.log("Scenario 3: Removing itemA (no var) from list [itemA, itemB]");
removeProduct(state3, { payload: itemA });
console.log("Result 3 (Expected [itemB]):", state3.cartList);
if (state3.cartList.length === 1 && state3.cartList[0].id === 3 && state3.cartList[0].variations.length > 0) {
    console.log("SUCCESS: Only target item removed.");
} else {
    console.log("FAILURE: Wrong item(s) removed.");
}

// Scenario 4: variations is undefined (simulated input which previously crashed)
const itemUndef = { id: 4 }; // variations undefined. Note: getIndex... checks .variations, so user calls usually ensure structure or isEqual handles it.
// The real code uses `isEqual(item.variations, object.variations)`.
// If `object.variations` is undefined, isEqual compares `undefined` vs `item.variations`.
// If `item.variations` is undefined, `undefined` vs `undefined` is true.
// Let's verify strict safety.
const cartList4 = [{ id: 4 }];
const state4 = { cartList: cartList4 };
console.log("Scenario 4: Removing item with undefined variations");
try {
    removeProduct(state4, { payload: { id: 4 } });
    // In real app payload probably comes from item which has keys. 
    // But if it was `undefined` variations, previous code accessed .length on it -> crash.
    // New code passes it to isEqual.
    console.log("Result 4 (Expected [] or no crash):", state4.cartList);
} catch (e) {
    console.log("Result 4 Error:", e.message);
}

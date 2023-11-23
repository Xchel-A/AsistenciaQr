const PanelQRCodeActions = (state, action) => {
    const newState = { ...state }
    switch (action.type) {
        case "UPDATE_TEXT":
            newState.text = action.text ? action.text : "Escriba aquí"
            return newState;
        case "UPDATE_SIZE":
            newState.size = action.size;
            return newState;
        case "UPDATE_COLOR":
            newState.color = action.color;
            return newState;
    }
}

export default PanelQRCodeActions;
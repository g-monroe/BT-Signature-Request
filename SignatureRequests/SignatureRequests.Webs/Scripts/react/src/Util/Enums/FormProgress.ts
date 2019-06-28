enum FormProgress {
    PENDING,
    COMPLETED,
    REJECTED
}

export const changeToValue = (value: number) : string => {
    switch(value){
        case 0: return "pending";
        case 1: return "completed";
        case 2: return "rejected";
    }
    return "unknown";
}

export default FormProgress;
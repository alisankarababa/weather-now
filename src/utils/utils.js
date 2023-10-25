export function arrIncrementIdxCircularly(arr, idxCurrent) {

    if ( idxCurrent === arr.length - 1 )
        return 0;

    return idxCurrent + 1;
}

export function arrDecrementIdxCircularly(arr, idxCurrent) {

    if ( idxCurrent === 0)
        return arr.length - 1;

    return idxCurrent - 1;
}
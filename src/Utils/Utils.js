export const onlyNumber = (e) => {
    const re = /^[0-9\b]+$/;
    return !!(e === "" || re.test(e));
};
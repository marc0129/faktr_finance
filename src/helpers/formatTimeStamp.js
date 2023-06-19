export const timestampToDate = (millisecond) => {
    const date = new Date(millisecond * 1000);
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
}
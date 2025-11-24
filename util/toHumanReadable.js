const toHumanReadable = (iso) => {
    const d = new Date(iso)
    const time = d.toLocaleTimeString("en-IN", { hour12: false })
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
    const year = String(d.getFullYear()).slice(-2);

    const date = `${day}-${month}-${year}`
    return {
        time,
        date
    }
}

export default toHumanReadable
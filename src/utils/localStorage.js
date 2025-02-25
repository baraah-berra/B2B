function getData(key, defaultValue = "") {
    if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
    }
    return JSON.parse(localStorage.getItem(key));
}

function setData(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
}

export { getData, setData };

const redirect = (url, params) => {
    const paramsList = Object.keys(params);
    const values = Object.values(params)

    let redirectTo = `${url}?`

    console.log(params)

    paramsList.forEach((param, index) => {
        if (index === 0) redirectTo += `${param}=${values[index]}`
        else redirectTo += `&${param}=${values[index]}`;
    })

    console.log(redirectTo)

    // window.location.pathname = redirectTo;//
}

export default redirect;
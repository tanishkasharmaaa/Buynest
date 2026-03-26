export const getProducts = async(url) => {
    console.log("Hello")
        const res = await fetch(url)
        const resData = await res.json();
        return {resData}
}


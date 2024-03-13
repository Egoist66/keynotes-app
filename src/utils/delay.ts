export function delay (ms: number){
    return new Promise((res) => {
        const timer = setTimeout(() => {
            res(true)
            clearTimeout(timer)
        }, ms)
    })
}
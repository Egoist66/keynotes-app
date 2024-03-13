
export const useLS = () => {
    const ls = localStorage;

    const set = (key: string, value: any) => {
        try {
            ls.setItem(key, JSON.stringify(value));
        }
        catch (e){
            console.log(e)

        }
    };

    const remove = (key: string) => {
        ls.removeItem(key);
    };

    const get = <T = any>(key: string): T  => {
        const item = ls.getItem(key);
        if (item) {
            return JSON.parse(item) as T;
        }
        return [] as T
    };

    const exist = (key: string) => {
        if (key in ls) {
            return true
        } else {
            return false
        }
    }


    return {
        set,
        remove,
        get,
        ls,
        exist
    };
};
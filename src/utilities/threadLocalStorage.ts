import { AsyncLocalStorage } from "async_hooks";

const asyncLocalStorage = new AsyncLocalStorage<Map<String, any>>();

export const initializeStore = ( initializeValues: Record<string, any>) => {
    const store = new Map<string, any>(Object.entries(initializeValues));
    asyncLocalStorage.enterWith(store);
};

export const setSkipExecutionFlag = (key: string, value: any) => {
    const store = asyncLocalStorage.getStore();
    if(store){
        store.set(key, value);
    }
};

export const getSkipExecutionFlag = (key:string) => {
    const store = asyncLocalStorage.getStore();
    return store ? store.get(key) : undefined;
}
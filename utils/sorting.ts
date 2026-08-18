export function isSortedAscending(arr: string[]): boolean;
export function isSortedAscending(arr: number[]): boolean;

export function isSortedAscending(arr: (string | number)[]): boolean {
    for (let i = 1; i < arr.length; i++){
        if(arr[i - 1] > arr[i]){
            return false;
        }
    }
    return true;
}

export function isSortedDescending(arr: string[]): boolean;
export function isSortedDescending(arr: number[]): boolean;

export function isSortedDescending(arr: (string | number)[]): boolean {
    for (let i = 1; i < arr.length; i++){
        if(arr[i - 1] < arr[i]){
            return false;
        }
    }
    return true;
}
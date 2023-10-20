export function chunks(array: any[], size: number) {
    return Array.apply(0,{length: Math.ceil(array.length / size)}).map((_: any, index: number) => array.slice(index*size, (index+1)*size))
}